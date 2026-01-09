// request.ts
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { useUserStore } from '@/stores/user'
import { Toast } from 'antd-mobile'

// 1. 扩展 AxiosRequestConfig 类型，支持自定义的 resLoadingNext 字段
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  resLoadingNext?: boolean // 自定义字段，标记是否需要加载提示
}

// 2. 定义后端返回的响应数据结构
interface ApiResponse<T = any> {
  status?: number // HTTP 状态码（部分接口可能返回）
  code?: number // 业务状态码
  retCode?: number // 备用业务状态码
  data?: T // 响应数据体
  [key: string]: any // 兼容其他自定义字段
}

// 3. 创建 Axios 实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env?.VITE_API_BASE_URL || '', // 环境变量
  withCredentials: false, // 跨域是否携带 Cookie
  timeout: 30000 // 请求超时时间
})

// 4. 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 获取用户状态（Zustand getState 类型安全）
    const { authToken, userInfo } = useUserStore.getState()
    // 设置请求头 Authorization
    const token = authToken || userInfo.token || sessionStorage.getItem('token')
    if (token) {
      config.headers = config.headers || {}
      config.headers['Authorization'] = token
    }
    return config
  },
  (error: AxiosError) => {
    console.log('Request Interceptor Error:', error) // 调试日志
    return Promise.reject(error)
  }
)

// 5. 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const config = response.config as CustomAxiosRequestConfig // 类型断言为自定义配置
    // 处理自定义的 resLoadingNext 字段
    if (config.resLoadingNext) {
      console.log('Response Config:', config)
    }

    const res = response.data
    // 校验 HTTP 状态码（非 200 则抛出异常）
    if (res.status !== undefined && res.status !== 200) {
      console.log('Response Status Error:', res.status)
      throw res || new Error('Request failed')
    }

    // 校验业务状态码
    if (res.code === 200 || res.retCode === 200) {
      // 业务成功，返回原始 AxiosResponse，业务层可使用 response.data 获取具体数据
      return response
    } else if (res.code === 305 || res.code === 306) {
      // 305/306：登录失效/异地登录
      const msg = res.code === 306 ? '账号在其他地方登录!' : '登录失效,请重新登录!'
      Toast.show({
        content: msg,
        duration: 2000
      })
      // 执行登出操作
      useUserStore.getState().onLogout()
      throw new Error(msg)
    } else {
      // 其他业务错误
      throw res || new Error('Business error')
    }
  },
  (error: AxiosError) => {
    console.log('Response Interceptor Error:', error) // 调试日志
    return Promise.reject(error)
  }
)

export default service

// 可选：导出类型，方便业务层复用
export type { CustomAxiosRequestConfig, ApiResponse }
