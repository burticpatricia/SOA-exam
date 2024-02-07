declare module '*.jpg' {
  const url: string

  export default url
}

declare module '*.png' {
  const url: string

  export default url
}

declare module '*.gif' {
  const url: string

  export default url
}

declare module '*.svg' {
  const url: string

  export default url
}

declare module '*.svg?vue' {
  import { Component } from 'vue'

  const component: Component

  export default component
}

declare module '*.svg?inline' {
  import { Component } from 'vue'

  const component: Component

  export default component
}
