import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Login from "../pages/Login";
import UIProvider from "../provider/UIProvider";
import Dashboard from "../pages/Dashboard";
import PrivateLayout from "../layout/privateLayout";
import Category from "../pages/Category";
import Products from "../pages/Products";
import Orders from "../pages/Orders";
import Transactions from "../pages/Transactions";
import Reports from "../pages/Reports";
import AuthGuard from "../guard/AuthGuard";

export default function Router() {
  const commonConfig: RouteObject[] = [
    {
      errorElement: <p>Error</p>,
    },
  ];
  const publicRoute = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      ...commonConfig,
    },
  ]);
  const privateRoute = createBrowserRouter([
    {
      path: "/",
      element: (
        <PrivateLayout>
          <Dashboard />
        </PrivateLayout>
      ),
      ...commonConfig,
    },
    {
      path: "/category",
      element: (
        <PrivateLayout>
          <Category />
        </PrivateLayout>
      ),
      ...commonConfig,
    },
    {
      path: "/products",
      element: (
        <PrivateLayout>
          <Products />
        </PrivateLayout>
      ),
      ...commonConfig,
    },
    {
      path: "/orders",
      element: (
        <PrivateLayout>
          <Orders />
        </PrivateLayout>
      ),
      ...commonConfig,
    },
    {
      path: "/transactions",
      element: (
        <PrivateLayout>
          <Transactions />
        </PrivateLayout>
      ),
      ...commonConfig,
    },
    {
      path: "/reports",
      element: (
        <PrivateLayout>
          <Reports />
        </PrivateLayout>
      ),
      ...commonConfig,
    },
  ]);
  return (
    <UIProvider>
      <AuthGuard
        privateChildren={<RouterProvider router={privateRoute} />}
        publicChildren={<RouterProvider router={publicRoute} />}
      />
    </UIProvider>
  );
}
