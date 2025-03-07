enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

type SearchProps<Filter = string> = {
  page?: number;
  perPage?: number;
  sort?: string | null;
  sortDir?: SortDirection | null;
  filter?: Filter | null;
};

export { SortDirection };

export type { SearchProps };
