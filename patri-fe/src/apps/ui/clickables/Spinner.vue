<template lang="pug">
ui-icon.spinner(icon='rotate-refresh-loading')
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { BooleanProp } from '@/util/prop-decorators'

@Component
export default class Spinner extends Vue {
  @BooleanProp()
  private readonly dark?: boolean
}
</script>

<style lang="scss" scoped>
@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}
.spinner {
  animation: spinner 1s linear infinite;
  @include svgColor(#fff);
}

.spinner.dark {
  @include svgColor(#000);
}
</style>
