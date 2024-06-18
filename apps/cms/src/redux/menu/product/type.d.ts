import { CategoryResponse } from "../category/type";

export type ProductResponse = {
  id: number;
  name: string;
  price: string;
  category: CategoryResponse;
  image: string;
  createAt: string;
};

export type Product = {
  name: string;
  price: number;
  category: number;
  image: string;
  createAt?: string;
};
