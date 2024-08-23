function Product() {
  const prefix = "product";
  return {
    STATE: prefix,
    GET_PRODUCT: `${prefix}/get_product`,
    GET_PRODUCTS: `${prefix}/get_products`,
    ADD_PRODUCT: `${prefix}/add_product`,
    UPDATE_PRODUCT: `${prefix}/update_product`,
  };
}

const PRODUCT_CONSTANT = Product();
export default PRODUCT_CONSTANT;
