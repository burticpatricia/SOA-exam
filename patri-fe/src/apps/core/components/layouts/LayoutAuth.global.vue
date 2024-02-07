<template lang="pug">
.layout-auth(key='layout')
  main.main(key='main', :class='{ "single-page": singlePage }')
    transition(name='main', mode='out-in')
      slot
</template>

<script lang="ts">
import { BooleanProp } from '@/util/prop-decorators'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class LayoutDefault extends Vue {
  @BooleanProp()
  private readonly scrollToTop!: boolean

  @BooleanProp()
  private readonly singlePage!: boolean
}
</script>

<style lang="scss" scoped>
.main {
  @apply h-screen;
}

.main.single-page {
  @apply mb-0;
}

.layout-enter-active,
.layout-leave-active {
  transition: opacity 300ms;
}
.layout-enter,
.layout-leave-to {
  opacity: 0;
}

.main-enter-active,
.main-leave-active {
  transition: opacity 300ms;
}
.main-enter,
.main-leave-to {
  @apply opacity-0;
}
</style>
