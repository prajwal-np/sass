import { useEffect, useState } from "react";
import TableComponent from "../../components/Table";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { getProducts } from "../../redux/menu/product/product.action";
import AddNewDevice from "./components/AddNewDevices";
import { getDevices } from "../../redux/devices/device.action";

export default function Devices() {
  const dispatch = useAppDispatch();
  const { devices } = useAppSelector((state) => state.Device);
  const [currentView, setCurrentView] = useState<"table" | "addNew">("table");
  useEffect(() => {
    dispatch(getDevices({}));
  }, [dispatch]);
  const header = [
    {
      name: "Id",
      uid: "id",
    },
    {
      name: "Code",
      uid: "code",
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

  return (
    <TableComponent
      header={header}
      rows={devices}
      view={currentView}
      setView={setCurrentView}
      action={{
        edit: (id) => {
          console.log(id);
        },
        delete: (id) => {
          console.log(id);
        },
      }}
      addNewView={<AddNewDevice onSuccess={() => setCurrentView("table")} />}
    />
  );
}
