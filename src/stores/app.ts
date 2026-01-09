import { create } from 'zustand'
import { produce } from 'immer'
import { createJSONStorage, persist } from 'zustand/middleware'

// 定义 AppStore 接口
interface AppStore {
  keepAlivePaths: string[]
  addKeepAlive: (path: string) => void
  removeKeepAlive: (path: string) => void
}

// 创建类型安全的 AppStore
export const useAppStore = create<AppStore>()(
  persist(
    set => ({
      keepAlivePaths: ['/keep', '/counter'],
      addKeepAlive: (path: string) =>
        set(
          produce((state: AppStore) => {
            if (!state.keepAlivePaths.includes(path)) {
              state.keepAlivePaths = state.keepAlivePaths.concat(path)
            }
          })
        ),
      removeKeepAlive: (path: string) =>
        set(
          produce((state: AppStore) => {
            const keepAlivePaths = state.keepAlivePaths
            const index = keepAlivePaths.indexOf(path)
            if (index > -1) {
              keepAlivePaths.splice(index, 1)
            }
          })
        )
    }),
    {
      name: 'app-store',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)
