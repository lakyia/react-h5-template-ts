/// <reference types="vite/client" />

declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}

declare module '*.less' {
  const content: { [className: string]: string }
  export default content
}

declare module '*.svg' {
  import type React from 'react'
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  export default ReactComponent
}

declare const appInfos: {
  packTime: string
  buildTime: string
}
