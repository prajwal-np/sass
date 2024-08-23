import { Product } from "../menu/product/type";

export type OrderResponse = {
  id: number;
  product: Product[];
  total: number;
  subTotal: number;
  tax: number;
  paymentMethod: string;
};
