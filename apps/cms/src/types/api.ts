export type ResponseType<T> = {
  success: boolean;
  message: string;
  data: T;
  meta: Pagination;
};

export type Pagination = {
  from?: number;
  to?: number;
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
};
