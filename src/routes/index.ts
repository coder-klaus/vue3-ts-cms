import type { RouteRecordRaw } from 'vue-router'
import { IMenu } from '/src/types'
import systemRouter from './system'
import analysisRouter from './analysis'

const asyncRoutes: RouteRecordRaw[] = [...systemRouter, ...analysisRouter]

const menus = JSON.parse(localStorage.getItem('menus') ?? '[]')

function getRouteMap() {
  const map = new Map()

  asyncRoutes.forEach(route => {
    map.set(route.path, route)
  })

  return map
}

const routeMap = getRouteMap()

function generateRoutes(menus: IMenu[]) {
  const routes: RouteRecordRaw[] = []

  for (const menu of menus) {
    if (routeMap.has(menu.url)) {
      const route = routeMap.get(menu.url)

      if (menu.children) {
        const children = generateRoutes(menu.children)

        route.children = children
      }

      routes.push(route)
    }
  }

  return routes
}

export default generateRoutes(menus)
