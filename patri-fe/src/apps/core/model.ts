import { Route } from 'vue-router'

export class LoginRequired extends Error {}

export type AppName = `APP_${string}`

export interface App {
  name: AppName
  label: string
  link: {
    to: Partial<Route>
    icon?: string
    [key: string]: unknown
  }
  order?: number
  children?: PartialKeys<App, 'name'>[]
}

export function appOrderCompare(a: App, b: App): number {
  return (a.order || 0) - (b.order || 0) || (a.label || a.name).localeCompare(b.label || b.name)
}
