<template lang="pug">
.layout-default(key='layout', data-router-view-offset='76')
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

  private scrolled = false

  private doScrollToTop(): void {
    window.scroll({ top: 0, behavior: 'smooth' })
  }
}
</script>

<style lang="scss" scoped>
$headerHeight: 70px;
$appBarWidth: 250px;
$layoutDefaultPaddingTop: calc($headerHeight + calc($headerHeight / 3));
$layoutDefaultPaddingLeft: calc($appBarWidth + 40px);
$mainHeight: calc(100vh - calc($headerHeight + calc($headerHeight / 2)));

.layout-default {
  @apply flex gap-24 flex-row h-screen bg-background;
  @apply pt-[#{calc($layoutDefaultPaddingTop)}];
}

.aside {
  @apply w-[120px] sm:w-[200px];
}

.main {
  @apply flex-grow overflow-auto px-10 pt-6 min-w-[800px];
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
