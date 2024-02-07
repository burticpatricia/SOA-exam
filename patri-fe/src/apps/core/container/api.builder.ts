import { DefaultApi } from '@/__generated__/api'
import { builder } from '@/util/container'
import { API, API_CONFIGURATION, VUE } from '.'
import { JWT_COOKIE_NAME } from '@/auth'

export default builder(({ provide, configure }) => {
  provide(API, async (get) => {
    const configuration = await get(API_CONFIGURATION)

    return new DefaultApi(configuration)
  })

  configure(async (get) => {
    const vue = await get(VUE)
    const apiConfiguration = await get(API_CONFIGURATION)

    const cookieJWTToken = vue.$cookies.get(JWT_COOKIE_NAME) as string | undefined

    apiConfiguration.accessToken = cookieJWTToken
  })
})
