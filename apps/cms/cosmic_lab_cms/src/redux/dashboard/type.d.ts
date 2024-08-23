export type ResponseKey =
  | "totalRevenue"
  | "totalOrderCount"
  | "totalOrderTodayCount";
export type CardResponse = {
  totalRevenue: string;
  totalOrderCount: number;
  totalOrderTodayCount: number;
};

export type TChartData = {
  label: string;
  data: number;
};
