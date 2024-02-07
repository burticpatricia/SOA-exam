import { Name as ImportName } from './name'
import { OptionName as ImportOptionName } from './option'
import { SafeGet } from './container'

export { builder, provide, configure, option } from './builder'
export { name } from './name'
export { optionName } from './option'
export { container, container as default } from './container'

export type Container = SafeGet
export type Name = ImportName
export type OptionName = ImportOptionName
