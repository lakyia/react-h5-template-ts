import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './keep.module.less'
import { useEffectOnActive, useKeepAliveContext } from 'keepalive-for-react'

function Keep() {
  const navigate = useNavigate()

  const [count, setCount] = useState(0)
  const { refresh, active } = useKeepAliveContext()

  const naviBack = () => {
    navigate(-1)
  }
  useEffectOnActive(() => {
    console.log('Keep Alive Page is active', count)
  }, [count])

  return (
    <div className={styles.root}>
      <div>
        <div>
          <span>Active: {active ? 'true' : 'false'}</span>
        </div>
        <div>{count}</div>
        <div>
          <button onClick={() => setCount(count + 1)}>Increase</button>
          <button onClick={() => setCount(count - 1)}>Decrease</button>
          <button onClick={() => refresh()}>Refresh</button>
          <button onClick={naviBack}>Back</button>
        </div>
      </div>
    </div>
  )
}

export default Keep
