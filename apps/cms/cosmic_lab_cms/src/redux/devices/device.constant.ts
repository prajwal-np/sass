function DEVICE() {
  const prefix = "device";
  return {
    STATE: prefix,
    GET_DEVICES: `${prefix}/get_devices`,
    ADD_DEVICE: `${prefix}/add_device`,
  };
}

const DEVICE_CONSTANT = DEVICE();
export default DEVICE_CONSTANT;
