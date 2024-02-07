<template lang="pug">
component(:is='arrayInput', ref='input', v-model='model', v-bind='$attrs')
  template(v-for='(slot, name) in $scopedSlots', #[name]='props')
    slot(:name='name', v-bind='props')
</template>

<script lang="ts">
import { isDef, isNull } from '@/util/lang'
import { RequiredProp } from '@/util/prop-decorators'
import { isArray } from 'lodash'
import { Component, Model, Vue } from 'vue-property-decorator'
import { Input } from '../model'

@Component
export default class InputArrayItem<T = unknown> extends Vue implements Input {
  @Model('update')
  private readonly value!: T | undefined | null

  @RequiredProp()
  public readonly arrayInput!: unknown

  public readonly $refs!: { input: Vue & Input }

  private inputRef?: Vue & Input

  public get model(): T[] {
    return isDef(this.value) && !isNull(this.value) ? [this.value] : []
  }

  public set model(value: T[]) {
    this.$emit('update', isArray(value) && value.length > 0 ? value[value.length - 1] : null)
  }

  public get normalizedValue(): T | null {
    const value = this.inputRef?.normalizedValue
    return isArray(value) && value.length > 0 ? value[0] : null
  }

  public get empty(): boolean {
    return this.inputRef?.empty ?? false
  }

  public get pristine(): boolean {
    return this.inputRef?.pristine ?? true
  }

  private mounted(): void {
    this.inputRef = this.$refs.input
  }

  private updated(): void {
    this.inputRef = this.$refs.input
  }
}
</script>
