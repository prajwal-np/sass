import { useContext } from "react";
import Menu from "./Menu";
import TableManagment from "./TableManagment";
import { HomeStateProvider } from "../providers/homeProviders";

export default function Home() {
  const { currentTable } = useContext(HomeStateProvider);
  return currentTable?.table.id ? <Menu /> : <TableManagment />;
}
