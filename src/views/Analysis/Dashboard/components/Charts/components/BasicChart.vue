<template>
  <div ref="chartContainer" :style="{ width, height }" />
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import { EChartsOption } from 'echarts'
import useEcharts from '../hooks/useEcharts'

// eslint-disable-next-line no-undef
const props = withDefaults(
  // eslint-disable-next-line no-undef
  defineProps<{
    width?: string
    height?: string
    options: EChartsOption
  }>(),
  {
    width: '100%',
    height: '360px'
  }
)

const chartContainer = ref<HTMLDivElement>()

onMounted(() => {
  if (chartContainer.value) {
    const { setOption } = useEcharts(chartContainer.value)

    watchEffect(() => {
      setOption(props.options)
    })
  }
})
</script>
