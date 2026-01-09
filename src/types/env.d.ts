// 环境变量类型定义

interface ImportMetaEnv {
  // 应用基础配置
  readonly VITE_APP_ENV: 'development' | 'production' | 'test'
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_API_URL: string
  readonly VITE_APP_DEBUG: boolean
  
  // 日志配置
  readonly VITE_APP_LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error'
  
  // 特性开关
  readonly VITE_APP_ENABLE_ANALYTICS: boolean
  readonly VITE_APP_ENABLE_MOCK: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
