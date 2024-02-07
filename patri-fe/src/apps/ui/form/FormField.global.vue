<template lang="pug">
ui-input-field(:label='label', :description='description', :error='$attrs.error')
  template(v-for='name of fieldSlotNames', #[name]='props')
    slot(:name='name', v-bind='props')
  template(#default)
    component(
      ref='input',
      :is='input',
      v-model='value',
      v-bind='inputProps ? { ...$attrs, ...inputProps } : $attrs',
      v-on='$listeners'
    )
      template(v-for='(inputSlotName, name) of inputSlotNameMap', #[inputSlotName]='props')
        slot(:name='name', v-bind='props')
</template>

<script lang="ts">
import { StringProp, OptionalProp, ObjectProp } from '@/util/prop-decorators'
import { Component, Mixins, Vue } from 'vue-property-decorator'
import { Input } from '../inputs/model'
import FormComponent from './form-component'

@Component({
  data() {
    return { inputRef: undefined }
  },
  inheritAttrs: false,
})
export default class FormField extends Mixins(FormComponent) {
  @StringProp(true)
  private readonly input!: string

  @ObjectProp()
  private readonly inputProps?: Record<string, unknown>

  @StringProp()
  private readonly label?: string

  @StringProp()
  private readonly description?: string

  @OptionalProp(null)
  private readonly emptyValue?: unknown

  public readonly $refs!: { input: Vue & Input }

  private inputRef?: Vue & Input

  private get fieldSlotNames(): string[] {
    return Object.keys(this.$scopedSlots).filter((name) => !name.startsWith('input'))
  }

  private get inputSlotNameMap(): Record<string, string> {
    return Object.fromEntries(
      Object.keys(this.$scopedSlots)
        .filter((name) => name.startsWith('input'))
        .map((name) => [name, name[5].toLowerCase() + name.slice(6)]),
    )
  }

  private mounted(): void {
    this.inputRef = this.$refs.input
  }

  private updated(): void {
    this.inputRef = this.$refs.input
  }

  protected resolveValue(): unknown {
    return this.inputRef?.empty === false ? this.inputRef.normalizedValue : this.emptyValue
  }
}
</script>
