export type TProduct = {
  created_at: string;
  id: number;
  image: string;
  name: string;
  price: number;
  quantity?: number;
  updated_at: string;
};

export type TCategory = {
  id: string;
  name: string;
  products: TProduct[];
};

export type TCartItem = TProduct & { quantity: number; note: string };
export type TCart = {
  total: number;
  subTotal: number;
  tax: number;
  products: TCartItem[];
};

export type TOrderRequest = {
  status: string;
  products: number[];
  totalAmount: number;
  subTotal: number;
  tax: number;
  paymentMethod: string;
  remark: string;
};

export type TOrder = {
  id: string;
  status: string;
  products: TCartItem[];
  totalAmount: number;
  subTotal: number;
  tax: number;
  paymentMethod: string;
  remark: string;
};
