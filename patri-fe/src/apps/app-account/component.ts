import { AsyncComponent } from 'vue'

export function component(path: string): AsyncComponent {
  return () =>
    import(
      /* webpackChunkName: "app-account" */
      /* webpackInclude: /\.vue$/ */
      /* webpackMode: "lazy-once" */
      /* webpackPrefetch: true */
      `./${path}`
    )
}
