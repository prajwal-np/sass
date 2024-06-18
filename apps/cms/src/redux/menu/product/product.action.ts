import { createThunk } from "../../store";
import PRODUCT_CONSTANT from "./product.constant";
import { ProductService } from "./product.service";
import { Product, ProductResponse } from "./type";

export const getProduct = createThunk<
  ProductResponse,
  {
    id: number;
  }
>(PRODUCT_CONSTANT.GET_PRODUCT, async (payload) => {
  const service = new ProductService();
  const res = await service.getProduct(payload.id);
  return res;
});

export const getProducts = createThunk<ProductResponse[]>(
  PRODUCT_CONSTANT.GET_PRODUCTS,
  async () => {
    const service = new ProductService();
    const res = await service.getProducts();
    return res;
  }
);

export const addProduct = createThunk<ProductResponse, Product>(
  PRODUCT_CONSTANT.ADD_PRODUCT,
  async (payload) => {
    const service = new ProductService();
    const res = await service.addProduct(payload);
    return res;
  }
);

export const updateProduct = createThunk<ProductResponse, Product>(
  PRODUCT_CONSTANT.UPDATE_PRODUCT,
  async (payload) => {
    const service = new ProductService();
    const res = await service.updateProduct(payload);
    return res;
  }
);
