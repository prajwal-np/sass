import TableComponent from "../../components/Table";
import AddNewCategory from "./components/AddNewCategory";

export default function Category() {
  return (
    <>
      <TableComponent addNewView={<AddNewCategory />} />
    </>
  );
}
