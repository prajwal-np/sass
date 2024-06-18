import clsx from "clsx";

type Props = {
  text: string;
  size?: "lg" | "md" | "sm";
  customClass?: string;
};

const sizeObj = {
  lg: "text-xl",
  md: "text-lg",
  sm: "text-sm",
};
export default function Typography({ text, customClass, size }: Props) {
  const classCombine = clsx([customClass, sizeObj[size || "md"]]);
  return <p className={classCombine}>{text}</p>;
}
