import { Name } from './name'
import { Definition, Factory } from './definition'
import { build, load } from './builder'

export type SafeGet<V = unknown> = <T extends V>(name: Name<T>) => T
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- wont fix (container needs refactoring)
type ResolvedMap = Map<Name, any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- wont fix (container needs refactoring)
type Resolver = (value: any) => void

export async function container(context: __WebpackModuleApi.RequireContext): Promise<SafeGet> {
  const builders = await Promise.all([...load(context)])
  const definition = build(builders)
  const resolved = await resolve(definition)

  return createSafeNameMapGetter(resolved)
}

// TODO detect deadlocks
async function resolve(definition: Definition): Promise<ResolvedMap> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- wont fix (container needs refactoring)
  const resolved: ResolvedMap = new Map<Name, any>()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- wont fix (container needs refactoring)
  const deps = new Map<Name, Promise<any>>()
  const resolvers = new Map<Name, Resolver>()
  const get = createSafeNameMapGetter(deps)

  for (const map of [definition.options, definition.providers]) {
    for (const name of map.keys()) {
      deps.set(name, new Promise((resolve) => void resolvers.set(name, resolve)))
    }
  }

  const running = new Array<Promise<unknown>>()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- wont fix (container needs refactoring)
  function execute(factory: Factory<any>): Promise<any> {
    return factory(get)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- wont fix (container needs refactoring)
  function resolver(name: Name): (value: any) => void {
    return (value) => {
      resolved.set(name, value)

      const resolve = resolvers.get(name)
      if (resolve) {
        resolve(value)
        resolvers.delete(name)
      }
    }
  }

  for (const [name, factories] of definition.options) {
    running.push(Promise.all(factories.map(execute)).then(resolver(name)))
  }

  for (const [name, factory] of definition.providers) {
    running.push(factory(get).then(resolver(name)))
  }

  for (const configurator of definition.configurators) {
    running.push(configurator(get))
  }

  await Promise.all(running)

  return resolved
}

function createSafeNameMapGetter<V>(map: Map<Name, V>): SafeGet<V> {
  return (key) => {
    const value = map.get(key)

    if (!value) {
      throw new Error(`${String(key)} not found`)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return -- wont fix (container needs refactoring)
    return value as any
  }
}
