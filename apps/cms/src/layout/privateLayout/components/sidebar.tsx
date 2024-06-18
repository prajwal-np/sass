import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/react";
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
    <aside className="hidden lg:block w-[25%]  h-screen">
      <Listbox
        aria-label="User Menu"
        // onAction={(key) => alert(key)}
        className="p-4  gap-0 w-full h-full bg-content1  overflow-visible shadow-small rounded-medium"
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
    </aside>
  );
};

export default Sidenav;
