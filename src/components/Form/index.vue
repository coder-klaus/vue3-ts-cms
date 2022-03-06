<template>
  <el-form ref="formRef" :label-width="labelWidth" class="form">
    <el-row>
      <template v-for="config in configs" :key="config.label">
        <el-col v-bind="colLayout">
          <el-form-item :label="config.label" :style="itemStyle">
            <template v-if="['input', 'password'].includes(config.type)">
              <el-input v-bind="config.otherOptions" />
            </template>

            <template v-else-if="config.type === 'select'">
              <el-select v-bind="config.otherOptions" class="precent">
                <el-option v-for="option in config.options" :key="option.value" :value="option.value">
                  {{ option.label }}
                </el-option>
              </el-select>
            </template>

            <template v-else-if="config.type === 'datepicker'">
              <el-date-picker v-bind="config.otherOptions" class="precent" />
            </template>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { Config } from '/src/components/Form/types'

// eslint-disable-next-line no-undef
const props = defineProps({
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

const { configs } = props
</script>

<style scoped lang="scss">
.form {
  padding-top: 22px;

  .precent {
    width: 100%;
  }
}
</style>
