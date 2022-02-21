import Api from './api'

import {
  BASE_URL,
  TIME_OUT
} from './env'

const api = new Api({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

export default api
