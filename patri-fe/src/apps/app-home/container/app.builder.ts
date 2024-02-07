import { APPS } from '@/apps/core/container'
import { AppName } from '@/apps/core/model'
import { option } from '@/util/container'
import icon from '../assets/app-home.svg'

export const APP_HOME: AppName = 'APP_HOME'

export default option(APPS, async () => {
  return {
    name: APP_HOME,
    label: 'Home',
    link: {
      to: { name: 'AppHome' },
      icon,
    },
    order: 0,
  }
})
