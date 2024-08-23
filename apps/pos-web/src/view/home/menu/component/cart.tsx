import clsx from "clsx";
import Typography from "../../../../@ui/typography";
import { TProduct } from "../api/type";
import QuantityButton from "./quantityButton";
import { useState } from "react";
import useParsePrice from "../../../../hooks/useParsePrice";

type Props = {
  item: TProduct;
  index: number;
  showQuantity?: boolean;
};
export default function CartProduct({ item, index, showQuantity }: Props) {
  const [quantity, setQuantity] = useState<number>(0);
  const { parsePrice } = useParsePrice();
  return (
    <div
      className={clsx([
        "py-4 p-2",
        index % 2 ? "bg-gray-100" : "",
        "overflow-hidden",
      ])}
    >
      <div className="flex items-center  justify-between">
        <Typography size="sm" text={item.name} />
        {!!showQuantity ? (
          <QuantityButton quantity={quantity} setQuantity={setQuantity} />
        ) : (
          <Typography size="sm" text={`x${item.quantity}`} />
        )}
        <Typography size="sm" text={parsePrice(item.price)} />
      </div>
    </div>
  );
}
