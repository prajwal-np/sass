import { RootState } from "..";
import { Pagination } from "../../types/api";
import { createThunk } from "../store";
import DEVICE_CONSTANT from "./device.constant";
import { DeviceService } from "./device.service";
import { TDevice } from "./type";

export const getDevices = createThunk<Pagination<TDevice[]>>(
  DEVICE_CONSTANT.GET_DEVICES,
  async () => {
    const service = new DeviceService();

    const res = await service.getDevices({
      limit: 10,
      page: 1,
      total: 1,
    });
    return res;
  }
);

export const addDevice = createThunk<
  boolean,
  {
    paringCode: number;
  }
>(DEVICE_CONSTANT.ADD_DEVICE, async ({ paringCode }, { getState }) => {
  const service = new DeviceService();
  const res = (await service.addDevice(paringCode)) as boolean;
  return res;
});
