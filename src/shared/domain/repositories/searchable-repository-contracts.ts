import { Entity } from '../entities/entity';
import { RepositoryInterface } from './repository-contracts';

interface SearchableRepositoryInterface<
  E extends Entity<unknown>,
  SearchInput,
  SearchOutput,
> extends RepositoryInterface<E> {
  search(props: SearchInput): Promise<SearchOutput>;
}

export { SearchableRepositoryInterface };
