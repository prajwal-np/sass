import * as privateAPI from "../../../api/private";
import { Category, CategoryResponse } from "./type";

interface ICategory {
  getCategory(id: number): Promise<CategoryResponse>;
  addCategory(_payload: Category): Promise<CategoryResponse>;
  updateCategory(_payload: Category): Promise<CategoryResponse>;
  deleteCategory(id: number): any;
  getCategories(): Promise<CategoryResponse[]>;
}
export class CategoryService implements ICategory {
  async addCategory(_payload: Category): Promise<CategoryResponse> {
    try {
      const res = await privateAPI.api.post<CategoryResponse>(
        `http:localhost:3001/category`,
        _payload
      );
      return res.data;
    } catch (e) {
      throw e;
    }
  }
  async updateCategory(_payload: Category): Promise<CategoryResponse> {
    try {
      const res = await privateAPI.api.put<CategoryResponse>(
        `http:localhost:3001/category`,
        _payload
      );
      return res;
    } catch (e) {
      throw e;
    }
  }
  async deleteCategory(id: number) {
    try {
      const res = await privateAPI.api.delete<CategoryResponse>(
        `http:localhost:3001/category/${id}`
      );
      return res.data as CategoryResponse;
    } catch (e) {
      throw e;
    }
  }
  async getCategories(): Promise<CategoryResponse[]> {
    try {
      const res = await privateAPI.api.get<CategoryResponse[]>(
        `http:localhost:3001/category`
      );
      return res.data;
    } catch (e) {
      throw e;
    }
  }
  async getCategory(id: number) {
    try {
      const res = await privateAPI.api.get<CategoryResponse>(
        `http:localhost:3001/category/${id}`
      );
      return res.data as CategoryResponse;
    } catch (e) {
      throw e;
    }
  }
}
