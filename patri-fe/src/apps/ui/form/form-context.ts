import { get, isEqual } from 'lodash'
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import FormComponent from './form-component'
import type { FormDataRecord } from './model'

export const FORM_CONTEXT = Symbol('FORM_CONTEXT')

@Component({
  data() {
    return { formComponents: [] }
  },
  provide(this: FormComponent) {
    return { [FORM_CONTEXT]: this }
  },
})
export default class FormContext extends Vue {
  private formComponents!: FormComponent[]

  // not reactive on purpose
  private previousFormData?: FormDataRecord

  protected get formData(): FormDataRecord {
    const formData = this.collect()

    return this.previousFormData === undefined || !isEqual(formData, this.previousFormData)
      ? formData
      : this.previousFormData
  }

  protected get dirty(): boolean {
    return this.formComponents.some(({ dirty }) => dirty)
  }

  protected isPathDirty(path: string): boolean {
    return this.formComponents.find((value) => value.path === path)?.dirty ?? false
  }

  public resolveInitialValue(path?: string, defaultValue?: unknown): unknown {
    const initialData = this.getInitialData()

    return initialData === undefined || path === undefined ? defaultValue : get(initialData, path, defaultValue)
  }

  public registerFormComponent(component: FormComponent): void {
    if (!this.formComponents.includes(component)) {
      this.formComponents.push(component)
    }
  }

  public unregisterFormComponent(component: FormComponent): void {
    this.formComponents = this.formComponents.filter((registeredComponent) => registeredComponent !== component)
  }

  protected getInitialData(): FormDataRecord | undefined {
    return undefined
  }

  protected reset(): void {
    this.formComponents.forEach((component) => component.reset())
  }

  protected collect(): FormDataRecord {
    return this.formComponents.reduce((data, component) => component.populate(data), {})
  }
}
