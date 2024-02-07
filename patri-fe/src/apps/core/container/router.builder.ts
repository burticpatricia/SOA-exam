import { builder } from '@/util/container'
import { flatten } from 'lodash'
import Component from 'vue-class-component'
import Router from 'vue-router'
import { ROUTER, ROUTES, VUE } from '.'
import { createRouter } from '../router'
import { setupAuthChecker } from '../router/auth-checker'

Component.registerHooks(['beforeRouteEnter', 'beforeRouteLeave', 'beforeRouteUpdate'])

export default builder(({ configure, provide }) => {
  provide(ROUTER, async (get) => createRouter(flatten(await get(ROUTES))))

  configure(async (get) => void (await get(VUE)).use(Router))
  configure(async (get) => void setupAuthChecker(await get(VUE), await get(ROUTER)))
})
