<template lang="pug">
form.ui-form
  slot(v-bind='{ formData, dirty, isPathDirty, busy, submit, actionError, errorMessages, reset }')
</template>

<script lang="ts">
import { isApiError } from '@/apps/core/container/util/is-api-error'
import Busyable, { Busy } from '@/apps/ui/mixins/busyable'
import { isArray, isRecord, isString } from '@/util/lang'
import { BooleanProp, FunctionProp, ObjectProp } from '@/util/prop-decorators'
import { Component, Mixins } from 'vue-property-decorator'
import FormContext from './form-context'
import type { FormAction, FormDataRecord } from './model'

@Component({
  data() {
    return { actionError: undefined }
  },
})
export default class Form extends Mixins(Busyable, FormContext) {
  @ObjectProp()
  private readonly initialData?: FormDataRecord

  @FunctionProp()
  private readonly action?: FormAction

  @BooleanProp()
  private readonly noReset!: boolean

  private actionError?: unknown

  private get errorMessages(): string[] {
    const messages: string[] = []

    if (isApiError(this.actionError)) {
      const { response } = this.actionError
      const responseData = response?.data

      if (isRecord(responseData)) {
        if (isArray(responseData.message)) {
          messages.push(...responseData.message)
        }
        if (isString(responseData.message)) {
          messages.push(responseData.message)
        }
      }
    } else if (isString(this.actionError)) {
      messages.push(this.actionError)
    } else if (this.actionError instanceof Error && this.actionError.message.length > 0) {
      messages.push(this.actionError.message)
    }

    return messages
  }

  protected getInitialData(): FormDataRecord | undefined {
    return this.initialData
  }

  @Busy()
  private async submit(param?: unknown): Promise<void> {
    const data = this.collect()

    this.actionError = undefined
    let result = undefined

    if (this.action) {
      try {
        result = await this.action(data, param)
        this.$emit('submitted', { data, result })
      } catch (e) {
        console.error(e)

        this.actionError = e
        this.$emit('error', this.errorMessages)
        return
      }
    }

    if (!this.noReset) {
      this.reset()
    }
  }
}
</script>

<style lang="scss" scoped>
.ui-form {
  @apply flex flex-col gap-5;
}
</style>
