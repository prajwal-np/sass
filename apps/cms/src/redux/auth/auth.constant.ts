function AUTH() {
  const prefix = "auth";
  return {
    STATE: prefix,
    GET_INITIAL_AUTH: `${prefix}/initital_aut`,
    SIGN_IN: `${prefix}/signin`,
    SIGN_OUT: `${prefix}/sigout`,
    GET_SAVED_DATA: `${prefix}/get_saved_data`,
    GENERATE_PAIRING_CODE: `${prefix}/generate_pairing_code`,
    SAVE_DEVICE_INFO: `${prefix}/save_device_info`,
    GET_DEVICE_ASSETS: `${prefix}/device_assets`,
    CURRENCY_SETTING: `${prefix}/currency_setting`,
  };
}

const AUTH_CONSTANT = AUTH();
export default AUTH_CONSTANT;
