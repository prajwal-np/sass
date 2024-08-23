import ORDER_CONSTANT from "./order.constant";
import { OrderService } from "./order.service";
import { OrderResponse } from "./type";
import { createThunk } from "../store";

export const getOrder = createThunk<
  OrderResponse,
  {
    id: number;
  }
>(ORDER_CONSTANT.GET_ORDER, async (payload) => {
  const service = new OrderService();
  const res = await service.getOrder(payload.id);
  return res;
});

export const getOrders = createThunk<OrderResponse[]>(
  ORDER_CONSTANT.GET_ORDERS,
  async () => {
    const service = new OrderService();
    const res = await service.getOrders();
    return res;
  }
);

export const updateOrder = createThunk<OrderResponse, { id: number }>(
  ORDER_CONSTANT.UPDATE_ORDER,
  async (payload) => {
    const service = new OrderService();
    const res = await service.updateOrder(payload.id);
    return res;
  }
);
