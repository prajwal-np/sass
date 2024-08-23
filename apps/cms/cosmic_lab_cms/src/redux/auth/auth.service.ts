import * as publicApi from "../../api/public";
import { SignInResponse } from "./type";
export class AuthService {
  async signIn(payload: { email: string; password: string }) {
    try {
      const res = await publicApi.api.post<SignInResponse>(
        "http://localhost:3001/auth/login",
        payload
      );

      return res.data;
    } catch (e) {
      throw e;
    }
  }
}
