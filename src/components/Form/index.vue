<template>
  <div class="search-bar">
    <slot name="header" />

    <el-form ref="formRef" :label-width="labelWidth" class="form">
      <el-row>
        <template v-for="config in configs" :key="config.label">
          <el-col v-if="!config.isHidden" v-bind="colLayout">
            <el-form-item :label="config.label" :style="itemStyle">
              <template v-if="['input', 'password'].includes(config.type)">
                <el-input
                  v-bind="config.otherOptions"
                  clearable
                  :placeholder="config.placeholder"
                  :show-password="config.type === 'password'"
                  :model-value="modelValue[config.field as string]"
                  @update:modelValue="updateModelValue($event, config.field as string)"
                  @keyup.enter="$emit('search')"
                />
              </template>

              <template v-else-if="config.type === 'select'">
                <el-select
                  v-bind="config.otherOptions"
                  clearable
                  class="precent"
                  :placeholder="config.placeholder"
                  :model-value="modelValue[config.field as string]"
                  @update:modelValue="updateModelValue($event, config.field as string)"
                  @keyup.enter="$emit('search')"
                >
                  <el-option
                    v-for="option in config.options"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </el-option>
                </el-select>
              </template>

              <template v-else-if="config.type === 'datepicker'">
                <el-date-picker
                  v-bind="config.otherOptions"
                  clearable
                  class="precent"
                  :placeholder="config.placeholder"
                  :model-value="modelValue[config.field as string]"
                  @update:modelValue="updateModelValue($event, config.field as string)"
                  @keyup.enter="$emit('search')"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>

    <slot name="footer" />
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { Config } from './types'

// eslint-disable-next-line no-undef
const emit = defineEmits(['update:modelValue', 'search'])

// eslint-disable-next-line no-undef
const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },

  configs: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type: Array as PropType<Config<any>[]>,
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

const updateModelValue = (v: unknown, field: string) => {
  emit('update:modelValue', { ...props.modelValue, [field]: v })
}
</script>

<style scoped lang="scss">
.search-bar {
  .form {
    padding-top: 22px;

    .precent {
      width: 100%;
    }
  }
}
</style>
