import { api } from "../../../../api/private";
import { TTablesCategroy } from "./type";

export const getTables = async () => {
  const res = await api.get<TTablesCategroy[]>(
    "http://localhost:3001/table-mang/all"
  );
  return res.data;
};
