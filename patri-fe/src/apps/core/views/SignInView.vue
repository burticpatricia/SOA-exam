<template lang="pug">
ui-layout(use='core-layout-auth', #default)
  .sign-in-view(data-router-view)
    .panel
      .subtitle
        span
          | Sign in
      ui-form.form(
        :action='signIn',
        #default='{ formData, isPathDirty, dirty, busy, submit }',
        @submitted='onSubmitted($event.result)',
        no-reset
      )
        ui-form-field.form-field(
          input='ui-input-text',
          name='email',
          path='emailAddress',
          label='Email address',
          placeholder='Email',
          :error='isPathDirty("emailAddress") && formData.emailAddress === undefined'
        )
        ui-form-field.form-field(
          input='ui-input-text',
          name='password',
          path='password',
          label='Password',
          type='password',
          placeholder='Password',
          :error='isPathDirty("password") && formData.password === undefined'
        )
        ui-button.submit-button(:disabled='!dirty || !isValidData(formData)', :busy='busy', @click='submit')
          | Sign in
</template>

<script lang="ts">
import { Configuration, DefaultApi } from '@/__generated__/api'
import { JWT_COOKIE_NAME } from '@/auth'
import { Component } from 'vue-property-decorator'
import ContainerMixin from '../components/mixins/container.mixin'
import { API, API_CONFIGURATION } from '../container'

type FormData = { emailAddress: string; password: string }

@Component
export default class SignInView extends ContainerMixin {
  private get api(): DefaultApi {
    return this.container(API)
  }

  private get apiConfiguration(): Configuration {
    return this.container(API_CONFIGURATION)
  }

  private isValidData(data: FormData): boolean {
    return data.emailAddress !== undefined && data.password !== undefined
  }

  private async signIn({ emailAddress, password }: FormData): Promise<string> {
    const { data } = await this.api.appControllerLogin({ loginBody: { email: emailAddress, password } })

    return data
  }

  private async onSubmitted(jwtToken: string): Promise<void> {
    this.$cookies.set(JWT_COOKIE_NAME, jwtToken)
    this.apiConfiguration.accessToken = jwtToken

    this.$router.push({ name: 'AppHome' })
  }
}
</script>

<style lang="scss" scoped>
.sign-in-view {
  @apply flex flex-col gap-4 min-h-full items-center justify-center;

  .logo {
    @apply h-12;
  }

  .panel {
    .subtitle {
      @apply flex justify-center text-heading text-3xl font-semibold;
    }

    .form {
      @apply z-[100] min-w-[80vw] sm:min-w-[460px] py-8;
    }
  }
}
</style>
