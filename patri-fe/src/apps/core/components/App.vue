<template lang="pug">
.app-container
  #app(data-router-view)
    layout-engine(default-layout='core-layout-default')
      router-view(:key='routerViewKey')
</template>

<script lang="ts">
import LayoutEngine from '@/apps/ui/layout/layout-engine'
import { Component, Mixins } from 'vue-property-decorator'
import { LoginRequired } from '../model'
import ContainerMixin from './mixins/container.mixin'

@Component({ components: { LayoutEngine } })
export default class App extends Mixins(ContainerMixin) {
  private loginRequired = false

  private get routerViewKey(): string {
    const key = this.$route.matched[0]?.meta?.key

    return typeof key === 'function' ? key(this.$route) : this.$route.path
  }

  private errorCaptured(e: Error): false | void {
    if (e instanceof LoginRequired) {
      this.loginRequired = true

      return false
    }
  }

  private onLoginClick(): void {
    // this.container(SUPABASE);
    //login
  }
}
</script>
