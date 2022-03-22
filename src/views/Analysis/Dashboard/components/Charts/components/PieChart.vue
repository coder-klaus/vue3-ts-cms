<template>
  <basic-chart :options="options" />
</template>

<script setup lang="ts">
import { computed, Ref } from 'vue'
import { EChartsOption } from 'echarts'
import BasicChart from './BasicChart.vue'
import { IChartData } from './types'

// eslint-disable-next-line no-undef
const props = defineProps<{
  data: IChartData[]
}>()

const options: Ref<EChartsOption> = computed(() => ({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    left: 'left'
  },
  series: [
    {
      type: 'pie',
      radius: '50%',
      data: props.data,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}))
</script>
