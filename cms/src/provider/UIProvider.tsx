import { NextUIProvider } from "@nextui-org/react";

type Props = {
  children: React.ReactNode;
};
export default function UIProvider({ children }: Props) {
  return (
    <NextUIProvider className="dark bg-background text-foreground h-full overflow-hidden">
      {children}
    </NextUIProvider>
  );
}
