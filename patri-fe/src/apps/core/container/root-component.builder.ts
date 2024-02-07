import { builder } from '@/util/container'
import Vue from 'vue'
import { CONTAINER, ROOT_COMPONENT, ROUTER, VUE } from '.'
import App from '../components/App.vue'

export default builder(({ provide }) => {
  provide(VUE, async () => Vue)

  provide(ROOT_COMPONENT, async (get) => {
    const vue = await get(VUE)
    const router = await get(ROUTER)

    return vue.extend({
      name: 'Root',
      props: { container: { required: true } },
      router,
      provide() {
        return {
          [CONTAINER]: this.container,
        }
      },
      render(h) {
        return h(App)
      },
    })
  })
})
