import * as privateAPI from "../../api/private";
import { OrderResponse } from "./type";

interface IOrder {
  getOrder(id: number): Promise<OrderResponse>;
  updateOrder(id: number): Promise<OrderResponse>;
  getOrders(): Promise<OrderResponse[]>;
}
export class OrderService implements IOrder {
  async updateOrder(id: number): Promise<OrderResponse> {
    try {
      const res = await privateAPI.api.get<OrderResponse>(
        `${process.env.REACT_APP_API_BASE_URL}/order/${id}`
      );
      return res.data;
    } catch (e) {
      throw e;
    }
  }

  async getOrders(): Promise<OrderResponse[]> {
    try {
      const res = await privateAPI.api.get<OrderResponse[]>(
        `${process.env.REACT_APP_API_BASE_URL}/order`
      );
      return res.data;
    } catch (e) {
      throw e;
    }
  }
  async getOrder(id: number) {
    try {
      const res = await privateAPI.api.get<OrderResponse>(
        `${process.env.REACT_APP_API_BASE_URL}/order/${id}`
      );
      return res.data as OrderResponse;
    } catch (e) {
      throw e;
    }
  }
}
