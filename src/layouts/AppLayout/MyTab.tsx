import { TabBar } from 'antd-mobile'
import { useNavigate, useLocation } from 'react-router-dom'
import { AppOutline, MessageOutline, UserOutline } from 'antd-mobile-icons'
import styles from './MyTab.module.less'

interface TabItem {
  key: string
  title: string
  icon: React.ReactNode
}

const Bottom = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { pathname } = location

  const setRouteActive = (value: string) => {
    navigate(value)
  }

  const tabs: TabItem[] = [
    {
      key: '/',
      title: '首页',
      icon: <AppOutline />
    },
    {
      key: '/message',
      title: '消息',
      icon: <MessageOutline />
    },
    {
      key: '/my',
      title: '我的',
      icon: <UserOutline />
    }
  ]

  return (
    <TabBar activeKey={pathname} safeArea onChange={setRouteActive}>
      {tabs.map(item => (
        <TabBar.Item className={styles.item} key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  )
}

const MyTab = () => {
  return (
    <div className={styles.bottom}>
      <Bottom />
    </div>
  )
}

export default MyTab
