import { Name } from './name'
import { OptionName } from './option'

export type Get = <T>(name: Name<T>) => Promise<T>
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- wont fix (container needs refactoring)
export type Factory<T = any> = (get: Get) => Promise<T>
export type Configurator = (get: Get) => Promise<unknown>

export interface Definition {
  options: Map<OptionName, Factory[]>
  providers: Map<Name, Factory>
  configurators: Set<Configurator>
}
