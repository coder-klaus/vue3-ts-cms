import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import router from '/src/router/index'
import { login, getUserInfo, getMenu } from '../../../api/login'
import { IAccount, ILoginType, IUserInfo } from './types'
import { IResponseType } from '../../../types'

interface IState {
  token: string
  userInfo: IUserInfo | null
  menus: []
}

export default defineStore('loginStore', {
  state: (): IState => ({
    token: '',
    userInfo: null,
    menus: []
  }),

  actions: {
    async login(account: IAccount) {
      const { data } = await login<IAccount, IResponseType<ILoginType>>(account)
      const { token, id } = data

      this.$state.token = token
      Cookies.set('token', token)

      this.fetchUserInfo(id)
      this.fetchMenu(id)

      router.push('/home')
    },

    async fetchUserInfo(id: number) {
      const { data } = await getUserInfo<IResponseType<IUserInfo>>(id)
      this.$state.userInfo = data
      Cookies.set('userInfo', JSON.stringify(data))
    },

    async fetchMenu(id: number) {
      const { data } = await getMenu(id)
      this.$state.menus = data
      Cookies.set('menus', JSON.stringify(data))
      console.log(JSON.stringify(data))
    },

    // 用户刷新后，是否已登录是通过在storage或者cookie中存储的数据来进行判断的
    // 但是因为用户刷新了界面，所以vuex或pinia中的状态会被全部置空
    // 因此需要重新进行设置
    initStore() {
      const token = Cookies.get('token')
      const userInfo = Cookies.get('userInfo')
      const menus = Cookies.get('menus')

      if (token && userInfo && menus) {
        /* eslint-disable no-param-reassign */
        this.$patch(state => {
          state.token = token
          state.userInfo = JSON.parse(userInfo ?? '{}')
          state.menus = JSON.parse(menus ?? '{}')
        })
      }
    }
  }
})
