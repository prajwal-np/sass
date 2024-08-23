import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import deviceStorage from "../utils/device";
import { setSignIn } from "../redux/auth/auth.reducer";
import { Navigate, useLocation } from "react-router-dom";

type Props = {
  children: JSX.Element;
};
export default function AuthGuard({ children }: Props) {
  const { signIn } = useAppSelector((state) => state.Auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    deviceStorage.getToken().then((res) => {
      if (res) {
        console.log(res, "asd");
        dispatch(setSignIn(true));
      }
    });
  }, [dispatch]);
  const location = useLocation();

  // if (!signIn) {
  //   // Redirect them to the login page
  //   return <Navigate to="/" state={{ from: location }} replace />;
  // }

  return children;
}
