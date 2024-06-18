export type TCategoryHeader<T> = {
  name: string;
  accessor: string;
  render: (value: T) => React.ReactNode;
};
