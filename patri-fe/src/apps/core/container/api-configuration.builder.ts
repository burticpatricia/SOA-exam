/* eslint-disable @typescript-eslint/no-misused-promises */
import { Configuration } from '@/__generated__/api'
import { JWT_COOKIE_NAME } from '@/auth'
import { builder } from '@/util/container'
import { API_CONFIGURATION, VUE } from '.'

export default builder(({ provide }) => {
  provide(API_CONFIGURATION, async () => {
    return new Configuration({
      basePath: 'http://localhost:3000',
    })
  })
})
