import { useEffect, useState } from "react";
import TableComponent from "../../components/Table";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import AddNewCategory from "./components/AddNewCategory";
import { getCategories } from "../../redux/menu/category/category.action";

export default function Category() {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.Category);
  const [currentView, setCurrentView] = useState<"table" | "addNew">("table");
  useEffect(() => {
    dispatch(getCategories({}));
  }, [dispatch]);
  const header = [
    {
      name: "ID",
      uid: "id",
    },
    {
      name: "Name",
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
    <>
      <TableComponent
        view={currentView}
        rows={categories}
        header={header}
        setView={setCurrentView}
        action={{
          edit: (id) => {
            console.log(id);
          },
          delete: (id) => {
            console.log(id);
          },
        }}
        addNewView={
          <AddNewCategory onSuccess={() => setCurrentView("table")} />
        }
      />
    </>
  );
}
