import { useEffect } from "react";
import TableComponent from "../../components/Table";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { getOrders } from "../../redux/order/order.action";

export default function Orders() {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.order);
  useEffect(() => {
    dispatch(getOrders({}));
  }, [dispatch]);
  const header = [
    {
      name: "Id",
      uid: "id",
    },
    {
      name: "Payment method",
      uid: "paymentMethod",
    },
    {
      name: "Status",
      uid: "status",
    },
    {
      name: "Created at",
      uid: "created_at",
    },
    {
      name: "Action",
      uid: "actions",
    },
  ];
  return <TableComponent header={header} rows={orders} />;
}
