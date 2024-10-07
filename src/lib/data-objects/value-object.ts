export abstract class ValueObject<ValueObjectProps> {
  protected readonly props: ValueObjectProps

  protected abstract validateProps(): void

  protected constructor(props: ValueObjectProps) {
    this.props = props
    this.validateProps()
  }
}
