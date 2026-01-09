import { createRoot, type Root, type Container } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { unstableSetRender } from 'antd-mobile' // Support since version ^5.40.0
type ReactContainer = Container & { _reactRoot?: Root } //扩展容器类型
unstableSetRender((node: React.ReactNode, container: ReactContainer) => {
  container._reactRoot ||= createRoot(container)
  const root = container._reactRoot
  root.render(node)
  return async () => {
    await new Promise(resolve => setTimeout(resolve, 0))
    root.unmount()
  }
})
createRoot(document.getElementById('root')!).render(<App />)
