import clsx from "clsx";
import Status from "./Status";
type Props = {
  type: string;
  name: string;
  status: string;
};
export default function Shape({ type, name, status }: Props) {
  return (
    <div
      className={clsx(
        "border bordr-1 w-full h-full",
        type === "rounded" && "rounded-[2.5rem]",
        type === "square" && "rounded-lg",
        type === "circle" && "rounded-full"
      )}
    >
      <Status type={type} status={status} name={name} />
    </div>
  );
}
