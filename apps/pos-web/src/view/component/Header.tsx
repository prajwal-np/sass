import Typography from "../../@ui/typography";
import { useHomeContext } from "../providers/homeProviders";

export default function Header() {
  const { currentTable } = useHomeContext();

  return (
    <div className="w-full bg-white h-20 border-b-[1px] flex justify-center px-4 flex-col">
      {currentTable?.table ? (
        <>
          <Typography size="sm" text={`Table:${currentTable?.table?.name}`} />
          <Typography
            size="sm"
            text={`Order status:${currentTable?.order?.status || ""}`}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
