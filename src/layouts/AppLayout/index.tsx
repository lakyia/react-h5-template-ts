import { useKeepAliveRef } from 'keepalive-for-react'
import KeepAliveRouteOutlet from 'keepalive-for-react-router'
import { useEffect, useMemo, useRef } from 'react'
import { useLocation } from 'react-router'
import { useAppStore } from '@/stores/app'
import MyTab from './MyTab.tsx'
import styles from './AppLayout.module.less'

const AppLayout = () => {
  const location = useLocation()
  const activePath = location.pathname + location.search
  const aliveRef = useKeepAliveRef()
  const tapPaths = ['/', '/message', '/my']
  const { keepAlivePaths } = useAppStore.getState()

  console.log('AppLayout keepAlivePaths', keepAlivePaths)
  return (
    <div className={styles.page}>
      <KeepAliveRouteOutlet
        wrapperComponent={MemoScrollTopWrapper}
        duration={300}
        transition={true}
        include={keepAlivePaths}
        aliveRef={aliveRef}
        enableActivity={true}
      />
      {tapPaths.includes(activePath) && <MyTab />}
    </div>
  )
}

interface MemoScrollTopWrapperProps {
  children: React.ReactNode
}

function MemoScrollTopWrapper({ children }: MemoScrollTopWrapperProps) {
  const domRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const scrollHistoryMap = useRef<Map<string, number>>(new Map())

  const activeKey = useMemo(() => {
    return location.pathname + location.search
  }, [location.pathname, location.search])

  useEffect(() => {
    const divDom = domRef.current
    if (!divDom) return

    // 延迟执行以等待页面渲染和过渡动画完成
    setTimeout(() => {
      divDom.scrollTo(0, scrollHistoryMap.current.get(activeKey) || 0)
    }, 300)

    const onScroll = (e: Event) => {
      const target = e.target as HTMLDivElement
      if (!target) return
      scrollHistoryMap.current.set(activeKey, target.scrollTop || 0)
    }

    divDom.addEventListener('scroll', onScroll, {
      passive: true
    })

    return () => {
      divDom.removeEventListener('scroll', onScroll)
    }
  }, [activeKey])

  return (
    <div
      style={{
        height: '100%'
      }}
      ref={domRef}>
      {children}
    </div>
  )
}

export default AppLayout
