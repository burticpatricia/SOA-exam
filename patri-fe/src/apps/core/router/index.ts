import { partialRight, repeat } from 'lodash'
import { parse, stringify } from 'qs'
import Router, { Route, RouteConfig } from 'vue-router'

export function createRouter(routes: RouteConfig[]): Router {
  return new Router({
    mode: 'history',
    base: '/',
    routes: [...routes],
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition !== undefined && savedPosition !== null) {
        return { ...savedPosition, behavior: 'smooth' }
      }

      // at which depth did the view change?
      const depth = to.matched.findIndex((record, i) => {
        if (record !== from.matched[i]) {
          return true
        }

        const key = record.meta?.key as undefined | ((route: Route) => string)

        return typeof key === 'function' && key(from) !== key(to)
      })
      if (depth < 0) {
        return undefined
      }

      const element = document.querySelector(repeat('[data-router-view] ', depth + 1))
      if (element === null) {
        return undefined
      }

      let offset = 0
      let parent: Element | undefined = element
      do {
        offset += Number(parent.getAttribute('data-router-view-offset')) || 0
        parent = parent.parentElement ?? undefined
      } while (parent !== undefined)

      const top = element.getBoundingClientRect().top - offset
      const currentScrollTop = window.scrollY !== undefined ? window.scrollY : window.pageYOffset

      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return -- TODO see https://github.com/vuejs/vue-router/issues/2252#issuecomment-741191062
      return top < 0 ? ({ y: currentScrollTop + top, behavior: 'smooth' } as any) : undefined
    },
    parseQuery: partialRight(parse, {
      allowDots: true,
      ignoreQueryPrefix: true,
    }),
    stringifyQuery: partialRight(stringify, {
      addQueryPrefix: true,
      allowDots: true,
      skipNulls: true,
    }),
  })
}
