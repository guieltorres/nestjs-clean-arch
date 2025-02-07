import { v4 as uuid } from 'uuid';

export abstract class Entity<Props> {
  private readonly _id: string;
  protected readonly props: Props;

  constructor(props: Props, id?: string) {
    this.props = props;
    this._id = id || uuid();
  }

  get id() {
    return this._id;
  }

  toJson(): Required<{ id: string } & Props> {
    return {
      id: this._id,
      ...this.props,
    } as Required<{ id: string } & Props>;
  }
}
