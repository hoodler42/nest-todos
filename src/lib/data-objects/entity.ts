import { IsDate, IsString, IsUUID } from "class-validator";
import { ValueObject } from "./value-object.js";

export class InstantiateEntityProps<T> {
    @IsString()
    @IsUUID()
    id!: string;

    @IsDate()
    createdAt?: Date;

    @IsDate()
    updatedAt?: Date;

    props!: T;
}

export abstract class Entity<EntityProps> extends ValueObject<EntityProps> {
    public readonly id: string;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;

    constructor({ id, createdAt, updatedAt, props }: InstantiateEntityProps<EntityProps>) {
        super(props);
        this.id = id;
        const now = new Date();
        this.createdAt = createdAt || now;
        this.updatedAt = updatedAt || now;
        this.validateProps();
    }

    protected abstract validateEntityProps(): void

    protected validateProps() {
        // validate id and dates
        this.validateEntityProps();
    }
}
