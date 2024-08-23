import { useEffect, useState } from "react";
import TableComponent from "../../components/Table";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import AddNewProduct from "./components/AddNewProducts";
import { getProducts } from "../../redux/menu/product/product.action";

export default function Products() {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.Product);
  const [currentView, setCurrentView] = useState<"table" | "addNew">("table");
  useEffect(() => {
    dispatch(getProducts({}));
  }, [dispatch]);
  const header = [
    {
      name: "Id",
      uid: "id",
    },
    {
      name: "name",
      uid: "name",
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
      rows={products}
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
      addNewView={<AddNewProduct onSuccess={() => setCurrentView("table")} />}
    />
  );
}
