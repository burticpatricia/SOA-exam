import { provide } from '@/util/container'
import { groupBy, mapValues } from 'lodash'
import { APPS, APP_MAP } from '.'

export default provide(APP_MAP, async (get) => {
  const apps = await get(APPS)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- TS limitation
  return mapValues(groupBy(apps, 'name'), (apps) => Object.assign({}, ...apps))
})
