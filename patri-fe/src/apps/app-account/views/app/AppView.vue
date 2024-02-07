<template lang="pug">
ui-layout(use='core-layout-default', #default)
  .view
    h4
      | App Account
    br
    input.input(v-model='eventId')
    br
    app-account-button.button(@click='sendEvent', :disabled='eventId === "" || eventId === undefined')
      | Send Events
    router-link.button(:to='{ name: "AppHome" }')
      | Go To App Home
</template>

<script lang="ts">
import ApiMixin from '@/apps/core/components/mixins/api.mixin'
import { Component } from 'vue-property-decorator'

@Component({
  data() {
    return {
      eventId: undefined,
      eventSource: undefined,
    }
  },
})
export default class AppView extends ApiMixin {
  public eventId!: string
  public eventSource!: EventSource

  public async sendEvent(): Promise<void> {
    const { data } = await this.api.appControllerSendEvent({ sendEventArgs: { eventId: this.eventId } })

    window.alert(`event with id: ${data.id} has been sent`)
  }

  public mounted(): void {
    this.eventSource = new EventSource('http://localhost:3000/sse')

    this.eventSource.onmessage = (event) => {
      if (event.data) {
        window.alert(`Received event: ${event.data}`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.view {
  @apply flex flex-col items-center gap-3 px-2 py-2 bg-green-400 rounded text-white;

  h4 {
    @apply text-3xl;
  }

  .button {
    @apply bg-white rounded text-black px-2 py-1;
  }
}

.input {
  border: 1px solid black;
  @apply text-black;
}

.button {
  &[disabled] {
    cursor: not-allowed;
  }
}
</style>
