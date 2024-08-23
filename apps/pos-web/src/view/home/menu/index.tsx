import { useMutation, useQuery } from "react-query";
import { getMenu, placeOrder } from "./api/api";
import Category from "./component/category";
import Product from "./component/product";
import { useEffect, useMemo, useState } from "react";
import { TOrderRequest, TProduct } from "./api/type";
import CartProduct from "./component/cart";
import clsx from "clsx";
import Typography from "../../../@ui/typography";
import Modal from "../../../@ui/modal";
import RadioButton from "../../../@ui/radioButton";
import { AnimatePresence, motion } from "framer-motion";
import ListAnimation from "../../../animation/ListAnimation";
import useParsePrice from "../../../hooks/useParsePrice";
import Button from "../../../@ui/Button";
import { useHomeContext } from "../../providers/homeProviders";

export default function Menu() {
  const { currentTable, checkoutOrder } = useHomeContext();
  const { data } = useQuery(["menu"], getMenu);
  const { parsePrice } = useParsePrice();
  const [products, setProducts] = useState<TProduct[]>([]);
  const [checkout, setCheckout] = useState(false);
  const [remark, setRemark] = useState<string>("");
  // const placeOrderApi = useMutation({
  //   mutationFn: placeOrder,
  // });
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

  const cart = useMemo(
    () => ({
      total: 0,
      subTotal: 0,
      tax: 0,
      products: [],
      ...(currentTable?.order || {}),
    }),
    [currentTable]
  );
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

  // const palceOrderEvent = () => {
  //   const orderPayload: TOrderRequest = {
  //     ...cart,
  //     products: cart.products.map((el) => el.id),
  //     paymentMethod: paymentMethod || "cash",
  //     remark,
  //     status: "incoming",
  //     totalAmount: cart.total,
  //   };
  //   placeOrderApi.mutate(orderPayload);
  //   setCheckout(false);
  // };
  // useEffect(() => {
  //   if (placeOrderApi.isSuccess)
  //     // setCart({
  //     //   total: 0,
  //     //   subTotal: 0,
  //     //   tax: 0,
  //     //   products: [],
  //     // });
  // }, [placeOrderApi]);
  return (
    <div className="w-full flex h-full overflow-hidden px-4">
      <div className={clsx("flex flex-col bg-white w-[100%] ")}>
        <ListAnimation
          extractKey={(item) => item.name + item.id}
          containerClass="flex gap-3 overflow-auto py-4"
          data={data}
          childrens={(el) => (
            <Category
              setProduct={(product) => {
                setProducts(product);
              }}
              item={el}
            />
          )}
        />
        {/* <div className="flex gap-3 overflow-auto border-b-2 my-2">
          {data?.map((el) => (
            <Category
              setProduct={(product) => {
                setProducts(product);
              }}
              item={el}
            />
          ))}
        </div> */}
        <div
          className={clsx([
            cart.products.length ? "col-span-8" : "col-span-10",
            "h-[90%] overflow-auto",
          ])}
        >
          {!products.length ? (
            <></>
          ) : (
            <ListAnimation
              extractKey={(item) => item.name + item.id}
              containerClass={"flex flex-wrap"}
              data={products}
              childrens={(el, i) => <Product key={el.id} index={i} item={el} />}
            />
          )}
        </div>
      </div>
      <AnimatePresence>
        {cart.products.length ? (
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: "55%",
            }}
            exit={{ width: 0 }}
            className=" bg-white"
          >
            <div className="flex-col h-full flex px-2 py-2">
              <ListAnimation
                child={{
                  hidden: {
                    y: 0,
                    x: "-100%",
                  },
                  visible: {
                    x: 0,
                  },
                }}
                extractKey={(item) => item.name + item.id}
                containerClass={"h-[80vh] overflow-auto"}
                data={cart.products}
                childrens={(el, index) => (
                  <CartProduct key={el.id} index={index} item={el} />
                )}
              />
              {/* <div className="h-[80vh] overflow-auto">
                {cart.products?.map((el, index) => (
                  <CartProduct key={el.id} index={index} item={el} />
                ))}
              </div> */}
              <div className="flex justify-between">
                <Typography text="Total:" />
                <Typography text={parsePrice(cart.totalAmount || 0)} />
              </div>
              <div className="flex gap-2">
                <Button
                  // onClick={() =>
                  //   setCart({
                  //     total: 0,
                  //     subTotal: 0,
                  //     tax: 0,
                  //     products: [],
                  //   })
                  // }
                  className="bg-transparent py-4 w-[30%] rounded-lg my-4 text-black-500 border "
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => setCheckout(true)}
                  className="bg-blue-500 w-full py-4 rounded-lg my-4 text-white"
                >
                  Place order {"->"}
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <></>
        )}
      </AnimatePresence>
      <Modal isVisible={checkout} onCloseEvent={() => setCheckout(false)}>
        <div className="w-full">
          <Typography text="Please confirm order" />
          <div className="h-52 border overflow-auto">
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
          <div className="flex gap-4">
            <Button
              onClick={() => setCheckout(false)}
              className="bg-transparent py-4 w-full rounded-lg my-4 text-black-500 border "
            >
              Cancel
            </Button>
            <Button
              onClick={checkoutOrder}
              className="bg-blue-500 py-4 w-full rounded-lg my-4 text-white"
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
