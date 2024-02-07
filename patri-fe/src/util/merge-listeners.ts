import { assignWith, isArray } from 'lodash'

// eslint-disable-next-line @typescript-eslint/ban-types -- Vue types require Function
type Listeners = Record<string, Function | Function[]>

export function mergeListeners(left: Listeners, right: Listeners): Listeners {
  return assignWith({}, left, right, (a, b) =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment
    a === undefined ? b : isArray(a) ? [...a, b] : [a, b],
  )
}
