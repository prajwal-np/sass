function REPORT() {
  const prefix = "report";
  return {
    STATE: prefix,
    GET_REPORT: `${prefix}/get_report`,
  };
}

const REPORT_CONSTANT = REPORT();
export default REPORT_CONSTANT;
