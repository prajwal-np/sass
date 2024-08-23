import { useQuery } from "react-query";
import { getPairingCode } from "./api/api";

export default function DeviceCode() {
  const { data } = useQuery(["pairing-code"], getPairingCode);
  return (
    <div className="bg-blue-400 w-[100vw] justify-center flex items-center h-[100vh]">
      <div className="text-center ">
        <h2 className="text-2xl text-white tracking-wide">Device code</h2>
        <p className="text-xl py-2 tracking-wider mt-4 bg-black rounded-lg text-white">
          {data}
        </p>
      </div>
    </div>
  );
}
