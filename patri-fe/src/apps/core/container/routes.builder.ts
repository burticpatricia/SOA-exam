import { option } from '@/util/container'
import SignInView from '../views/SignInView.vue'
import { ROUTES } from '.'

export default option(ROUTES, async () => [
  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignInView,
    meta: { guest: true },
  },
])
