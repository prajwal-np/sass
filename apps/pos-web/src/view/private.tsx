import { useState } from "react";
import Navigation from "./component/Navigation";
import Home from "./home";
import Orders from "./orders";

export default function PrivateLayout() {
  const [activeNav, setActiveNav] = useState("menu");
  return (
    <div className="bg-gray-500 h-[100vh] w-[100vw] grid grid-cols-12 gap-3">
      <div className="col-span-1">
        <Navigation activeNav={activeNav} setActiveNav={setActiveNav} />
      </div>
      <div className="col-span-11  shadow-xl overflow-hidden">
        {activeNav === "menu" && <Home />}
        {activeNav !== "menu" && <Orders type={activeNav} />}
      </div>
    </div>
  );
}
