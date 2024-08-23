import { TOrder } from "../../Menu/api/type";

export type TTablesCategroy = {
  created_at: string;
  id: string;
  name: string;
  tables: TTables[];
};

export type TTables = {
  capacity: number;
  id: string;
  name: string;
  orders: TOrder[];
  remark: string;
  type: string;
  guests?: number;
};
