import container from '@/bootstrap'
import { ROOT_COMPONENT } from './apps/core/container'

void (async () => {
  const get = await container()

  const root = get(ROOT_COMPONENT)
  new root({ propsData: { container: get } }).$mount('#app')
})()
