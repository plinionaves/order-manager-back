export interface OffsetPaginationInput {
  page: number;
  pageSize: number;
}

export interface OffsetPaginationOutput<T> {
  data: T[];
  meta: {
    total: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
