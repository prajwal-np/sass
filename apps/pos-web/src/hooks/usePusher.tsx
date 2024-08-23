import Pusher from "pusher-js";
import { useEffect, useState } from "react";
export default function usePusher() {
  const [isPaired, setPaired] = useState(false);
  var pusher = new Pusher("fecb164e11761bd38ca1", {
    cluster: "ap2",
  });
  useEffect(() => {
    const res = window.localStorage.getItem("device");
    if (res) {
      setPaired(true);
    } else {
      pusher.subscribe("cosmic-lab").bind("registered", (res: any) => {
        console.log(res);
        setPaired(true);
        window.localStorage.setItem("device", JSON.stringify(res));
      });
    }
  }, []);
  return {
    isPaired,
  };
}
