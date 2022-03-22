<template>
  <basic-chart :options="options" />
</template>

<script setup lang="ts">
import { computed, Ref } from 'vue'
import { EChartsOption } from 'echarts'
import BasicChart from './BasicChart.vue'

// eslint-disable-next-line no-undef
const props = defineProps<{
  xAxis: string[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[]
}>()

const options: Ref<EChartsOption> = computed(() => ({
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: props.xAxis
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: props.data,
      type: 'line',
      areaStyle: {}
    }
  ]
}))
</script>
