<script lang="ts">
import { mergeListeners } from '@/util/merge-listeners'
import { BooleanProp, OptionalProp, StringProp } from '@/util/prop-decorators'
import { merge } from 'lodash'
import { VNode } from 'vue'
import { Component, Model, Vue } from 'vue-property-decorator'
import { TRichSelect } from 'vue-tailwind/dist/components'
import { Input, TRichSelectClasses } from './model'

@Component({ inheritAttrs: false })
export default class InputSelect extends Vue implements Input {
  @Model('update')
  private readonly value!: unknown

  @BooleanProp()
  private readonly error!: boolean

  @BooleanProp()
  private readonly autofocus!: boolean

  @BooleanProp()
  private readonly searchable!: boolean

  @BooleanProp()
  private readonly clearable!: boolean

  @BooleanProp(true)
  private readonly closeOnSelect!: boolean

  @OptionalProp()
  private readonly optionLabel?: string | ((value: unknown) => string)

  @StringProp()
  private readonly optionValue?: string

  @OptionalProp(null)
  private readonly unselectedValue!: unknown

  @StringProp('Select…')
  private readonly placeholder?: string

  public pristine = true

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public readonly $refs!: { select: any }

  public get normalizedValue(): unknown {
    return this.value
  }

  public get empty(): boolean {
    return this.value === undefined || this.value === null
  }

  public open(): void {
    this.$refs.select.show = true
  }

  public close(): void {
    this.$refs.select.show = false
  }

  public focus(): void {
    this.$refs.select.focus()
  }

  private render(): VNode {
    return this.$createElement(TRichSelect, {
      props: {
        textAttribute: this.optionLabel,
        valueAttribute: this.optionValue,
        placeholder: this.placeholder,
        wrapped: true,
        value: this.value,
        hideSearchBox: !this.searchable,
        clearable: this.clearable,
        closeOnSelect: this.closeOnSelect,
        classes: this.classes,
        ...this.$attrs,
      },
      class: { 'ui-input-select': true, error: this.error },
      on: mergeListeners(this.$listeners, {
        input: (value: unknown) => void this.$emit('update', value ?? this.unselectedValue),
        'hook:mounted': () => void (this.autofocus && this.$refs.select?.searchEl?.focus?.()),
      }),
      ref: 'select',
      scopedSlots: this.$scopedSlots,
    })
  }

  private get classes(): JsonObject {
    return merge(TRichSelectClasses, {
      selectButton: 'ui-input-select--select-button',
    })
  }
}
</script>

<style lang="scss">
.ui-input-select {
  @apply rounded-default;

  &--select-button {
    @apply w-full h-12 px-3 py-3 text-black placeholder-gray-400 shadow-none transition duration-100 ease-in-out bg-white border border-gray-300 rounded-default focus:border-accent focus:ring-1 focus:ring-primary focus:outline-none focus:ring-opacity-30 disabled:shadow-none disabled:opacity-50 disabled:cursor-not-allowed;
  }

  &[error],
  &.error {
    button {
      @apply border-error focus:border-error focus:ring-error;
    }
  }
}
</style>
