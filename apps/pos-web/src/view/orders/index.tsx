import { useMutation, useQuery } from "react-query";
import { getOrders, updateOrder } from "../home/menu/api/api";
import Typography from "../../@ui/typography";
import clsx from "clsx";
type Props = {
  type: string;
};
export default function Orders({ type }: Props) {
  console.log(type);
  const { data } = useQuery(["orders", type], () => getOrders(type));
  const updateOrderMutate = useMutation({
    mutationFn: updateOrder,
  });
  if (!data?.length) return <></>;
  return (
    <div className="bg-white h-full overflow-hidden">
      <div
        className={clsx(
          "justify-between border shadow-md text-center items-center py-10 px-5 grid ",
          type === "complete" ? "grid-cols-5" : "grid-cols-6"
        )}
      >
        <Typography text={"Id"} />
        <Typography text={"Products"} />
        <Typography text={"Status"} />
        <Typography text={"Remark"} />
        <Typography text={"Total amount"} />
        {type === "complete" ? <></> : <Typography text={"Action"} />}
      </div>
      <div className="h-[85%] overflow-auto">
        {data.map((el, i) => (
          <div
            key={`order-${el.id}`}
            className={clsx(
              "justify-between items-center text-center py-10 px-5 grid",
              i % 2 ? "bg-gray-300" : "",
              type === "complete" ? "grid-cols-5" : "grid-cols-6"
            )}
          >
            <Typography text={el.id.toString()} />
            <Typography text={el.products?.length.toLocaleString()} />
            <Typography text={el.status} />
            <Typography
              customClass="text-gray-500"
              size="sm"
              text={el.remark}
            />
            <Typography text={el.totalAmount.toString()} />
            {type === "complete" ? (
              <></>
            ) : (
              <button
                onClick={() => updateOrderMutate.mutate(el.id)}
                className="bg-blue-500 py-4 rounded-lg text-white"
              >
                Move to complete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
