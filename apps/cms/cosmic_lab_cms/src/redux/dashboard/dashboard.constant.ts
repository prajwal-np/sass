function DASHBOARD() {
  const prefix = "dashboard";
  return {
    STATE: prefix,
    GET_DASHBOARD_CARD: `${prefix}/get_dashboard_cards`,
    GET_LINE_DATA: `${prefix}/get_line_data`,
    GET_BAR_DATA: `${prefix}/get_bar_data`,
    GET_PAYMENT_OVERVIEW: `${prefix}/get_payment_overview`,
    GET_ORDER_OVERVIEW: `${prefix}/get_order_overview`,
  };
}

const DASHBOARD_CONSTANT = DASHBOARD();
export default DASHBOARD_CONSTANT;
