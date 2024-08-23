import deviceStorage, { itemNames } from "../../utils/device";
import { createThunk } from "../store";
import REPORT_CONSTANT from "./report.constant";
import { ReportService } from "./report.service";
import { TDateRange } from "./type";

export const getReport = createThunk<Blob, TDateRange>(
  REPORT_CONSTANT.GET_REPORT,
  async (payload) => {
    const service = new ReportService();
    const res = (await service.getExcel(payload)) as Blob;
    return res;
  }
);
