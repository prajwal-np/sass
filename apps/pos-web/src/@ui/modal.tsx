import { motion } from "framer-motion";
import clsx from "clsx";

type Props = {
  isVisible: boolean;
  onCloseEvent: () => void;
  children: React.ReactNode;
};

const sizeObj = {
  lg: "text-xl",
  md: "text-lg",
  sm: "text-sm",
};
export default function Modal({ isVisible, onCloseEvent, children }: Props) {
  if (!isVisible) return <></>;
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
