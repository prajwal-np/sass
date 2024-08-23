export type ResponseType<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type Pagination<T> = {
  data: T;
} & BasePagination;

export type BasePagination = {
  page: number;
  limit: number;
  total: number;
};
