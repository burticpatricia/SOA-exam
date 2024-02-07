import { JWT_COOKIE_NAME } from '@/auth'
import { get } from 'lodash'
import { VueConstructor } from 'vue'
import Router from 'vue-router'

export function setupAuthChecker(vue: VueConstructor, router: Router): void {
  router.beforeEach(async (to, _from, next) => {
    const cookieJWTToken = (vue.$cookies.get(JWT_COOKIE_NAME) as string) ?? undefined

    const isGuestRoute = Boolean(get(to, 'meta.guest', undefined))

    // If this is not a guest route and there is no session go to sign in
    if (!isGuestRoute && cookieJWTToken === undefined) {
      return next({ name: 'SignIn' })
    }

    // // If this is a guest route and there is a session which is valid then go to app home
    if (isGuestRoute && cookieJWTToken !== undefined) {
      return next({ name: 'AppHome' })
    }

    return next()
  })
}
