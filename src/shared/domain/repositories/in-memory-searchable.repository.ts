import { Entity } from '../entities/entity';
import { InMemoryRepository } from './in-memory.repository';
import { SearchableRepositoryInterface } from './searchable-repository-contracts';

abstract class InMemorySearchableRepository<E extends Entity<unknown>>
  extends InMemoryRepository<E>
  implements SearchableRepositoryInterface<E, any, any>
{
  search(props: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
}

export { InMemorySearchableRepository };
