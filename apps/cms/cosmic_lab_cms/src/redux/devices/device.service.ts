import * as publicApi from "../../api/public";
import { BasePagination, Pagination } from "../../types/api";
import { TDevice } from "./type";
export class DeviceService {
  async getDevices(pagination: BasePagination) {
    try {
      const res = await publicApi.api.get<Pagination<TDevice[]>>(
        `${process.env.REACT_APP_API_BASE_URL}/device?page=${pagination.page}&limit=${pagination.limit}`
      );
      return res.data;
    } catch (e) {
      throw e;
    }
  }

  async addDevice(pairingCode: number) {
    try {
      const res = await publicApi.api.get<boolean>(
        `${process.env.REACT_APP_API_BASE_URL}/device/verify/${pairingCode}`
      );

      return res.data;
    } catch (e) {
      throw e;
    }
  }
}
