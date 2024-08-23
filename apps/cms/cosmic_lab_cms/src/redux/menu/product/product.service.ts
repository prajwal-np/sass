import * as privateAPI from "../../../api/private";
import { Product, ProductResponse } from "./type";

interface IProduct {
  getProduct(id: number): Promise<ProductResponse>;
  addProduct(_payload: Product): Promise<ProductResponse>;
  updateProduct(_payload: Product): Promise<ProductResponse>;
  deleteProduct(id: number): any;
  getProducts(): Promise<ProductResponse[]>;
}
export class ProductService implements IProduct {
  async addProduct(_payload: Product): Promise<ProductResponse> {
    try {
      const res = await privateAPI.api.post<ProductResponse>(
        `${process.env.REACT_APP_API_BASE_URL}/product`,
        _payload
      );
      return res.data;
    } catch (e) {
      throw e;
    }
  }
  async updateProduct(_payload: Product): Promise<ProductResponse> {
    try {
      const res = await privateAPI.api.put<ProductResponse>(
        `${process.env.REACT_APP_API_BASE_URL}/product`,
        _payload
      );
      return res;
    } catch (e) {
      throw e;
    }
  }
  async deleteProduct(id: number) {
    try {
      const res = await privateAPI.api.delete<ProductResponse>(
        `${process.env.REACT_APP_API_BASE_URL}/product/${id}`
      );
      return res.data as ProductResponse;
    } catch (e) {
      throw e;
    }
  }
  async getProducts(): Promise<ProductResponse[]> {
    try {
      const res = await privateAPI.api.get<ProductResponse[]>(
        `${process.env.REACT_APP_API_BASE_URL}/product`
      );
      return res.data;
    } catch (e) {
      throw e;
    }
  }
  async getProduct(id: number) {
    try {
      const res = await privateAPI.api.get<ProductResponse>(
        `${process.env.REACT_APP_API_BASE_URL}/product/${id}`
      );
      return res.data as ProductResponse;
    } catch (e) {
      throw e;
    }
  }
}
