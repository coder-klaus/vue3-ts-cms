<template>
  <basic-chart :options="options" />
</template>

<script setup lang="ts">
import { computed, Ref } from 'vue'
import { EChartsOption, graphic } from 'echarts'
import BasicChart from './BasicChart.vue'

// eslint-disable-next-line no-undef
const props = defineProps<{
  dataAxis: string[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[]
}>()

const options: Ref<EChartsOption> = computed(() => ({
  xAxis: {
    data: props.dataAxis,
    axisLabel: {
      // 标签显示朝内还是朝外
      inside: true,
      // 标签文本颜色
      color: '#fff'
    },
    // 是否显示坐标轴刻度
    axisTick: {
      show: false
    },
    z: 10
  },
  yAxis: {
    // 是否显示坐标轴那条线
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    // 坐标轴刻度标签的相关设置
    axisLabel: {
      // 坐标轴字体颜色
      color: '#999'
    }
  },
  // 缩放区域
  dataZoom: [
    {
      // 缩放方式 --- inside(鼠标滚轮缩放) | slider (滑块缩放)
      type: 'inside'
    }
  ],
  series: [
    {
      type: 'bar',
      // 显示柱状块背景
      showBackground: true,
      // 图例的样式
      itemStyle: {
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#83bff6' },
          { offset: 0.5, color: '#188df0' },
          { offset: 1, color: '#188df0' }
        ])
      },
      data: props.data
    }
  ]
}))
</script>
