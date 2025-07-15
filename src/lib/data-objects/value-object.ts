export abstract class ValueObject<ValueObjectProps> {
    protected readonly props: ValueObjectProps

    protected constructor(props: ValueObjectProps) {
        this.props = props
        this.validateProps()
    }

    protected abstract validateProps(): void
}
