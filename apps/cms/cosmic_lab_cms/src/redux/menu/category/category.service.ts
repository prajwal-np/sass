import * as privateAPI from "../../../api/private";
import { TCategory, CategoryResponse } from "./type";

interface ICategory {
  getCategory(id: number): Promise<CategoryResponse>;
  addCategory(_payload: TCategory): Promise<CategoryResponse>;
  updateCategory(_payload: TCategory): Promise<CategoryResponse>;
  deleteCategory(id: number): any;
  getCategories(): Promise<CategoryResponse[]>;
}
export class CategoryService implements ICategory {
  async addCategory(_payload: TCategory): Promise<CategoryResponse> {
    try {
      const res = await privateAPI.api.post<CategoryResponse>(
        `${process.env.REACT_APP_API_BASE_URL}/category`,
        _payload
      );
      return res.data;
    } catch (e) {
      throw e;
    }
  }
  async updateCategory(_payload: TCategory): Promise<CategoryResponse> {
    try {
      const res = await privateAPI.api.put<CategoryResponse>(
        `${process.env.REACT_APP_API_BASE_URL}/category`,
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
        `${process.env.REACT_APP_API_BASE_URL}/category/${id}`
      );
      return res.data as CategoryResponse;
    } catch (e) {
      throw e;
    }
  }
  async getCategories(): Promise<CategoryResponse[]> {
    try {
      const res = await privateAPI.api.get<CategoryResponse[]>(
        `${process.env.REACT_APP_API_BASE_URL}/category`
      );
      return res.data;
    } catch (e) {
      throw e;
    }
  }
  async getCategory(id: number) {
    try {
      const res = await privateAPI.api.get<CategoryResponse>(
        `${process.env.REACT_APP_API_BASE_URL}/category/${id}`
      );
      return res.data as CategoryResponse;
    } catch (e) {
      throw e;
    }
  }
}
