import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
// 获取当前文件目录路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const nowDate = new Date()
  const buildTime = `${
    nowDate.getFullYear() +
    '-' +
    (nowDate.getMonth() + 1) +
    '-' +
    nowDate.getDate() +
    '  ' +
    nowDate.getHours() +
    ':' +
    nowDate.getMinutes() +
    '  ' +
    nowDate.getSeconds()
  }`
  const packTime = [
    nowDate.getFullYear(),
    ('0' + (nowDate.getMonth() + 1)).slice(-2),
    nowDate.getDate(),
    nowDate.getHours(),
    nowDate.getMinutes()
  ].join('')
  return {
    plugins: [
      react({
        babel: {
          plugins: [['babel-plugin-react-compiler']]
        }
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        images: path.resolve(__dirname, 'src/assets/images'),
        utils: path.resolve(__dirname, 'src/utils')
      }
    },
    css: {
      // modules配置最终会丢给postcss modules
      modules: {
        // 是对css模块化的默认行为进行覆盖
        localsConvention: 'camelCase' as const, // 修改生成的配置对象的key的展示形式(驼峰还是中划线形式)
        scopeBehaviour: 'local' as const, // 配置当前的模块化行为是模块化还是全局化 (有hash就是开启了模块化的一个标志, 因为他可以保证产生不同的hash值来控制我们的样式类名不被覆盖)
        generateScopedName: '[name]_[local]_[hash:5]'
      },
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },
    define: {
      appInfos: JSON.stringify({ packTime, buildTime }),
      'process.env.NODE_ENV': JSON.stringify(mode)
    },
    // 本地开发服务器配置
    server: {
      port: 3000, // 开发服务器端口
      open: true, // 自动打开浏览器
      host: '0.0.0.0', // 允许外部访问
      proxy: {
        // 代理配置示例
        '/api': {
          target: 'http://localhost:8080', // 后端API地址
          changeOrigin: true, // 允许跨域
          rewrite: path => path.replace(/^\/api/, '') // 重写路径
        }
      },
      hmr: {
        // 热更新配置
        overlay: true, // 显示错误覆盖层
        timeout: 3000, // 热更新超时时间
        protocol: 'ws', // 热更新协议
        host: 'localhost'
      }
    },
    // 构建配置
    build: {
      sourcemap: mode === 'development', // 开发环境生成sourcemap
      minify: mode === 'production' ? 'esbuild' : false, // 生产环境压缩代码
      outDir: 'dist', // 输出目录
      rollupOptions: {
        output: {
          manualChunks: {
            // 代码分割配置
            react: ['react', 'react-dom'],
            antd: ['antd-mobile'],
            router: ['react-router', 'react-router-dom'],
            state: ['zustand', 'immer']
          }
        }
      }
    },
    // 预览服务器配置
    preview: {
      port: 3001, // 预览服务器端口
      open: true, // 自动打开浏览器
      host: '0.0.0.0' // 允许外部访问
    }
  }
})
