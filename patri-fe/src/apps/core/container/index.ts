import { Configuration, DefaultApi } from '@/__generated__/api'
import { name, optionName } from '@/util/container'
import { VueConstructor } from 'vue'
import Router, { RouteConfig } from 'vue-router'
import { App } from '../model'

export const CONTAINER = Symbol('CONTAINER')

export const ROUTES = optionName<RouteConfig[]>('ROUTES')
export const APPS = optionName<App>('APPS')

export const VUE = name<VueConstructor>('VUE')
export const ROOT_COMPONENT = name<VueConstructor>('ROOT_COMPONENT')
export const ROUTER = name<Router>('ROUTER')
export const APP_MAP = name<Record<string, App>>('APP_MAP')
export const API = name<DefaultApi>('API')
export const API_CONFIGURATION = name<Configuration>('API_CONFIGURATION')
