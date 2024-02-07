import { isString } from '@/util/lang'
import { OptionalProp, StringProp } from '@/util/prop-decorators'
import { cloneDeep, get, isEqual, set } from 'lodash'
import { Component, Inject, Vue } from 'vue-property-decorator'
import FormContext, { FORM_CONTEXT } from './form-context'
import { FormDataRecord, Transformer } from './model'

function formContextMissing(): never {
  throw new Error('FORM_CONTEXT missing')
}

function transform(transformer: string | Transformer | undefined, value: unknown): unknown {
  if (transformer === undefined) {
    return value
  }

  if (isString(transformer)) {
    return get(value, transformer)
  }

  return transformer(value)
}

@Component({
  data() {
    return { valueHolder: undefined }
  },
  mounted(this: FormComponent): void {
    setTimeout(() => this.formContext.registerFormComponent(this), 0)
  },
  beforeDestroy(this: FormComponent): void {
    this.formContext.unregisterFormComponent(this)
  },
})
export default class FormComponent extends Vue {
  @StringProp()
  public readonly path?: string

  @StringProp()
  private readonly initialPath?: string

  @OptionalProp()
  private readonly transformer?: string | Transformer

  @OptionalProp()
  private readonly initialTransformer?: string | Transformer

  @OptionalProp()
  private readonly defaultValue?: unknown

  private valueHolder?: { value: unknown }

  @Inject({ from: FORM_CONTEXT, default: formContextMissing })
  private readonly formContext!: FormContext

  public get dirty(): boolean {
    return this.valueHolder ? !isEqual(this.valueHolder.value, this.modelValue) : false
  }

  private get modelValue(): unknown {
    return transform(
      this.initialTransformer,
      this.formContext.resolveInitialValue(this.initialPath ?? this.path, this.defaultValue),
    )
  }

  public get value(): unknown {
    return this.valueHolder ? this.valueHolder.value : this.modelValue
  }

  public set value(value: unknown) {
    this.valueHolder = { value }
  }

  public reset(): void {
    this.valueHolder = undefined
  }

  public populate(data: FormDataRecord): FormDataRecord {
    if (this.path !== undefined) {
      const transformedValue = transform(this.transformer, this.resolveValue())
      // files can't be copied with cloneDeep
      if (transformedValue instanceof File) {
        set(data, this.path, new File([transformedValue], transformedValue.name, { type: transformedValue.type }))
      } else {
        set(data, this.path, cloneDeep(transformedValue))
      }
    }

    return data
  }

  protected resolveValue(): unknown {
    return this.value
  }
}
