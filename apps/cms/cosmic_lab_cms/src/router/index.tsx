import {
  Route,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
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
import Devices from "../pages/Devices";

export default function Router() {
  const commonConfig: RouteObject[] = [
    {
      errorElement: <p>Error</p>,
    },
  ];
  const privateRoute = [
    {
      path: "/",
      element: <Login />,
      ...commonConfig,
    },
    {
      path: "/dash",
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
      path: "/device",
      element: (
        <PrivateLayout>
          <Devices />
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
  ];

  const router = createBrowserRouter(
    createRoutesFromElements(
      privateRoute.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            route.path === "/" ? (
              route.element
            ) : (
              <AuthGuard>{route.element}</AuthGuard>
            )
          }
          errorElement={<p>error</p>}
        />
      ))
    )
  );
  return (
    <UIProvider>
      <RouterProvider router={router} />
      {/* <AuthGuard
        privateChildren={<RouterProvider router={privateRoute} />}
        publicChildren={<RouterProvider router={publicRoute} />}
      /> */}
    </UIProvider>
  );
}
