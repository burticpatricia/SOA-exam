<template lang="pug">
ui-clickable.ui-link(v-bind='$attrs', v-on='$listeners', #default='props')
  slot(v-bind='props')
</template>

<script lang="ts">
import { BooleanProp, StringProp } from '@/util/prop-decorators'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Link extends Vue {
  @StringProp()
  private readonly icon?: string

  @BooleanProp()
  private readonly iconBefore!: boolean
}
</script>

<style lang="scss" scoped>
.ui-link {
  @apply underline hover:text-primary;
}
</style>
