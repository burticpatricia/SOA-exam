import { ROUTES } from '@/apps/core/container'
import { option } from '@/util/container'
import { component } from '../component'
import { APP_HOME } from './app.builder'

export default option(ROUTES, async () => [
  {
    path: '/',
    beforeEnter: (_to, _from, next) => next({ name: 'AppHome' }),
  },
  {
    path: '/home',
    name: 'AppHome',
    component: component('views/app/AppView.vue'),
    meta: { app: APP_HOME, key: () => 'AppHome', guest: false },
  },
])
