import { IMenu } from '/src/types'
import { useLoginStore } from '/src/store'

const store = useLoginStore()

const menuMap: Map<string, IMenu> = new Map()
const menus = store.menusRef

const generateMenuMap = (menus: IMenu[]) => {
  for (const menu of menus) {
    if (menu.url) {
      menuMap.set(menu.url, menu)
    }

    if (menu.children) {
      generateMenuMap(menu.children)
    }
  }
}

if (!menuMap.size && menus) {
  generateMenuMap(menus)
}

export default menuMap
