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
import { motion } from "framer-motion";
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
    <div className="flex h-full dark bg-content1">
      <Sidenav setActive={setActiveItem} items={items} />
      <div className="w-full m-4 h-full  rounded-md p-4 border-1 border-default-100 bg-default-50 dark">
        <div className="flex flex-col mb-4 overflow-hidden">
          <motion.h1
            initial={{
              x: -100,
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: -100,
            }}
            className="text-4xl border-l-4 pl-2 border-l-primary-500"
          >
            {activeItem?.label}
          </motion.h1>
        </div>
        <motion.div
          initial={{
            y: -20,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          exit={{
            scale: 0,
          }}
          transition={{
            delay: 0.1,
          }}
          className="flex overflow-scroll h-full"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
