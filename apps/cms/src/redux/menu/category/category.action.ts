import { createThunk } from "../../store";
import CATEGORY_CONSTANT from "./category.constant";
import { CategoryService } from "./category.service";
import { TCategory, CategoryResponse } from "./type";

export const getCategory = createThunk<
  TCategory,
  {
    id: number;
  }
>(CATEGORY_CONSTANT.GET_CATEGORY, async (payload) => {
  const service = new CategoryService();
  const res = await service.getCategory(payload.id);
  return res;
});

export const getCategories = createThunk<TCategory[]>(
  CATEGORY_CONSTANT.GET_CATEGORIES,
  async () => {
    const service = new CategoryService();
    const res = await service.getCategories();
    return res;
  }
);

export const addCategory = createThunk<CategoryResponse, TCategory>(
  CATEGORY_CONSTANT.ADD_CATEGORY,
  async (payload) => {
    const service = new CategoryService();
    const res = await service.addCategory(payload);
    return res;
  }
);

export const updateCategory = createThunk<TCategory, CategoryResponse>(
  CATEGORY_CONSTANT.UPDATE_CATEGORY,
  async (payload) => {
    const service = new CategoryService();
    const res = await service.updateCategory(payload);
    return res;
  }
);
