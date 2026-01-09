# React H5 Template with TypeScript

一个基于 React 19 + TypeScript + Vite 的移动端 H5 模板，集成了路由管理、状态管理、UI 组件库和常用工具函数，提供了完整的开发架构和最佳实践。

## 🚀 技术栈

- **React**: ^19.2.1
- **TypeScript**: ~5.9.3
- **Vite**: ^7.3.1
- **React Router**: ^7.10.1
- **Zustand**: ^5.0.3 (状态管理)
- **Ant Design Mobile**: ^5.41.0 (UI 组件库)
- **Axios**: ^1.12.2 (HTTP 客户端)
- **Lodash**: ^4.17.21 (工具库)
- **Immer**: ^10.1.1 (不可变数据处理)
- **keepalive-for-react**: ^5.0.7 (路由缓存)
- **keepalive-for-react-router**: ^5.0.7 (React Router 缓存支持)
- **crypto-js**: ^4.2.0 (加密库)

## ✨ 功能特点

- **严格的 TypeScript 类型检查**：提供完整的类型定义，确保代码质量和开发体验
- **模块化的代码结构**：清晰的目录划分，便于维护和扩展
- **路由管理**：基于 React Router 7，支持路由嵌套、动态路由和路由缓存
- **状态管理**：使用 Zustand 进行高效的状态管理
- **权限控制**：实现了基于中间件的路由权限验证
- **错误处理**：全局错误边界，友好的错误提示
- **HTTP 请求封装**：Axios 实例封装，支持请求/响应拦截和类型定义
- **组件懒加载**：支持路由组件和普通组件的懒加载
- **移动端适配**：响应式设计，适配各种移动端设备
- **现代化的 UI 设计**：使用 Ant Design Mobile，提供了美观的 UI 组件
- **代码分割**：自动代码分割，优化首屏加载速度

## 📦 安装依赖

```bash
npm install
```

## 🛠️ 开发脚本

| 脚本命令    | 功能描述                     |
| ----------- | ---------------------------- |
| `npm run dev`   | 启动开发服务器               |
| `npm run build` | 构建生产版本                 |
| `npm run lint`  | 代码检查                     |
| `npm run preview` | 预览生产构建               |

## 🚀 快速开始

1. **启动开发服务器**

```bash
npm run dev
```

2. **构建生产版本**

```bash
npm run build
```

3. **预览生产构建**

```bash
npm run preview
```

## 📁 目录结构

```
src/
├── assets/           # 静态资源
├── common/           # 通用功能
│   └── funcs.ts         # 常用工具函数
├── components/       # 通用组件
│   ├── ErrorBoundary/   # 错误边界组件
│   ├── LazyImport/      # 懒加载组件
│   └── LazyLoading/     # 加载中组件
├── layouts/          # 布局组件
│   ├── AppLayout/       # 应用布局
│   └── BasicLayout/     # 基础布局
├── middlewares/      # 中间件
│   ├── AuthMiddleware/     # 权限验证中间件
│   └── PagePermissionMiddleware/  # 页面权限中间件
├── router/           # 路由配置
│   ├── index.tsx        # 路由实例创建
│   └── utils.tsx        # 路由工具函数
├── stores/           # 状态管理
│   ├── app.ts           # 应用状态
│   └── user.ts          # 用户状态
├── utils/            # 工具函数
│   └── request.ts       # HTTP 请求封装
├── views/            # 页面组件
│   ├── About/           # 关于页面
│   ├── Home/            # 首页
│   ├── Keep/            # 缓存页面示例
│   ├── Login/           # 登录页面
│   ├── Message/         # 消息页面
│   └── My/              # 我的页面
├── App.css           # 应用样式
├── App.tsx           # 应用入口组件
├── index.css         # 全局样式
├── main.tsx          # 应用挂载入口
└── vite-env.d.ts     # Vite 环境类型声明
```

## 🔧 核心功能

### 1. 路由管理

基于 React Router 7 实现，支持：
- 路由嵌套和动态路由
- 路由缓存（使用 keepalive-for-react）
- 路由权限控制
- 路由懒加载

### 2. 状态管理

使用 Zustand 进行状态管理，定义了以下 store：

- `useUserStore`: 用户状态管理，包含登录状态、用户信息等
- `useAppStore`: 应用状态管理，包含路由缓存配置等

### 3. 权限控制

通过中间件实现路由权限控制：
- `AuthMiddleware`: 验证用户登录状态，未登录则跳转到登录页
- `PagePermissionMiddleware`: 页面级权限验证

### 4. HTTP 请求

封装了 Axios 实例，支持：
- 请求/响应拦截
- 类型定义
- 错误处理

### 5. 组件懒加载

通过 `LazyImport` 组件实现组件的懒加载：

```tsx
<LazyImport lazy={() => import('@/pages/Home')} />
```

### 6. 路由缓存

使用 `keepalive-for-react` 实现路由缓存：

```tsx
<KeepAliveRouteOutlet
  wrapperComponent={MemoScrollTopWrapper}
  duration={300}
  transition={true}
  include={keepAlivePaths}
  aliveRef={aliveRef}
  enableActivity={true}
/>
```

## 🎨 组件库

使用 Ant Design Mobile 作为 UI 组件库，提供了丰富的移动端组件。

## 📝 类型定义

- 为所有组件和工具函数添加了 TypeScript 类型定义
- 使用 `import type` 进行类型导入，符合 TypeScript 的 `verbatimModuleSyntax` 要求
- 为样式文件添加了类型声明

## 🎯 最佳实践

- 组件化开发，提高代码复用性
- 类型优先，确保代码质量
- 模块化设计，便于维护和扩展
- 合理使用 hooks，避免不必要的渲染
- 状态管理集中化，便于调试和监控
- 路由缓存优化，提高用户体验
- 代码分割，优化首屏加载速度

## 📄 许可证

MIT
