import { useState } from 'react'
import { Button, Input, Toast, NavBar } from 'antd-mobile'
import { useNavigate } from 'react-router'
import { useUserStore } from '@/stores/user'
import { loginApi } from '@/api/user'
import styles from './login.module.less'

const Login = () => {
  const navigate = useNavigate()
  const { onLogin } = useUserStore()

  // 表单状态
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  })

  // 加载状态
  const [loading, setLoading] = useState(false)

  // 输入变化处理
  const handleInputChange = (field: 'phone' | 'password', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // 表单验证
  const validateForm = () => {
    if (!formData.phone) {
      Toast.show('请输入手机号')
      return false
    }
    if (!formData.password) {
      Toast.show('请输入密码')
      return false
    }
    return true
  }

  // 登录处理
  const handleLogin = async () => {
    if (!validateForm()) return

    setLoading(true)
    try {
      const response = await loginApi(formData)

      if (response.code === 200 || response.retCode === 200) {
        // 登录成功，保存用户信息到store
        const { token, userInfo } = response.data || { token: '', userInfo: { name: '', phone: '' } }
        onLogin({
          token,
          name: userInfo.name,
          phone: userInfo.phone
        })

        Toast.show('登录成功')
        // 跳转到首页
        navigate('/')
      } else {
        Toast.show(response.message || '登录失败')
      }
    } catch (error) {
      console.error('Login error:', error)
      Toast.show('登录失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  // 返回上一页
  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div className={styles.root}>
      {/* 使用 antd-mobile NavBar 组件 */}
      <NavBar
        className={styles.navbar}
        backArrow={
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ff9a3c"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        }
        onBack={handleGoBack}
        right={null}>
        登录
      </NavBar>

      {/* 主内容容器，确保表单在页面中间 */}
      <div className={styles.mainContent}>
        <div className={styles.form}>
          <div className={styles.inputItem}>
            <Input
              placeholder="请输入手机号"
              value={formData.phone}
              onChange={value => handleInputChange('phone', value)}
              clearable
              autoComplete="tel"
              autoFocus
            />
          </div>

          <div className={styles.inputItem}>
            <Input
              placeholder="请输入密码"
              value={formData.password}
              onChange={value => handleInputChange('password', value)}
              clearable
              type="password"
              autoComplete="current-password"
            />
          </div>

          <div className={styles.buttonContainer}>
            <Button color="primary" size="large" loading={loading} onClick={handleLogin} className={styles.loginButton}>
              登录
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
