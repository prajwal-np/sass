export type TProduct = {
  created_at: string;
  id: number;
  image: string;
  name: string;
  price: number;
  updated_at: string;
};

export type TCategory = {
  id: number;
  name: string;
  products: TProduct[];
};

export type TCartItem = TProduct & { quantity: number };
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
  id: number;
  status: string;
  products: TProduct[];
  totalAmount: number;
  subTotal: number;
  tax: number;
  paymentMethod: string;
  remark: string;
};
