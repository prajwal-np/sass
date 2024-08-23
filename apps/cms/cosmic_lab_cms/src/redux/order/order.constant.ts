function Order() {
  const prefix = "order";
  return {
    STATE: prefix,
    GET_ORDER: `${prefix}/get_order`,
    GET_ORDERS: `${prefix}/get_orders`,
    UPDATE_ORDER: `${prefix}/update_order`,
  };
}

const ORDER_CONSTANT = Order();
export default ORDER_CONSTANT;
