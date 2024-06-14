import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import deviceStorage from "../utils/device";
import { setSignIn } from "../redux/auth/auth.reducer";

type Props = {
  privateChildren: React.ReactNode;
  publicChildren: React.ReactNode;
};
export default function AuthGuard({ privateChildren, publicChildren }: Props) {
  const { signIn } = useAppSelector((state) => state.Auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    deviceStorage.getToken().then((res) => {
      if (res) {
        dispatch(setSignIn(true));
      }
    });
  }, [dispatch]);
  return <>{signIn ? privateChildren : publicChildren}</>;
}
