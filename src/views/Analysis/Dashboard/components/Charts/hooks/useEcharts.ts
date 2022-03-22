import * as echarts from 'echarts'
import chinaJson from '../data/china.json'
import { coordinate } from '../data/coordinate'
import { IChartData } from '../components/types'

export function convertData(data: IChartData[]) {
  const res = []
  for (let i = 0; i < data.length; i++) {
    const geoCoord = coordinate[data[i].name]
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      })
    }
  }
  return res
}

echarts.registerMap('china', chinaJson)

export default (el: HTMLElement, theme: 'light' | 'dark' = 'light', renderer: 'svg' | 'canvas' = 'svg') => {
  const instance = echarts.init(el, theme, { renderer })

  function setOption(options: echarts.EChartsOption) {
    instance.setOption(options)
  }

  // 界面大小发生改变的时候，重新渲染图表
  window.addEventListener('resize', () => instance.resize())

  const resize = () => instance.resize()

  return {
    instance,
    resize,
    setOption
  }
}
