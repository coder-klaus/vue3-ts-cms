import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import { ref } from 'vue'
import router from '../../../router'
import { userLogin, getUserInfo, getMenu } from '/src/api/login'
import { IAccount, ILoginType, IUserInfo } from './types'
import { IResponseType, IMenu } from '/src/types'

export default defineStore('loginStore', () => {
  const tokenRef = ref('')
  const userInfoRef = ref<IUserInfo | null>(null)
  const menusRef = ref<IMenu[] | null>(null)

  async function fetchUserInfo(id: number) {
    const { data } = await getUserInfo<IResponseType<IUserInfo>>(id)
    userInfoRef.value = data
    localStorage.setItem('userInfo', JSON.stringify(data))
  }

  async function fetchMenu(id: number) {
    const { data } = await getMenu(id)
    menusRef.value = data
    localStorage.setItem('menus', JSON.stringify(data))
  }

  async function login(account: IAccount) {
    const { data } = await userLogin<IAccount, IResponseType<ILoginType>>(account)
    const { token, id } = data

    tokenRef.value = token
    Cookies.set('token', token, { expires: 365 })

    fetchUserInfo(id)

    fetchMenu(id)

    router.push('/main')
  }

  function initStore() {
    tokenRef.value = Cookies.get('token') || ''
    userInfoRef.value = JSON.parse(localStorage.getItem('userInfo') ?? '{}')
    menusRef.value = JSON.parse(localStorage.getItem('menus') ?? '[]')
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
