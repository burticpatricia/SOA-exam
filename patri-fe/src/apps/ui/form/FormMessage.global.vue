<template lang="pug">
.form-message(:class='{ error, warning, success, info }')
  ui-icon.icon(v-if='icon', :icon='icon')
  .messages
    .headline(v-if='headline')
      | {{ headline }}
    slot(v-bind='{ messages: normalizedMessages }')
      template(v-for='(message, index) in normalizedMessages')
        br(v-if='index > 0')
        | {{ message }}
</template>

<script lang="ts">
import { StringProp, ArrayProp, BooleanProp } from '@/util/prop-decorators'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class FormMessage extends Vue {
  @StringProp()
  private readonly headline?: string

  @StringProp()
  private readonly message?: string

  @ArrayProp(() => [])
  private readonly messages!: string[]

  @BooleanProp()
  private readonly error!: boolean

  @BooleanProp()
  private readonly warning!: boolean

  @BooleanProp()
  private readonly success!: boolean

  @BooleanProp()
  private readonly info!: boolean

  private get normalizedMessages(): string[] {
    return this.message === undefined ? this.messages : [this.message, ...this.messages]
  }

  private get icon(): string {
    return this.error ? 'warning-hexagon' : this.warning ? 'warning' : this.success ? 'checkmark' : 'info'
  }
}
</script>

<style lang="scss" scoped>
.form-message {
  @apply flex flex-col items-center relative text-lg text-heading px-4 py-3 min-w-min bg-white font-medium border-1 rounded-default border-heading;

  .messages {
    @apply w-full;

    .headline {
      @apply text-xl mb-2;
    }
  }

  &.success {
    @apply border-success;

    .icon {
      @include svgColor(#48c404);
    }
  }

  &.info {
    @apply border-info;
    .icon {
      @include svgColor(#625afa);
    }
  }

  .warning {
    @apply border-warning;

    .icon {
      @include svgColor(#ff8f0e);
    }
  }

  &.error {
    @apply border-error;

    .icon {
      @include svgColor(#e60000);
    }
  }
}
</style>
