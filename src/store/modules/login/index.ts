import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import { ref } from 'vue'
import router, { registerAsyncRoutes } from '../../../router'
import { generateRoutes } from '../../../router/modules'
import { userLogin, getUserInfo, getMenu } from '/src/api/login'
import { IAccount, ILoginType, IUserInfo } from './types'
import { IResponseType, IMenu } from '/src/types'

export default defineStore('loginStore', () => {
  const tokenRef = ref('')
  const userInfoRef = ref<IUserInfo | null>(null)
  const menusRef = ref<IMenu[] | null>(null)
  const pressmissionsRef = ref<string[]>([])

  async function fetchUserInfo(id: number) {
    const { data } = await getUserInfo<IResponseType<IUserInfo>>(id)
    userInfoRef.value = data
    localStorage.setItem('userInfo', JSON.stringify(data))
  }

  const calcPressmissions = (menus: IMenu[]) => {
    const pressmissions: string[] = []

    const rescureMenuToPressmission = (menus: IMenu[]) => {
      for (const menu of menus) {
        if (menu.permission) {
          pressmissions.push(menu.permission)
        } else if (menu.children) {
          rescureMenuToPressmission(menu.children)
        }
      }
    }

    rescureMenuToPressmission(menus)

    return pressmissions
  }

  async function fetchMenu(id: number) {
    const { data } = await getMenu(id)
    menusRef.value = data
    localStorage.setItem('menus', JSON.stringify(data))
    pressmissionsRef.value = calcPressmissions(data)
  }

  async function login(account: IAccount) {
    const { data } = await userLogin<IAccount, IResponseType<ILoginType>>(account)
    const { token, id } = data

    tokenRef.value = token
    Cookies.set('token', token, { expires: 365 })

    fetchUserInfo(id)

    await fetchMenu(id)

    if (menusRef.value) {
      registerAsyncRoutes(generateRoutes(menusRef.value))
    }

    router.push('/main')
  }

  function initStore() {
    tokenRef.value = Cookies.get('token') || ''
    userInfoRef.value = JSON.parse(localStorage.getItem('userInfo') ?? '{}')
    menusRef.value = JSON.parse(localStorage.getItem('menus') ?? '[]')

    if (menusRef.value) {
      registerAsyncRoutes(generateRoutes(menusRef.value))
      pressmissionsRef.value = calcPressmissions(menusRef.value)
    }
  }

  return {
    tokenRef,
    userInfoRef,
    menusRef,
    pressmissionsRef,
    login,
    fetchUserInfo,
    fetchMenu,
    initStore
  }
})
