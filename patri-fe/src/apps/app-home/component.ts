import { AsyncComponent } from 'vue'

export function component(path: string): AsyncComponent {
  return () =>
    import(
      /* webpackChunkName: "app-home" */
      /* webpackInclude: /\.vue$/ */
      /* webpackMode: "lazy-once" */
      /* webpackPrefetch: true */
      `./${path}`
    )
}
