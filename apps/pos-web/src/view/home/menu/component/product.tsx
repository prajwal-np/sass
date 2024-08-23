import clsx from "clsx";
import { CartIcon } from "../../../../@ui/icons";
import Typography from "../../../../@ui/typography";
import { TProduct } from "../api/type";
import QuantityButton from "./quantityButton";

import { useState } from "react";
import useParsePrice from "../../../../hooks/useParsePrice";
import Button from "../../../../@ui/Button";
import { useHomeContext } from "../../../providers/homeProviders";
type Props = {
  item: TProduct;
  index: number;
};
export default function Product({ item, index }: Props) {
  const [quantity, setQuantity] = useState<number>(0);
  const { parsePrice } = useParsePrice();
  const { addToCart } = useHomeContext();
  return (
    <div
      className={clsx(
        "justify-between flex flex-col h-48  items-center rounded-lg p-4",
        index % 2 ? "" : "bg-gray-100"
      )}
    >
      <div className="flex justify-between items-center w-full overflow-hidden">
        <Typography text={item.name} customClass="text-left" />
        <Typography text={parsePrice(item.price)} customClass="text-center" />
      </div>
      <div className="flex gap-6 items-center">
        <QuantityButton quantity={quantity} setQuantity={setQuantity} />
        <Button
          disabled={!quantity}
          onClick={() =>
            addToCart &&
            addToCart({
              ...item,
              price: item.price * quantity,
              quantity: quantity,
              note: "some note",
            })
          }
          className={clsx([
            "border text-white   h-12 w-12 items-center flex justify-center rounded-full",
            !quantity ? "bg-gray-400" : "bg-blue-500  border-blue-500",
          ])}
        >
          <CartIcon />
        </Button>
      </div>
    </div>
  );
}
