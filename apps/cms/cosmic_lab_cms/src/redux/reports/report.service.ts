import * as publicApi from "../../api/public";
import { TDateRange } from "./type";
export class ReportService {
  async getExcel(dateRange: TDateRange) {
    try {
      const res = await publicApi.api.get<any>(
        `${process.env.REACT_APP_API_BASE_URL}/report/report-download?fromDate=${dateRange.fromDate}&toDate=${dateRange.toDate}`,
        {
          responseType: "blob",
          headers: {
            "Content-Type":
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          },
        }
      );
      return res.data;
    } catch (e) {
      throw e;
    }
  }
}
