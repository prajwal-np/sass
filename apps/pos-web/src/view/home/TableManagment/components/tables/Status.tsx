import clsx from "clsx";
type Props = {
  type: string;
  status: string;
  name: string;
};
export default function Status({ type, name, status }: Props) {
  const statusClass: any = {
    available: "bg-green-200 text-green-600",
    bill: "bg-blue-200 text-blue-600",
    occupied: "bg-gray-200 text-gray-600",
    cleaning: "bg-yellow-200 text-yellow-600",
  };
  const statusPillClass: any = {
    available: "bg-green-500 ",
    bill: "bg-blue-500 ",
    occupied: "bg-gray-500 ",
    cleaning: "bg-yellow-500 ",
  };
  return (
    <div className="flex items-center flex-col gap-2 justify-end  w-full h-full">
      <div
        className={clsx(
          "rounded-full  w-10 h-10 flex items-center justify-center",
          statusClass[status]
        )}
      >
        <p className="text-[60%]">{name}</p>
      </div>
      <div
        className={clsx(
          "rounded-full px-[10%] text-white",
          statusPillClass[status]
        )}
      >
        <p className="text-[60%]">Available</p>
      </div>
    </div>
  );
}
