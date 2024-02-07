<template lang="pug">
component.ui-clickable(:is='tag', :class='{ disabled }', v-bind='$attrs', @click='onClick')
  slot
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Clickable extends Vue {
  private get disabled(): boolean {
    return this.$attrs.disabled !== undefined && (this.$attrs.disabled as unknown) !== false
  }

  private get tag(): string {
    if (this.$attrs.to) {
      return 'router-link'
    }

    return this.$attrs.tag || 'a'
  }

  private onClick(event: MouseEvent): void {
    if (this.$attrs.stop !== undefined) {
      event.stopPropagation()
    }

    if (this.disabled) {
      event.preventDefault()
      return
    }

    if (this.tag !== 'a' || this.$attrs.href === undefined) {
      event.preventDefault()
    }

    this.$emit('click', event)
  }
}
</script>

<style lang="scss" scoped>
.ui-clickable {
  @apply w-max decoration-inherit cursor-pointer;
}

.ui-clickable.disabled {
  cursor: inherit;
  @apply text-gray-300;
}
</style>
