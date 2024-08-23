import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Line from "./Line";
import BarComponent from "./Bar";
import { BarGraphIcon, LineGraphIcon } from "../../components/icons";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useEffect } from "react";
import {
  getDashboardCard,
  getOrderOverview,
  getPaymentOverview,
} from "../../redux/dashboard/dashboard.action";
import { ResponseKey } from "../../redux/dashboard/type";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const { cardValue, paymentOverView, orderOverView } = useAppSelector(
    (state) => state.Dashboard
  );

  useEffect(() => {
    dispatch(getDashboardCard({}));
    dispatch(getPaymentOverview({}));
    dispatch(getOrderOverview({}));
  }, [dispatch]);
  const cardItems = [
    {
      label: "Today orders",
      icon: "t",
      value: "totalOrderTodayCount",
    },
    {
      label: "Total order",
      icon: "sad",
      value: "totalOrderCount",
    },
    {
      label: "Total revenue",
      icon: "sad",
      value: "totalRevenue",
      key: "Npr",
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-12 gap-10">
        {cardItems.map((el) => (
          <Card className="col-span-4" key={`dash-card-${el.label}`}>
            <CardBody className="flex flex-row justify-between w-full items-center p-10">
              <div className="flex gap-4  items-center">
                <div className="flex border-1 justify-center p-2 rounded-lg border-default-300 shadow-lg">
                  {el.icon}
                </div>
                <p className="text-md font-semibold">{el.label}</p>
              </div>
              <div className="justify-center flex">
                <h1 className="text-8xl text-center text-bold">
                  {el.key}
                  {cardValue[el.value as ResponseKey]}
                </h1>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-12 my-4 gap-8">
        <Card className="col-span-6">
          <CardHeader>
            <div className="flex gap-4  items-center">
              <div className="flex border-1 justify-center p-2 rounded-lg border-default-300 shadow-lg">
                <LineGraphIcon />
              </div>
              <p className="text-md font-semibold">Line</p>
            </div>
          </CardHeader>
          <CardBody className="flex justify-between w-full items-center p-10">
            <div className="justify-center flex ">
              <Line />
            </div>
          </CardBody>
        </Card>
        <Card className="col-span-6">
          <CardHeader>
            <div className="flex gap-4  items-center">
              <div className="flex border-1 justify-center p-2 rounded-lg border-default-300 shadow-lg">
                <BarGraphIcon />
              </div>
              <p className="text-md font-semibold">bar</p>
            </div>
          </CardHeader>
          <CardBody className="flex justify-between w-full items-center p-10">
            <div className="justify-center flex ">
              <BarComponent />
            </div>
          </CardBody>
        </Card>
        <Card className="col-span-6">
          <CardHeader>
            <div className="flex gap-4  items-center">
              <div className="flex border-1 justify-center p-2 rounded-lg border-default-300 shadow-lg">
                Payment
              </div>
              <p className="text-md font-semibold">Payment overview</p>
            </div>
          </CardHeader>
          <CardBody className="flex justify-between w-full items-center p-10">
            <ul className="w-full">
              {paymentOverView.map((el) => (
                <li
                  className="flex justify-between"
                  key={`payment-overview-${el.label}`}
                >
                  <p>{el.label}</p>
                  <p>{el.data}</p>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
        <Card className="col-span-6">
          <CardHeader>
            <div className="flex gap-4  items-center">
              <div className="flex border-1 justify-center p-2 rounded-lg border-default-300 shadow-lg">
                Order overview
              </div>
              <p className="text-md font-semibold">top items</p>
            </div>
          </CardHeader>
          <CardBody className="flex justify-between w-full items-center p-10">
            <ul className="w-full">
              {orderOverView.map((el) => (
                <li
                  className="flex justify-between"
                  key={`payment-overview-${el.label}`}
                >
                  <p>{el.label}</p>
                  <p>{el.data}</p>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
