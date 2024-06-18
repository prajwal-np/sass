import clsx from "clsx";
import Typography from "../../../../@ui/typography";
import { TCartItem } from "../api/type";
import QuantityButton from "./quantityButton";

type Props = {
  item: TCartItem;
  index: number;
  showQuantity?: boolean;
};
export default function CartProduct({ item, index, showQuantity }: Props) {
  return (
    <div className={clsx("py-4 p-2", index % 2 ? "bg-gray-100" : "")}>
      <div className="flex items-center  justify-between">
        <Typography customClass="w-[33%]" size="sm" text={item.name} />
        {!!showQuantity ? (
          <QuantityButton />
        ) : (
          <Typography size="sm" text={`x${item.quantity}`} />
        )}
        <Typography size="sm" text={`${item.price}`} />
      </div>
    </div>
  );
}
