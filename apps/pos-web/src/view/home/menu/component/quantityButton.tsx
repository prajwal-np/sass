import { useEffect, useState } from "react";
import Typography from "../../../../@ui/typography";
import Button from "../../../../@ui/Button";
import clsx from "clsx";
type Props = {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
};
export default function QuantityButton({ quantity, setQuantity }: Props) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    setQuantity(value);
  }, [value]);
  const increaseQuantity = () => setValue((prev) => prev + 1);
  const decreaseQuantity = () =>
    setValue((prev) => (prev < 1 ? prev : prev - 1));
  return (
    <div className="grid grid-cols-3 gap-4 items-center justify-center">
      <Button
        disabled={value < 0}
        onClick={() => decreaseQuantity()}
        className={clsx(
          "border  h-10 w-10 transition-all items-center flex justify-center rounded-full",
          value < 1
            ? "text-dark-500 bg-gray-300"
            : "text-blue-500 border-blue-500"
        )}
      >
        -
      </Button>
      <Typography
        customClass="border items-center flex justify-center rounded-full h-10 w-10 text-center"
        text={value.toString()}
      />
      <Button
        onClick={() => increaseQuantity()}
        className="border text-blue-500 border-blue-500 h-10 w-10 items-center flex justify-center rounded-full"
      >
        +
      </Button>
    </div>
  );
}
