import { APPS } from '@/apps/core/container'
import { AppName } from '@/apps/core/model'
import { option } from '@/util/container'
import icon from '../assets/app-account.svg'

export const APP_ACCOUNT: AppName = 'APP_ACCOUNT'

export default option(APPS, async () => {
  return {
    name: APP_ACCOUNT,
    label: 'Accounts',
    link: {
      to: { name: 'AppAccount' },
      icon,
    },
    order: 1,
  }
})
