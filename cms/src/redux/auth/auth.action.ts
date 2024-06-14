import deviceStorage, { itemNames } from "../../utils/device";
import { createThunk } from "../store";
import AUTH_CONSTANT from "./auth.constant";
import { AuthService } from "./auth.service";

export const signIn = createThunk<
  boolean,
  {
    email: string;
    password: string;
  }
>(AUTH_CONSTANT.SIGN_IN, async (payload) => {
  const service = new AuthService();

  const token = (await service.signIn(payload)) as any;
  deviceStorage.saveItem(itemNames.login, token);
  return true;
});
