interface PaginationMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

class PaginatedDto<TData> {
  data?: TData[];
  meta: PaginationMeta;
}

export { PaginationMeta, PaginatedDto };
