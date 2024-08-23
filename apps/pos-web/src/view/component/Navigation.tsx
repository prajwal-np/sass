import { useState } from "react";
import { MenuIcon, Order, ProcessingIcon } from "../../@ui/icons";
import Typography from "../../@ui/typography";
import clsx from "clsx";
import ListAnimation from "../../animation/ListAnimation";
import { motion } from "framer-motion";

type Props = {
  activeNav: string;
  setActiveNav: React.Dispatch<React.SetStateAction<string>>;
};
export default function Navigation({ activeNav, setActiveNav }: Props) {
  const navigationObj = [
    {
      name: "menu",
      label: "Menu",
      icon: (props: React.SVGProps<SVGSVGElement>) => <MenuIcon {...props} />,
    },
    {
      name: "incoming",
      label: "Processing",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <ProcessingIcon {...props} />
      ),
    },
    {
      name: "completed",
      label: "Completed",
      icon: (props: React.SVGProps<SVGSVGElement>) => <Order {...props} />,
    },
  ];
  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.2,
      },
    },
  };
  return (
    <div className=" h-full border-r-[1px] bg-white">
      <motion.div
        layout
        variants={container}
        initial="hidden"
        animate="visible"
        className="overflow-hidden p-4"
      >
        {navigationObj.map((el) => (
          <motion.div
            whileTap={{
              scale: 0.9,
            }}
            key={el.name}
            transition={{ duration: 0.1 }}
            onClick={() => setActiveNav(el.name)}
            className={clsx(
              " cursor-pointer mb-4  transition-all  text-center p-3 rounded-2xl",
              activeNav === el.name ? "bg-blue-200  shadow-md" : ""
            )}
          >
            <motion.div
              key={el.name}
              variants={{
                hidden: {
                  scale: 0,
                },
                visible: {
                  scale: 1,
                },
              }}
              whileTap={{
                scale: 0.9,
              }}
              initial="hidden"
              animate="visible"
              className="flex text-sm justify-center gap-2 items-center w-full h-full"
            >
              {el.icon({
                className: clsx(
                  activeNav === el.name ? "text-blue-500" : "text-black",
                  "w-5"
                ),
              })}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
