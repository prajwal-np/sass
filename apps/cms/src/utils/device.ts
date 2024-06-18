export const itemNames = {
  login: "log_credentials",
  drawerConfirmed: "drawerConfirmed",
  pairing: "pairingCode",
  printers: "printers",
  deviceInfo: "device_info",
  deviceLoginInfo: "device_login_info",
  terminals: "terminals",
  cloudPrinter: "cloud_printer",
  lang: "lang",
  timeZone: "timeZone",
};

type TItemsNames = typeof itemNames;

const deviceStorage = {
  async saveItem(key: string, value: string | object) {
    try {
      const valuePure =
        typeof value === "object" ? JSON.stringify(value) : value;
      await window.localStorage.setItem(key, valuePure);
    } catch (error) {}
  },
  async getItem(key: string) {
    const res = await window.localStorage.getItem(key);
    return res;
  },
  async getToken() {
    const res = await window.localStorage.getItem("log_credentials");
    if (!res) return null;
    return JSON.parse(res || "{token:null}");
  },
  async getDeviceInfo() {
    const res = await window.localStorage.getItem("device_info");
    if (!res) return null;
    return JSON.parse(res || "{organization:null}");
  },
  //clear only on logout
  async clearItem() {
    const keys: string[] = Object.getOwnPropertyNames(itemNames);
    keys.forEach(async (element: string) => {
      if (element !== "pairing" && element !== "deviceInfo") {
        await window.localStorage.removeItem(
          itemNames[element as keyof TItemsNames]
        );
      }
    });
  },
  async clearAll() {
    await window.localStorage.clear();
  },
};

export default deviceStorage;
