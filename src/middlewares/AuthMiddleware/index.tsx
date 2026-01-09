import { Outlet } from 'react-router'
import { useEffect } from 'react'
import { useUserStore } from '@/stores/user'
import LazyLoading from '@/components/LazyLoading'
import { router } from '@/router'

const AuthMiddleware = () => {
  const { isLogin } = useUserStore(state => state)

  useEffect(() => {
    //获取登录状态
    if (!isLogin) {
      console.log('未登录 AuthMiddleware')
      // 未登录，跳转到登录页
      router.navigate('/login')
    } else {
      console.log('已登录 AuthMiddleware')
    }
  }, [isLogin])

  return isLogin ? <Outlet /> : <LazyLoading />
}

export default AuthMiddleware
