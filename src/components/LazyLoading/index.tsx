import { SpinLoading } from 'antd-mobile'
import type { CSSProperties } from 'react'

const LazyLoading = () => {
  // 定义 loading 样式对象
  const loadingStyles: CSSProperties = {
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    // 可选：可以补充一些常用样式，比如 z-index 确保加载层在最上层
    zIndex: 9999
  }
  return (
    <div style={loadingStyles}>
      <SpinLoading color="primary" />
    </div>
  )
}

export default LazyLoading
