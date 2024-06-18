import { useState } from "react";
import { MenuIcon, Order, ProcessingIcon } from "../../@ui/icons";
import Typography from "../../@ui/typography";
import clsx from "clsx";
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
      name: "complete",
      label: "Completed",
      icon: (props: React.SVGProps<SVGSVGElement>) => <Order {...props} />,
    },
  ];
  return (
    <div className=" h-full bg-blue-500 shadow-xl">
      <ul className="">
        {navigationObj.map((el) => (
          <li
            onClick={() => setActiveNav(el.name)}
            className={clsx(
              "flex justify-center border  cursor-pointer transition transition-all flex-col items-center text-center py-10",
              activeNav === el.name ? "bg-white" : ""
            )}
            key={el.name}
          >
            {el.icon({
              className: activeNav === el.name ? "text-black" : "text-white",
            })}
            <Typography
              text={el.label}
              customClass={activeNav === el.name ? "text-black" : "text-white"}
              size="sm"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
