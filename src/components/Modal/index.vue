<template>
  <el-dialog
    v-model="visibleDialog"
    :title="title"
    :width="config.width ?? '30%'"
    :center="center"
    destroy-on-close
    @close="handleDialogClose"
  >
    <Form v-bind="config.formConfig" v-model="formData" />

    <slot />

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('update:visible', false)">取消</el-button>
        <el-button type="primary" @click="confirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import Form from '/src/components/Form/index.vue'
import { Config } from './types'

// eslint-disable-next-line no-undef
const emits = defineEmits(['update:visible', 'update:data', 'confirm'])

// eslint-disable-next-line no-undef
const props = defineProps({
  title: {
    type: String,
    default: ''
  },

  visible: {
    type: Boolean,
    required: true
  },

  center: {
    type: Boolean,
    default: true
  },

  config: {
    type: Object as PropType<Config>,
    required: true
  },

  data: {
    type: Object,
    required: true
  }
})

const visibleDialog = computed({
  get: () => props.visible,
  set: v => emits('update:visible', v)
})

const formData = computed({
  get: () => props.data,
  set: v => emits('update:data', v)
})

const handleDialogClose = () => emits('update:visible', false)

const confirm = () => {
  emits('update:visible', false)
  emits('confirm', formData.value)
}
</script>

<style scoped></style>
