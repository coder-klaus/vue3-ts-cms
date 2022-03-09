<template>
  <div class="search-bar">
    <div class="header">
      <slot name="header" />
    </div>

    <el-form ref="formRef" :label-width="labelWidth" class="form">
      <el-row>
        <template v-for="config in configs" :key="config.label">
          <el-col v-bind="colLayout">
            <el-form-item :label="config.label" :style="itemStyle">
              <template v-if="['input', 'password'].includes(config.type)">
                <el-input
                  v-bind="config.otherOptions"
                  :show-password="config.type === 'password'"
                  v-model="userRef[config.field]"
                />
              </template>

              <template v-else-if="config.type === 'select'">
                <el-select v-bind="config.otherOptions" class="precent" v-model="userRef[config.field]">
                  <el-option v-for="option in config.options" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </el-option>
                </el-select>
              </template>

              <template v-else-if="config.type === 'datepicker'">
                <el-date-picker v-bind="config.otherOptions" class="precent" v-model="userRef[config.field]" />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>

    <div class="footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from 'vue'
import { Config, ISearchUser } from './types'

// eslint-disable-next-line no-undef
const emit = defineEmits(['update:modelValue'])

// eslint-disable-next-line no-undef
const props = defineProps({
  modelValue: {
    type: Object as PropType<ISearchUser>,
    required: true
  },

  configs: {
    type: Array as PropType<Config[]>,
    required: true
  },

  labelWidth: {
    type: String,
    default: '100px'
  },

  colLayout: {
    type: Object,
    default: () => ({
      span: 8
    })
  },

  itemStyle: {
    type: Object,
    default: () => ({})
  }
})

const { configs, modelValue } = props

const userRef = ref({ ...modelValue })

watch(
  userRef,
  newV => {
    emit('update:modelValue', newV)
  },
  {
    deep: true
  }
)
</script>

<style scoped lang="scss">
.search-bar {
  padding: 20px 0;

  .form {
    padding-top: 22px;

    .precent {
      width: 100%;
    }
  }
}
</style>
