import { useEffect, useState } from "react";
import Typography from "../../../../@ui/typography";

export default function QuantityButton() {
  const [value, setValue] = useState(0);
  const increaseQuantity = () => setValue((prev) => prev + 1);
  const decreaseQuantity = () =>
    setValue((prev) => (prev < 1 ? prev : prev - 1));
  return (
    <div className="grid grid-cols-3 gap-4 items-center justify-center">
      <button
        onClick={() => decreaseQuantity()}
        className="border text-blue-500 border-blue-500 h-10 w-10 items-center flex justify-center rounded-full"
      >
        -
      </button>
      <Typography
        customClass="border rounded-full h-10 w-10 text-center"
        text={value.toString()}
      />
      <button
        onClick={() => increaseQuantity()}
        className="border text-blue-500 border-blue-500 h-10 w-10 items-center flex justify-center rounded-full"
      >
        +
      </button>
    </div>
  );
}
