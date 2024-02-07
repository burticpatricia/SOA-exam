import { Component, Mixins } from 'vue-property-decorator'
import { API, APP_MAP } from '../../container'
import { App } from '../../model'
import ContainerMixin from './container.mixin'
import { DefaultApi } from '@/__generated__/api'

@Component
export default class ApiMixin extends Mixins(ContainerMixin) {
  protected get api(): DefaultApi {
    return this.container(API)
  }
}
