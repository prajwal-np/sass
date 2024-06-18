export type BaseReducer = {
  loading: boolean;
  error: boolean;
  errorMessg: string;
};

export type StateReducer<T> = T & BaseReducer;
