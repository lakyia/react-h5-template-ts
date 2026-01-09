import { Button } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import styles from './My.module.less'
import { useState } from 'react'
import { useAppStore } from '@/stores/app'
import { useEffectOnActive, useKeepAliveContext } from 'keepalive-for-react'
const My = () => {
  const navigate = useNavigate()
  const [count, setCount] = useState(0)
  const { refresh, active } = useKeepAliveContext()
  const { removeKeepAlive, addKeepAlive } = useAppStore.getState()

  const navigatePath = (path: string) => {
    navigate(path)
  }
  useEffectOnActive(() => {
    console.log('KeepAlive Page is active', count)
  }, [count])
  return (
    <div className={styles.my}>
      <div>My Page</div>
      <div>
        <div>
          <span>Active: {active ? 'true' : 'false'}</span>
        </div>
        <div>{count}</div>
        <div>
          <button onClick={() => setCount(count + 1)}>Increase</button>
          <button onClick={() => setCount(count - 1)}>Decrease</button>
          <button onClick={() => refresh()}>Refresh</button>
        </div>
      </div>
      <div className={styles.buttons}>
        <Button
          block
          onClick={() => {
            addKeepAlive('/keep')
          }}
          size="large">
          Add Keep Alive '/keep'
        </Button>
        <br />
        <Button
          block
          onClick={() => {
            removeKeepAlive('/keep')
          }}
          size="large">
          Remove Keep Alive '/keep'
        </Button>
        <br />
        <Button
          block
          onClick={() => {
            navigatePath('/keep')
          }}
          size="large">
          Go Keep Alive '/keep'
        </Button>{' '}
        <br />
        <Button
          block
          onClick={() => {
            navigatePath('/login')
          }}
          size="large">
          Login Button
        </Button>
      </div>
    </div>
  )
}

export default My
