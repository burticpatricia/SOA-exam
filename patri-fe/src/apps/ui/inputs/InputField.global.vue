<template lang="pug">
.ui-input-field
  label.label.single-line(v-if='label !== undefined || $scopedSlots.label', :class='{ error }')
    slot(name='label')
      | {{ label }}
  slot
  ui-tooltip(v-if='errorContent', placement='bottom')
    template(#default)
      p.p.error.single-line
        template(v-if='errorMessages.length > 0')
          | {{ errorMessages[0] }}
        slot(v-else, :name='errorSlotNames[0]')
    template(#content)
      template(v-for='message of errorMessages')
        p.p.error
          | {{ message }}
      template(v-for='name of errorSlotNames')
        p.p.error
          slot(:name='name')
  ui-tooltip(v-else-if='description !== undefined', placement='bottom')
    template(#default)
      p.p.description.single-line
        | {{ description }}
    template(#content)
      p.p.description
        slot(name='description')
          | {{ description }}
</template>

<script lang="ts">
import { ArrayProp, StringProp, BooleanProp } from '@/util/prop-decorators'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class InputField extends Vue {
  @StringProp()
  private readonly label?: string

  @StringProp()
  private readonly description?: string

  @BooleanProp()
  private readonly error!: boolean

  @ArrayProp(() => [])
  private readonly errorMessages!: string[]

  private get errorSlotNames(): string[] {
    return Object.keys(this.$scopedSlots).filter((name) => name.startsWith('error'))
  }

  private get errorContent(): boolean {
    return this.errorMessages.length > 0 || this.errorSlotNames.length > 0
  }
}
</script>

<style lang="scss" scoped>
.label {
  @apply flex text-heading font-semibold mb-2;
}
.p {
  @apply m-0;
}
.error {
  @apply text-error;
}
.single-line {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
