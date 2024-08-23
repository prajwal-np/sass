import { api } from "../../../api/private";

export const getPairingCode = async () => {
  const res = await api.get<number>("http://localhost:3001/device/pairing");
  return res.data;
};
