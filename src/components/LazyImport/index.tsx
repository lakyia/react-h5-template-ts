import { Suspense } from 'react'
import type { ComponentType } from 'react'
import LazyLoading from '@/components/LazyLoading'

const NullComponent = () => null

interface LazyImportProps {
  lazy?: ComponentType
}

export const LazyImport = ({ lazy }: LazyImportProps) => {
  const Component = lazy || NullComponent
  return (
    <Suspense fallback={<LazyLoading />}>
      <Component />
    </Suspense>
  )
}
