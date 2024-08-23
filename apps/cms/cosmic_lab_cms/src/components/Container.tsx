type Props = {
  children: React.ReactNode;
} & React.ComponentProps<"div">;
export default function Container({ children, ...props }: Props) {
  return (
    <div className="h-[inherit] flex justify-center item-center" {...props}>
      {children}
    </div>
  );
}
