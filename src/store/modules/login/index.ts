import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import { ref } from 'vue'
import router from '/src/router/index'
import { userLogin, getUserInfo, getMenu } from '/src/api/login'
import { IAccount, ILoginType, IUserInfo } from './types'
import { IResponseType } from '/src/types'

export default defineStore('loginStore', () => {
  const tokenRef = ref('')
  const userInfoRef = ref<IUserInfo | null>(null)
  const menusRef = ref('[]')

  async function fetchUserInfo(id: number) {
    const { data } = await getUserInfo<IResponseType<IUserInfo>>(id)
    userInfoRef.value = data
    Cookies.set('userInfo', JSON.stringify(data))
  }

  async function fetchMenu(id: number) {
    const { data } = await getMenu(id)
    menusRef.value = data
    Cookies.set('menus', JSON.stringify(data))
    console.log(JSON.stringify(data))
  }

  async function login(account: IAccount) {
    const { data } = await userLogin<IAccount, IResponseType<ILoginType>>(account)
    const { token, id } = data

    tokenRef.value = token
    Cookies.set('token', token)

    fetchUserInfo(id)
    fetchMenu(id)

    router.push('/home')
  }

  function initStore() {
    const token = Cookies.get('token')
    const userInfo = Cookies.get('userInfo')
    const menus = Cookies.get('menus')

    if (token && userInfo && menus) {
      tokenRef.value = token
      userInfoRef.value = JSON.parse(userInfo ?? '{}')
      menusRef.value = JSON.parse(menus ?? '{}')
    }
  }

  return {
    tokenRef,
    userInfoRef,
    menusRef,
    login,
    fetchUserInfo,
    fetchMenu,
    initStore
  }
})
