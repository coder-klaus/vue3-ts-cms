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
  legend: {
    top: 'bottom'
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  series: [
    {
      type: 'pie',
      radius: [40, 120],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8
      },
      data: props.data
    }
  ]
}))
</script>
