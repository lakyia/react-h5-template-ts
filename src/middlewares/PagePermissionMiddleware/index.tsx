import { Outlet, useLocation } from 'react-router'
import { useEffect, useState } from 'react'
import LazyLoading from '@/components/LazyLoading'
import { Result } from 'antd-mobile'

const PagePermissionMiddleware = () => {
  const [loading, setLoading] = useState(true)
  const [auth, setAuth] = useState(false)
  const location = useLocation()
  const [oldPathname, setOldPathname] = useState('')
  useEffect(() => {
    console.log('执行 PagePermissionMiddleware')
    // 切换了路径，需要做鉴权 Loading 处理
    if (oldPathname !== location.pathname) {
      // 使用setTimeout包装setLoading，避免同步调用导致级联渲染
      setTimeout(() => setLoading(true), 0)
    }
    // 使用setTimeout包装setOldPathname，避免同步调用导致级联渲染
    setTimeout(() => setOldPathname(location.pathname), 0)
    setTimeout(() => {
      // 随机返回 0 或 1
      const authed = 1
      if (authed) {
        console.log('拥有访问权 PagePermissionMiddleware')
        setAuth(true)
      } else {
        console.log('没有访问权 PagePermissionMiddleware')
        setAuth(false)
      }
      setLoading(false)
    }, 2000)
  }, [location.pathname, oldPathname])
  if (loading) {
    return <LazyLoading />
  }
  if (!auth) {
    return <Result status="error" title="403" description="没有权限访问此页面" />
  }
  return <Outlet />
}

export default PagePermissionMiddleware
