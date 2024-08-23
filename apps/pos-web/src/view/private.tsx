import { useState } from "react";
import Navigation from "./component/Navigation";
import Home from "./home";
import Orders from "./orders";
import { motion } from "framer-motion";
import HomeProvider from "./providers/homeProviders";
import Header from "./component/Header";
export default function PrivateLayout() {
  const [activeNav, setActiveNav] = useState("menu");

  return (
    <HomeProvider>
      <div className="bg-white-500 w-[100vw] flex h-full">
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className="w-24"
        >
          <div className="w-full bg-white h-20"></div>
          <Navigation activeNav={activeNav} setActiveNav={setActiveNav} />
        </motion.div>
        <div className="w-full  overflow-hidden">
          <Header />
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            className="h-full"
          >
            {activeNav === "menu" && <Home />}
            {activeNav !== "menu" && (
              <motion.div
                initial={{
                  opacity: 0,
                  height: "100%",
                }}
                animate={{
                  opacity: 1,
                }}
              >
                <Orders type={activeNav.toUpperCase()} />
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </HomeProvider>
  );
}
