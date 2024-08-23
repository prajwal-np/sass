import { api } from "../../../../api/private";
import { TCurrentTable } from "../../../hooks/useHome";
import { TCategory, TOrder } from "./type";

export const getMenu = async () => {
  const res = await api.get<TCategory[]>("http://localhost:3001/category");
  return res.data;
};

export const placeOrder = async (orderPayload: TCurrentTable) => {
  const res = await api.post("http://localhost:3001/order/checkout", {
    ...orderPayload,
    tableId: orderPayload.table.id,
    guests: orderPayload.table.guests,
  });
  return res.data;
};

export const getOrders = async (type: string) => {
  const res = await api.get<TOrder[]>(`http://localhost:3001/order/${type}`);
  return res.data;
};

export const updateOrder = async (id: string) => {
  const res = await api.put(
    `http://localhost:3001/order/update_status/${id}`,
    {}
  );
  return res;
};
