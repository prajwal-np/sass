// import deviceStorage, { itemNames } from ".././../utils/device";
// import { createThunk } from "../../store";
// import AUTH_CONSTANT from "./category.constant";
// // import { AuthService } from "../getCategory.service";

// export const signIn = createThunk<
//   boolean,
//   {
//     email: string;
//     password: string;
//   }
// >(AUTH_CONSTANT.SIGN_IN, async (payload) => {
//   const service = new Cate();

//   const token = (await service.signIn(payload)) as any;
//   deviceStorage.saveItem(itemNames.login, token);
//   return true;
// });
