import { Button, ButtonProps } from "@nextui-org/react";

type Props = { icons?: JSX.Element; text: string } & ButtonProps;
export default function CSButton({ icons, text, ...props }: Props) {
  return (
    <Button {...props}>
      {icons}
      <p className="text-md">{text}</p>
    </Button>
  );
}
