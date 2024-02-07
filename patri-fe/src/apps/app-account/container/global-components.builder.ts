import { VUE } from '@/apps/core/container'
import { registerAsyncComponents } from '@/util/component-loader'
import { configure } from '@/util/container'
import { component } from '../component'

export default configure(async (get) => {
  const vue = await get(VUE)

  registerAsyncComponents(vue, require.context('..', true, /\.global\.vue$/, 'weak'), component, 'app-account-')
})
