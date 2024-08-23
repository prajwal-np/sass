import { useEffect, useMemo, useState } from "react";
import Sidenav, { TItemProps } from "./components/sidebar";
import { useLocation, useNavigation } from "react-router-dom";
import {
  CategoryIcon,
  DashboardIcon,
  OrderIcon,
  ProductIcon,
  ReportIcon,
  TransactionIcon,
} from "../../components/icons";
type Props = {
  children: React.ReactNode;
};
export default function PrivateLayout({ children }: Props) {
  const [activeItem, setActiveItem] = useState<TItemProps>();
  const items = useMemo(
    () => [
      {
        icons: <DashboardIcon />,
        label: "Dashboard",
        route: "/dash",
      },
      {
        icons: <CategoryIcon />,
        label: "Category",
        route: "/category",
      },
      {
        icons: <ProductIcon />,
        label: "Product",
        route: "/products",
      },
      {
        icons: <OrderIcon />,
        label: "Orders",
        route: "/orders",
      },
      {
        icons: <TransactionIcon />,
        label: "Devices",
        route: "/device",
      },
      {
        icons: <ReportIcon />,
        label: "Reports",
        route: "/reports",
      },
    ],
    []
  );
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname) {
      const currentRoute = items.find((el) => pathname.includes(el.route));
      setActiveItem(currentRoute);
    }
  }, [items, pathname]);
  return (
    <div className="flex h-full">
      <Sidenav setActive={setActiveItem} items={items} />
      <div className="w-full m-4 h-full  rounded-md p-4 border-1 border-default-100 bg-default-50 dark">
        <div className="flex flex-col mb-4">
          <h1 className="text-4xl">{activeItem?.label}</h1>
        </div>
        <div className="flex overflow-scroll h-full ">{children}</div>
      </div>
    </div>
  );
}
