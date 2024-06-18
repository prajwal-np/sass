import clsx from "clsx";
import { CartIcon } from "../../../../@ui/icons";
import Typography from "../../../../@ui/typography";
import { TCartItem, TProduct } from "../api/type";
import QuantityButton from "./quantityButton";

type Props = {
  item: TProduct;
  index: number;
  addToCart: (_product: TCartItem) => void;
};
export default function Product({ item, addToCart, index }: Props) {
  return (
    <div
      className={clsx(
        "justify-between flex px-6 w-full rounded-lg py-10 ",
        index % 2 ? "" : "bg-gray-100"
      )}
    >
      <Typography text={item.name} customClass="text-left w-[15%]" />
      <Typography
        text={item.price.toString()}
        customClass="text-center w-[15%]"
      />
      <div className="flex gap-6">
        <QuantityButton />
        <button
          onClick={() => addToCart({ ...item, quantity: 1 })}
          className="border text-white  bg-blue-500  border-blue-500 h-12 w-12 items-center flex justify-center rounded-full"
        >
          <CartIcon />
        </button>
      </div>
    </div>
  );
}
