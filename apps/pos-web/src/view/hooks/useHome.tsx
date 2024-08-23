import { useState } from "react";
import { TProduct, TOrder, TCartItem } from "../home/Menu/api/type";
import { useMutation, useQuery } from "react-query";
import { placeOrder } from "../home/Menu/api/api";
import { getTables } from "../home/TableManagment/api/api";
import { TTables } from "../home/TableManagment/api/type";

export type TCurrentTable = {
  table: TTables;
  order?: Partial<TOrder | TOrder[]>;
  status?: "";
};
export default function useHome() {
  const [table, setTable] = useState<TCurrentTable>();
  const placeOrderApi = useMutation({
    mutationFn: placeOrder,
  });
  const { data: tablesCategory } = useQuery(["tables"], getTables);

  const addToCart = (product: TCartItem) => {
    const cart: TOrder = { ...table?.order } as TOrder;
    if (!cart || !table) return;

    const productCartIndex: number = (cart.products || [])?.findIndex(
      (el) => el.id === product.id
    );

    let total = cart?.totalAmount || 0;
    total += product.price;
    let products = [];
    if (cart.products?.length && productCartIndex >= 0) {
      products = [...cart.products];
      const cartProduct = cart.products[productCartIndex];
      total = total - cartProduct.price;
      products[productCartIndex] = product;
    } else {
      products = (cart?.products || [])?.concat([product]);
    }
    cart.totalAmount = total;
    cart.subTotal = 0;
    cart.tax = 0;
    const tempTable: TCurrentTable = {
      ...table,
      order: {
        ...cart,
        products,
        paymentMethod: "cash",
        remark: "some remark",
      },
    };
    setTable(tempTable);
  };

  const checkoutOrder = () => {
    table && placeOrderApi.mutate(table);
  };
  return {
    currentTable: table,
    setCurrentTable: setTable,
    addToCart,
    checkoutOrder,
    tablesCategory,
  };
}
