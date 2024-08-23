import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/react";
import { motion } from "framer-motion";
export type TItemProps = {
  icons: JSX.Element;
  label: string;
  route: string;
};
type Props = {
  items: TItemProps[];
  setActive: React.Dispatch<TItemProps>;
};
const Sidenav = ({ items }: Props) => {
  return (
    <aside className="flex justify-center items-center w-[25%]">
      <div className="h-1/2 w-full flex relative flex-col pl-4 items-center">
        <div className="p-4  gap-0 relative w-full h-full bg-[#1d2026]  overflow-visible shadow-small rounded-medium">
          <div className=" absolute top-[-10vh] w-full -left-1 flex justify-center items-center">
            <div className="rounded-full bg-primary-400 w-[20vh] h-[20vh] flex justify-center items-center text-4xl">
              AD
            </div>
          </div>
          <motion.div className="h-full mt-8">
            <Listbox
              aria-label="User Menu"
              className="w-full flex h-full justify-end"
              // onAction={(key) => alert(key)}
              itemClasses={{
                base: "rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80 data-[hover=true]:text-primary/80",
              }}
            >
              {items.map((el) => (
                <ListboxSection key={el.label}>
                  <ListboxItem
                    href={el.route}
                    startContent={
                      <p className="bg-primary/10 text-primary/90">
                        {el.icons}
                        {/* render unique icons based on route as desired */}
                      </p>
                    }
                    key={el.label}
                  >
                    {el.label}
                  </ListboxItem>
                </ListboxSection>
              ))}
            </Listbox>
          </motion.div>
        </div>
      </div>
    </aside>
  );
};

export default Sidenav;
