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
    let _page = +value;
    if (Number.isNaN(_page) || _page <= 0 || parseInt(_page as any) !== _page) {
      _page = 1;
    }
    this._page = _page;
  }

  private set perPage(value: number) {
    let _perPage = +value;

    if (
      Number.isNaN(_perPage) ||
      _perPage <= 0 ||
      parseInt(_perPage as any) !== _perPage
    ) {
      _perPage = this._perPage!;
    }
    this._perPage = _perPage;
  }

  private set sort(value: string | null) {
    if (!value) {
      this._sort = null;
      return;
    }
    this._sort = value;
  }

  private set sortDir(value: SortDirection | null) {
    if (!this.sort) {
      this._sortDir = null;
      return;
    }

    const dir = value?.toLocaleLowerCase();
    if (dir !== SortDirection.ASC && dir !== SortDirection.DESC) {
      this._sortDir = SortDirection.DESC;
      return;
    }

    this._sortDir = dir as SortDirection;
  }

  private set filter(value: string | null) {
    if (!value) {
      this._sort = null;
      return;
    }
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
