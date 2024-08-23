import * as publicApi from "../../api/public";
import { CardResponse, TChartData } from "./type";
export class DashboardService {
  async getCardData() {
    try {
      const res = await publicApi.api.get<CardResponse>(
        `${process.env.REACT_APP_API_BASE_URL}/report/card`
      );

      return res.data;
    } catch (e) {
      throw e;
    }
  }

  async getLineData() {
    try {
      const res = await publicApi.api.get<TChartData[]>(
        `${process.env.REACT_APP_API_BASE_URL}/report/line-chart`
      );

      return res.data;
    } catch (e) {
      throw e;
    }
  }
  async getBarData() {
    try {
      const res = await publicApi.api.get<TChartData[]>(
        `${process.env.REACT_APP_API_BASE_URL}/report/bar-chart`
      );

      return res.data;
    } catch (e) {
      throw e;
    }
  }

  async getPaymentOverview() {
    try {
      const res = await publicApi.api.get<TChartData[]>(
        `${process.env.REACT_APP_API_BASE_URL}/report/payment-overview`
      );

      return res.data;
    } catch (e) {
      throw e;
    }
  }

  async getOrderOverview() {
    try {
      const res = await publicApi.api.get<TChartData[]>(
        `${process.env.REACT_APP_API_BASE_URL}/report/order-overview`
      );

      return res.data;
    } catch (e) {
      throw e;
    }
  }
}
