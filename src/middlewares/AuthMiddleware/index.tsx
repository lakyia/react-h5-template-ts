import { Outlet } from 'react-router'
import { useEffect, useState } from 'react'
import { useUserStore } from '@/stores/user'
import LazyLoading from '@/components/LazyLoading'
import { router } from '@/router'

const AuthMiddleware = () => {
  const [loading, setLoading] = useState(true)
  const { isLogin } = useUserStore(state => state)

  useEffect(() => {
    //获取登录状态
    const authed = isLogin
    if (authed) {
      console.log('已登录 AuthMiddleware')
      setLoading(false)
    } else {
      console.log('未登录 AuthMiddleware')
      // 未登录，跳转到登录页
      router.navigate('/login')
    }
  }, [isLogin])

  return !loading && isLogin ? <Outlet /> : <LazyLoading />
}

export default AuthMiddleware
