<template lang="pug">
ui-layout(use='core-layout-default', #default)
  .view
    h4
      | App Home
    router-link.button(:to='{ name: "AppAccount" }')
      | Go To App Accounts
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AppView extends Vue {}
</script>

<style lang="scss" scoped>
.view {
  @apply flex flex-col items-center gap-3 px-2 py-2 bg-purple-400 rounded text-white;

  h4 {
    @apply text-3xl;
  }

  .button {
    @apply bg-white rounded text-black px-2 py-1;
  }
}
</style>
