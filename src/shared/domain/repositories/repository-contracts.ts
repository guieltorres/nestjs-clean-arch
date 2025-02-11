import { Entity } from '../entities/entity';

interface RepositoryInterface<E extends Entity<unknown>> {
  insert(entity: E): Promise<void>;
  findById(id: string): Promise<E>;
  findAll(): Promise<E[]>;
  update(entity: E): Promise<void>;
  delete(id: string): Promise<void>;
}

export { RepositoryInterface };
