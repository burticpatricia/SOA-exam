import { Component } from 'vue-class-component'
import Router from 'vue-router'
import 'vue/types/vue'

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    router?: Router
    beforeRouteEnter?: NavigationGuard<V>
    beforeRouteLeave?: NavigationGuard<V>
    beforeRouteUpdate?: NavigationGuard<V>
    asyncData?: <T extends unknown = unknown>() => Promise<T> | T
  }
}
