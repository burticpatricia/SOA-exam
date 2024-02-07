<template lang="pug">
input.ui-input-text(
  v-bind='$attrs',
  v-on='$listeners',
  v-model='model',
  :class='{ error }',
  :type='inputType',
  :placeholder='placeholder',
  @focus='pristine = false'
)
</template>

<script lang="ts">
import { BooleanProp, StringProp } from '@/util/prop-decorators'
import { Component, Model, Vue } from 'vue-property-decorator'
import { Input, InputTextType } from './model'

@Component
export default class InputText extends Vue implements Input {
  @Model('update')
  private readonly value!: unknown

  @BooleanProp()
  private readonly error!: boolean

  @BooleanProp()
  private readonly password!: boolean

  @BooleanProp()
  private readonly noTrim!: boolean

  @StringProp()
  private readonly placeholder?: string

  @StringProp()
  private readonly type?: string

  public pristine = true

  private get model(): string {
    return this.value === undefined || this.value === null ? '' : String(this.value)
  }

  private set model(value: string) {
    this.$emit('update', value)
  }

  public get normalizedValue(): string {
    return this.noTrim || this.password ? this.model : this.model.trim()
  }

  public get empty(): boolean {
    return this.normalizedValue === ''
  }

  private get inputType(): string | InputTextType {
    if (this.type) {
      return this.type
    }
    if (this.password) {
      return InputTextType.PASSWORD
    }
    return InputTextType.TEXT
  }
}
</script>

<style lang="scss" scoped>
.ui-input-text {
  @apply w-full h-12 px-3 py-3 text-black bg-white border border-gray-300 rounded-default placeholder-gray-400 transition duration-100 ease-in-out;
  @apply focus:border-accent focus:ring-1 focus:ring-primary focus:outline-none focus:ring-opacity-30;
  @apply disabled:shadow-none disabled:opacity-50 disabled:cursor-not-allowed;

  &.error {
    @apply border-error focus:border-error focus:ring-error;
  }
}
</style>
