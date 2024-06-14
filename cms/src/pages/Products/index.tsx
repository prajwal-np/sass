import TableComponent from "../../components/Table";
import AddNewProduct from "./components/AddNewProducts";

export default function Products() {
  return <TableComponent addNewView={<AddNewProduct />} />;
}
