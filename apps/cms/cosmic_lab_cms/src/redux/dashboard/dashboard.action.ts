import deviceStorage, { itemNames } from "../../utils/device";
import { createThunk } from "../store";
import DASHBOARD_CONSTANT from "./dashboard.constant";
import AUTH_CONSTANT from "./dashboard.constant";
import { DashboardService } from "./dashboard.service";
import { CardResponse, TChartData } from "./type";

export const getDashboardCard = createThunk<CardResponse>(
  DASHBOARD_CONSTANT.GET_DASHBOARD_CARD,
  async () => {
    const service = new DashboardService();

    const res = (await service.getCardData()) as CardResponse;
    return res;
  }
);

export const getLineData = createThunk<TChartData[]>(
  DASHBOARD_CONSTANT.GET_LINE_DATA,
  async () => {
    const service = new DashboardService();

    const res = await service.getLineData();
    return res;
  }
);

export const getBarData = createThunk<TChartData[]>(
  DASHBOARD_CONSTANT.GET_BAR_DATA,
  async () => {
    const service = new DashboardService();

    const res = await service.getBarData();
    return res;
  }
);
export const getPaymentOverview = createThunk<TChartData[]>(
  DASHBOARD_CONSTANT.GET_PAYMENT_OVERVIEW,
  async () => {
    const service = new DashboardService();

    const res = await service.getPaymentOverview();
    return res;
  }
);

export const getOrderOverview = createThunk<TChartData[]>(
  DASHBOARD_CONSTANT.GET_ORDER_OVERVIEW,
  async () => {
    const service = new DashboardService();

    const res = await service.getOrderOverview();
    return res;
  }
);
