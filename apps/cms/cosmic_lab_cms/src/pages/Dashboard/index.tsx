import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Line from "./Line";
import BarComponent from "./Bar";
import {
  BarGraphIcon,
  FinanceIcon,
  LineGraphIcon,
  OrderCountIcon,
  TodayIcon,
} from "../../components/icons";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useEffect } from "react";
import {
  getDashboardCard,
  getOrderOverview,
  getPaymentOverview,
} from "../../redux/dashboard/dashboard.action";
import { ResponseKey } from "../../redux/dashboard/type";
import Counter from "../../@ui/Animation/Counter";
import { motion } from "framer-motion";
import ListAnimation from "../../@ui/Animation/ListAnimation";
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
      label: "Total revenue",
      icon: (
        <motion.div
          initial={{
            translateY: 20,
          }}
          animate={{
            translateY: 0,
          }}
        >
          <FinanceIcon className="text-white" />
        </motion.div>
      ),
      value: "totalRevenue",
      key: "रु",
    },
    {
      label: "Today orders",
      icon: <TodayIcon className="text-white" />,
      value: "totalOrderTodayCount",
    },
    {
      label: "Total order",
      icon: <OrderCountIcon className="text-white" />,
      value: "totalOrderCount",
    },
  ];
  return (
    <div>
      <ListAnimation
        containerClass="grid grid-cols-12 gap-10 w-full"
        data={cardItems}
        childClass="col-span-4"
        childrens={(el) => (
          <Card className="col-span-4 bg-[#1d2026]">
            <CardBody className="flex flex-row justify-between w-full items-center p-10">
              <div className="flex gap-4  items-center">
                <div className="flex overflow-hidden border-1 justify-center p-2 rounded-lg border-default-300 shadow-lg">
                  {el.icon}
                </div>
                <p className="text-md font-semibold">{el.label}</p>
              </div>
              <div className="justify-center flex w-[70r%]">
                <div className="text-6xl text-center  flex gap-2 text-bold">
                  <p className="text-4xl">{el.key}</p>
                  {Number(cardValue[el.value as ResponseKey]) && (
                    <Counter to={Number(cardValue[el.value as ResponseKey])} />
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
        )}
        extractKey={(el) => `dash-card-${el.label}`}
      />
      <ListAnimation
        containerClass="grid grid-cols-12 my-4 gap-8"
        data={[
          <Card className="col-span-6 bg-[#1d2026]">
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
          </Card>,
          <Card className="col-span-6 bg-[#1d2026]">
            <CardHeader>
              <div className="flex gap-4  items-center">
                <div className="flex border-1 justify-center p-2 rounded-lg border-default-300 shadow-lg">
                  <BarGraphIcon />
                </div>
                <p className="text-md font-semibold">Bar</p>
              </div>
            </CardHeader>
            <CardBody className="flex justify-between w-full items-center p-10">
              <div className="justify-center h-[35vh]">
                <BarComponent />
              </div>
            </CardBody>
          </Card>,
          <Card className="col-span-6 mb-20 bg-[#1d2026]">
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
                    <div className="flex gap-1">
                      रु
                      <Counter to={el.data} />
                    </div>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>,
          <Card className="col-span-6 mb-20 bg-[#1d2026]">
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
                    <div className="flex gap-1">
                      रु
                      <Counter to={el.data} />
                    </div>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>,
        ]}
        childClass="col-span-6"
        childrens={(el) => el}
        extractKey={(el, i) => `dash-cardoverview` + i}
      />
    </div>
  );
}
