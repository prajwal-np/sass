import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Line from "./Line";
import BarComponent from "./Bar";
import { BarGraphIcon, LineGraphIcon } from "../../components/icons";

export default function Dashboard() {
  const cardItems = [
    {
      label: "Avg revenue",
      icon: "sad",
    },
    {
      label: "Total revenue",
      icon: "sad",
    },
    {
      label: "Today revenue",
      icon: "sad",
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
                <h1 className="text-8xl text-center text-bold">24</h1>
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
            <div className="justify-center flex ">payment overview</div>
          </CardBody>
        </Card>
        <Card className="col-span-6">
          <CardHeader>
            <div className="flex gap-4  items-center">
              <div className="flex border-1 justify-center p-2 rounded-lg border-default-300 shadow-lg">
                Top items
              </div>
              <p className="text-md font-semibold">top items</p>
            </div>
          </CardHeader>
          <CardBody className="flex justify-between w-full items-center p-10">
            <div className="justify-center flex ">Items</div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
