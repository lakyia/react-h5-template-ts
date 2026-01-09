import request from '@/utils/request'
import type { ApiResponse } from '@/utils/request'

// 登录请求参数类型
export interface LoginRequest {
  phone: string
  password: string
}

// 登录响应数据类型
export interface LoginResponse {
  token: string
  userInfo: {
    name: string
    phone: string
    avatar?: string
  }
}

/**
 * 用户登录接口
 * @param data 登录请求参数
 * @returns 登录响应数据
 */
export const loginApi = async (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
  const response = await request.post<ApiResponse<LoginResponse>>('/auth/login', data)
  return response.data
}

/**
 * 用户登出接口
 * @returns 登出响应数据
 */
export const logoutApi = async (): Promise<ApiResponse> => {
  const response = await request.post<ApiResponse>('/auth/logout')
  return response.data
}

/**
 * 获取用户信息接口
 * @returns 用户信息响应数据
 */
export const getUserInfoApi = async (): Promise<ApiResponse<LoginResponse['userInfo']>> => {
  const response = await request.get<ApiResponse<LoginResponse['userInfo']>>('/auth/userInfo')
  return response.data
}
