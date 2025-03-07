import { Entity } from '../entities/entity';
import { RepositoryInterface } from './repository-contracts';
import { SearchProps, SortDirection } from './types';

export class SearchParams {
  protected _page?: number;
  protected _perPage?: number = 15;
  protected _sort?: string | null;
  protected _sortDir?: SortDirection | null;
  protected _filter?: string | null;
  constructor(props: SearchProps) {
    this._page = props.page;
    this._perPage = props.perPage;
    this._sort = props.sort;
    this._sortDir = props.sortDir;
    this._filter = props.filter;
  }

  get page(): number | undefined {
    return this._page;
  }

  get perPage(): number | undefined {
    return this._perPage;
  }

  get sort(): string | null | undefined {
    return this._sort;
  }

  get sortDir(): SortDirection | null | undefined {
    return this._sortDir;
  }

  get filter(): string | null | undefined {
    return this._filter;
  }

  private set page(value: number) {
    this._page = value;
  }

  private set perPage(value: number) {
    this._perPage = value;
  }

  private set sort(value: string | null) {
    this._sort = value;
  }

  private set sortDir(value: SortDirection | null) {
    this._sortDir = value;
  }

  private set filter(value: string | null) {
    this._filter = value;
  }
}

interface SearchableRepositoryInterface<
  E extends Entity<unknown>,
  SearchInput,
  SearchOutput,
> extends RepositoryInterface<E> {
  search(props: SearchParams): Promise<SearchOutput>;
}

export { SearchableRepositoryInterface };
