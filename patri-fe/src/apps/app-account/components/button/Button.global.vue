<template lang="pug">
button(v-bind='$attrs', v-on='$listeners')
  slot
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Button extends Vue {}
</script>
