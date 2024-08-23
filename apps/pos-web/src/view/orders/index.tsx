import { useMutation, useQuery } from "react-query";
import { getOrders, updateOrder } from "../home/Menu/api/api";
import Typography from "../../@ui/typography";
import clsx from "clsx";
import ListAnimation from "../../animation/ListAnimation";
import useParsePrice from "../../hooks/useParsePrice";
import Button from "../../@ui/Button";
type Props = {
  type: string;
};
export default function Orders({ type }: Props) {
  const { parsePrice } = useParsePrice();
  const { data } = useQuery(["orders", type], () => getOrders(type));
  const updateOrderMutate = useMutation({
    mutationFn: updateOrder,
  });
  if (!data?.length) return <></>;
  return (
    <div className="bg-white h-full overflow-hidden">
      <ListAnimation
        containerClass={clsx(
          "justify-between border shadow-md text-center items-center py-10 px-5 grid ",
          type === "complete" ? "grid-cols-5" : "grid-cols-6"
        )}
        childrens={(el, i) => <Typography text={el} />}
        data={[
          "Id",
          "Products",
          "Status",
          "Remark",
          "Total amount",
          type ? "" : "Action",
        ]}
        extractKey={(el) => `order-table-${el}`}
      />

      <ListAnimation
        containerClass={"h-[85%] overflow-auto"}
        childrens={(el, i) => (
          <div
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
            <Typography text={parsePrice(el.totalAmount)} />
            {type === "complete" ? (
              <></>
            ) : (
              <Button
                onClick={() => updateOrderMutate.mutate(el.id)}
                className="bg-blue-500 py-4 rounded-lg text-white"
              >
                Move to complete
              </Button>
            )}
          </div>
        )}
        data={data}
        extractKey={(el) => `order-${el.id}`}
      />
    </div>
  );
}
