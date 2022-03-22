<template>
  <div class="charts">
    <el-row :gutter="10">
      <el-col :span="7">
        <Card class="title" title="分类商品数量(饼图)">
          <PieChart :data="categoryCountRef" />
        </Card>
      </el-col>

      <el-col :span="10">
        <Card class="title" title="不同城市商品销量">
          <MapChart v-if="chinaSaleRef" :data="chinaSaleRef" />
        </Card>
      </el-col>

      <el-col :span="7">
        <Card class="title" title="分类商品数量(玫瑰图)">
          <RoseChart :data="categoryCountRef" />
        </Card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="row">
      <el-col :span="12">
        <Card class="title" title="分类商品的销量">
          <LineChart v-if="categoryFavorRef" v-bind="categoryFavorRef" />
        </Card>
      </el-col>

      <el-col :span="12">
        <Card class="title" title="分类商品的收藏">
          <BarChart v-if="addressSaleRef" v-bind="addressSaleRef" />
        </Card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getCategoryCount, getCategorySale, getCategoryFavor, getAddressSale } from '/src/api/chart'
import Card from './components/Card.vue'
import PieChart from './components/PieChart.vue'
import RoseChart from './components/RoseChart.vue'
import LineChart from './components/LineChart.vue'
import BarChart from './components/BarChart.vue'
import MapChart from './components/MapChart.vue'
import { Category, LineData, BarData, Address } from './types'
import { IChartData } from './components/types'

const categoryCountRef = ref<IChartData[]>([])
const categorySaleRef = ref<Category[]>([])
const categoryFavorRef = ref<LineData>()
const addressSaleRef = ref<BarData>()
const chinaSaleRef = ref<IChartData[]>()

const fetchChartData = async () => {
  const [{ data: count }, { data: sale }, { data: favor }, { data: addressSale }] = await Promise.all([
    getCategoryCount(),
    getCategorySale(),
    getCategoryFavor(),
    getAddressSale()
  ])

  categoryCountRef.value = count.map(item => ({
    name: item.name,
    value: item.goodsCount
  }))

  categorySaleRef.value = sale

  const calcLineData = () => {
    const xAxis: string[] = []
    const data: number[] = []

    favor.forEach(item => {
      xAxis.push(item.name)
      data.push(item.goodsFavor)
    })

    return {
      xAxis,
      data
    }
  }

  categoryFavorRef.value = calcLineData()

  function calcAddressData() {
    const dataAxis: string[] = []
    const data: number[] = []

    addressSale.forEach(item => {
      dataAxis.push(item.address)
      data.push(item.count)
    })

    return {
      dataAxis,
      data
    }
  }

  addressSaleRef.value = calcAddressData()

  chinaSaleRef.value = addressSale.map(item => ({
    name: item.address,
    value: item.count
  }))
}

fetchChartData()
</script>

<style lang="scss" scoped>
.row {
  margin-top: 10px;
}

.title {
  text-align: left;
}
</style>
