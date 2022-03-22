<template>
  <basic-chart :options="options" />
</template>

<script setup lang="ts">
import { computed, Ref } from 'vue'
import { EChartsOption } from 'echarts'
import { convertData } from '../hooks/useEcharts'
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
  // 视觉映射提示器
  visualMap: {
    show: true,
    min: 0,
    max: 70000,
    left: 'left',
    top: 'bottom',
    text: ['高', '低'],
    textStyle: {
      color: '#3030133'
    },
    // 是否显示拖拽用的手柄
    calculable: true,
    // 指定取哪个系列的数据进行绘制
    // 默认是series中的所有数据，所以这里可以省略
    // seriesIndex: [0],
    inRange: {
      color: ['rgb(70, 240, 252)', 'rgb(250, 220, 46)', 'rgb(245, 38, 186)']
    }
  },
  geo: {
    // 使用之前注册过的地图进行绘制
    map: 'china',
    emphasis: {
      itemStyle: {
        // 鼠标悬浮时候高亮的颜色
        areaColor: '#f4cccc'
      }
    },
    // 是否允许缩放地图
    roam: true,
    itemStyle: {
      // 地图的整体背景色
      areaColor: '#ebebeb',
      // 省和省之间的间隔线
      borderColor: 'rgb(9, 54, 95)'
    }
  },
  series: [
    {
      // 图例的标题
      name: '销量',
      // 图表类型 是 散点图
      type: 'scatter',
      // 将数据和地图坐标进行绑定
      coordinateSystem: 'geo',
      // 数据
      data: convertData(props.data),
      // 图表上展示图例的大小
      symbolSize: 12
    }
  ]
}))
</script>
