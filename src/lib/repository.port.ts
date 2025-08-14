export class Paginated<T> {
  readonly count: number;
  readonly limit: number;
  readonly page: number;
  readonly data: readonly T[];

  constructor(props: Paginated<T>) {
    this.count = props.count;
    this.limit = props.limit;
    this.page = props.page;
    this.data = props.data;
  }
}

export type OrderBy = {
  field: string;
  param: "asc" | "desc";
};

export type PaginatedQueryParams = {
  limit: number;
  page: number;
  offset: number;
  orderBy: OrderBy;
};

export abstract class RepositoryPort<Entity> {
  public abstract insertOne(entity: Entity): Promise<void>;

  public abstract findAll(): Promise<Entity[]>;
}
