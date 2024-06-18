import { useMutation, useQuery } from "react-query";
import { getMenu, placeOrder } from "./api/api";
import Category from "./component/category";
import Product from "./component/product";
import { useEffect, useState } from "react";
import { TCart, TCartItem, TOrderRequest, TProduct } from "./api/type";
import CartProduct from "./component/cart";
import clsx from "clsx";
import Typography from "../../../@ui/typography";
import Modal from "../../../@ui/modal";
import RadioButton from "../../../@ui/radioButton";

export default function Menu() {
  const { data } = useQuery(["menu"], getMenu);
  const [products, setProducts] = useState<TProduct[]>([]);
  const [checkout, setCheckout] = useState(false);
  const [remark, setRemark] = useState<string>("");
  const placeOrderApi = useMutation({
    mutationFn: placeOrder,
  });
  const methods = [
    {
      label: "Cash",
      value: "cash",
    },
    {
      label: "Online",
      value: "online",
    },
  ];
  const [paymentMethod, setPaymentMethod] = useState<string>();
  const [cart, setCart] = useState<TCart>({
    total: 0,
    subTotal: 0,
    tax: 0,
    products: [],
  });
  useEffect(() => {
    if (data?.length) {
      setProducts(data[0].products);
      // fetch("http://localhost:3001/report").then(async (res) => {
      //   const el = document.createElement("a");
      //   let blobFile = await res.blob();
      //   el.href = window.URL.createObjectURL(blobFile);
      //   el.download = `filename.xlsx`;
      //   el.click();
      // });
    }
  }, [data]);
  const addToCart = (product: TCartItem) => {
    let total = cart?.total;
    total += product.price;
    const products = cart.products.concat([product]);
    setCart((prev) => ({ ...prev, total, products }));
  };
  const palceOrderEvent = () => {
    const orderPayload: TOrderRequest = {
      ...cart,
      products: cart.products.map((el) => el.id),
      paymentMethod: paymentMethod || "cash",
      remark,
      status: "incoming",
      totalAmount: cart.total,
    };
    placeOrderApi.mutate(orderPayload);
    setCheckout(false);
  };
  return (
    <div className="grid grid-cols-12 gap-3 h-full">
      <div
        className={clsx(
          "flex flex-col bg-white",
          cart.products.length ? "col-span-8" : "col-span-12"
        )}
      >
        <div className="flex gap-3 overflow-auto border-b-2 my-2">
          {data?.map((el) => (
            <Category
              setProduct={(product) => {
                setProducts(product);
              }}
              item={el}
            />
          ))}
        </div>
        <div
          className={clsx([
            cart.products.length ? "col-span-8" : "col-span-10",
          ])}
        >
          <div className="flex flex-col">
            {products?.map((el, i) => (
              <Product key={el.id} index={i} item={el} addToCart={addToCart} />
            ))}
          </div>
        </div>
      </div>
      {cart.products.length ? (
        <div className="col-span-4 bg-white">
          <div className="flex-col h-full flex px-2 py-2">
            <div className="h-[80vh] overflow-auto">
              {cart.products?.map((el, index) => (
                <CartProduct key={el.id} index={index} item={el} />
              ))}
            </div>
            <div className="flex justify-between">
              <Typography text="Total:" />
              <Typography text={cart.total.toString()} />
            </div>
            <button
              onClick={() => setCheckout(true)}
              className="bg-blue-500 py-4 rounded-lg my-4 text-white"
            >
              Place order {"->"}{" "}
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
      <Modal isVisible={checkout} onCloseEvent={() => setCheckout(false)}>
        <div className="w-full">
          <Typography text="Please confirm order" />
          <div className="h-50 border overflow-auto">
            {cart.products?.map((el, index) => (
              <CartProduct
                showQuantity={false}
                key={el.id}
                index={index}
                item={el}
              />
            ))}
          </div>
          <div className="flex justify-between">
            <Typography text="Total:" />
            <Typography text={cart.total.toString()} />
          </div>
          <div>
            <Typography text="Remark" />
            <textarea
              value={remark}
              onChange={(event) => setRemark(event.target.value)}
              placeholder="remark"
              className="border w-full h-20 px-2"
            />
          </div>
          <div className=" gap-10">
            <Typography text="Payment method" />
            <div className="flex gap-10">
              {methods.map((el) => (
                <RadioButton
                  label={el.label}
                  checked={el.value === paymentMethod}
                  onChange={(value) => value && setPaymentMethod(el.value)}
                  key={el.value}
                />
              ))}
            </div>
          </div>
          <button
            onClick={palceOrderEvent}
            className="bg-blue-500 py-4 w-full rounded-lg my-4 text-white"
          >
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
}
