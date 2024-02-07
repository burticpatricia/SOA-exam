import { kebabCase } from 'lodash'
import { Component, VueConstructor } from 'vue'
import { ImportedComponent, AsyncComponent } from 'vue/types/options'

const prefixRegEx = /^.*\//
const suffixRegEx = /\..*$/

export function extractComponent(component: ImportedComponent | Component): Component {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return 'default' in component ? component.default : component
}

export function toComponentName(path: string): string {
  return kebabCase(path.replace(prefixRegEx, '').replace(suffixRegEx, ''))
}

export interface ComponentLoaderResult {
  name: string
  component: Component
}

type Context = __WebpackModuleApi.RequireContext

// https://webpack.js.org/guides/dependency-management/#require-context
export function createLoader(context: Context, prefix = ''): () => Iterable<ComponentLoaderResult> {
  return function* () {
    for (const path of context.keys()) {
      const component = extractComponent(context(path))
      const name = prefix + toComponentName(path)
      yield { name, component }
    }
  }
}

export default function registerComponents(vue: VueConstructor, context: Context, prefix = ''): void {
  for (const { name, component } of createLoader(context, prefix)()) {
    vue.component(name, component)
  }
}

export function registerAsyncComponents(
  vue: VueConstructor,
  context: Context,
  factory: (path: string) => AsyncComponent,
  prefix = '',
): void {
  for (const path of context.keys()) {
    vue.component(prefix + toComponentName(path), factory(path.slice(2)))
  }
}
