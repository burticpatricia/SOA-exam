import { ROUTES } from '@/apps/core/container'
import { option } from '@/util/container'
import { component } from '../component'
import { APP_ACCOUNT } from './app.builder'

export default option(ROUTES, async () => [
  {
    path: '/account',
    name: 'AppAccount',
    component: component('views/app/AppView.vue'),
    meta: { app: APP_ACCOUNT, key: () => 'AppAccount', guest: false },
  },
])
