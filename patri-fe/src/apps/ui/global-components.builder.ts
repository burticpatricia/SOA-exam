import { VUE } from '@/apps/core/container'
import { registerAsyncComponents } from '@/util/component-loader'
import { configure } from '@/util/container'
import { AsyncComponent } from 'vue'

function component(path: string): AsyncComponent {
  return () =>
    import(
      /* webpackChunkName: "ui" */
      /* webpackInclude: /\.vue$/ */
      /* webpackMode: "lazy-once" */
      /* webpackPrefetch: true */
      `./${path}`
    )
}

export default configure(async (get) => {
  const vue = await get(VUE)

  registerAsyncComponents(vue, require.context('.', true, /\.global\.vue$/, 'weak'), component, 'ui-')
})
