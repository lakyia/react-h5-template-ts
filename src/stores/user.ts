// userStore.ts
import { create } from 'zustand'
import { produce } from 'immer'
import { createJSONStorage, persist } from 'zustand/middleware'

// 1. 定义用户信息的类型接口
interface UserInfo {
  name: string
  phone: string
  token: string
}

// 2. 定义 Store 状态和方法的完整接口
interface UserStore {
  // 状态
  isLogin: boolean
  authToken: string
  userInfo: UserInfo
  // 方法
  onLogin: (userInfo: UserInfo) => void
  onLogout: () => void
}

// 3. 创建类型安全的 Zustand Store
export const useUserStore = create<UserStore>()(
  persist(
    set => ({
      // 初始状态（严格匹配 UserStore 接口）
      isLogin: false,
      authToken: '',
      userInfo: {
        name: '',
        phone: '',
        token: ''
      },

      // 登录方法（参数类型约束为 UserInfo）
      onLogin: userInfo =>
        set(
          produce(state => {
            state.isLogin = true
            state.userInfo = userInfo
            state.authToken = userInfo.token
          })
        ),

      // 登出方法
      onLogout: () =>
        set(
          produce(state => {
            state.isLogin = false
            state.authToken = ''
            state.userInfo = {
              name: '',
              phone: '',
              token: ''
            }
          })
        )
    }),
    {
      name: 'user-store',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)
