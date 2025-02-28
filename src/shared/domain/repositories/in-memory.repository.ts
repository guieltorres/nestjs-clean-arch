import { Entity } from '../entities/entity';
import { NotFoundError } from '../errors/not-found-error';
import { RepositoryInterface } from './repository-contracts';

abstract class InMemoryRepository<E extends Entity<unknown>>
  implements RepositoryInterface<E>
{
  protected items: E[] = [];

  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }

  async findById(id: string): Promise<E> {
    return this._get(id);
  }

  async findAll(): Promise<E[]> {
    return this.items;
  }

  async update(entity: E): Promise<void> {
    const index = this._getIndex(entity.id);
    this.items[index] = entity;
  }

  async delete(id: string): Promise<void> {
    const index = this._getIndex(id);
    this.items.splice(index, 1);
  }

  protected async _get(id: string): Promise<E> {
    const _id = `${id}`;
    const entity = this.items.find((item) => item.id === _id);
    if (!entity) {
      throw new NotFoundError('Entity not found');
    }
    return entity;
  }

  protected _getIndex(id: string): number {
    const _id = `${id}`;
    const index = this.items.findIndex((item) => item.id === _id);
    if (index === -1) {
      throw new NotFoundError('Entity not found');
    }
    return index;
  }
}

export { InMemoryRepository };
