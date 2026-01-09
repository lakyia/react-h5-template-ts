import { lazy } from 'react'
import { buildRoutes } from './utils'
import { createBrowserRouter } from 'react-router'
import ErrorBoundary from '@/components/ErrorBoundary'

const routeConfig = [
  {
    ErrorBoundary: ErrorBoundary,
    element: lazy(() => import('@/layouts/AppLayout')),
    children: [
      {
        path: '/login',
        element: lazy(() => import('@/views/Login/index'))
      },
      {
        path: '/',
        index: true,
        element: lazy(() => import('@/views/Home'))
      },
      {
        path: '/message',
        element: lazy(() => import('@/views/Message'))
      },
      {
        path: '/my',
        element: lazy(() => import('@/views/My'))
      },
      {
        path: '/about',
        element: lazy(() => import('@/views/About/index'))
      },
      {
        path: '/keep',
        element: lazy(() => import('@/views/Keep/index'))
      }
    ]
  }
]

export const routes = buildRoutes(routeConfig)

export const router = createBrowserRouter(routes)
