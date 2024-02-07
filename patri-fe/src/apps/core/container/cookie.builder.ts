import { builder, configure } from '@/util/container'
import cookies from 'vue-cookies'
import { VUE } from '.'

export default builder(({ configure }) => {
  configure(async (get) => {
    const vue = await get(VUE)

    vue.use(cookies)
  })
})
