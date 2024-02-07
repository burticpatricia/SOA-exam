<template lang="pug">
ui-clickable.ui-button(tag='button', v-bind='$attrs', :class='{ inline }', @click='$emit("click", $event)')
  span.label(v-if='$scopedSlots[slotName("front")]', :class='{ fixed: fixedWidth }')
    slot(:name='slotName("front")')
  .inner(:class='{ fixed: fixedWidth }')
    span.label(v-if='$scopedSlots[slotName("before")]', :class='{ fixed: fixedWidth }')
      slot(:name='slotName("before")')
    .icon(v-if='icon')
      img(:src='icon')
    span.label(v-if='$scopedSlots[slotName("after")]', :class='{ fixed: fixedWidth }')
      slot(:name='slotName("after")')
  span.label(v-if='$scopedSlots[slotName("back")]', :class='{ fixed: fixedWidth }')
    slot(:name='slotName("back")')
</template>

<script lang="ts">
import { StringProp, BooleanProp, EnumProp } from '@/util/prop-decorators'
import { Component, Vue } from 'vue-property-decorator'

@Component({ inheritAttrs: false })
export default class ButtonWithIcon extends Vue {
  @StringProp()
  private readonly icon?: string
  @BooleanProp()
  private readonly after!: boolean
  @BooleanProp()
  private readonly front!: boolean
  @BooleanProp()
  private readonly back!: boolean
  @BooleanProp()
  private readonly fixedWidth!: boolean
  @BooleanProp()
  private readonly inline!: boolean
  @EnumProp('sm', 'md', 'lg')
  private readonly size!: string

  public slotName(slotName: string): string {
    const defaultSlotName = this.front ? 'front' : this.back ? 'back' : this.after ? 'after' : 'before'
    if (slotName === defaultSlotName) {
      return 'default'
    }
    return slotName
  }
}
</script>

<style lang="scss" scoped>
.ui-button {
  @apply px-5 py-1 text-lg rounded-default bg-primary text-white hover:opacity-80 hover:cursor-pointer;

  &[sm] {
    @apply px-3 py-1 text-sm;
  }

  &[md] {
    @apply px-4 py-1 text-lg;
  }

  &[lg] {
    @apply px-6 py-3 text-xl;
  }
}
</style>
