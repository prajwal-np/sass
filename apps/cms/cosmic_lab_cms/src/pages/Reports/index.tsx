import { useEffect } from "react";
import CSButton from "../../@ui/CSButton";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { getReport } from "../../redux/reports/report.action";
import { setDateRange } from "../../redux/reports/report.reducer";
import DateRange from "./dateRange";

export default function Reports() {
  const dispatch = useAppDispatch();
  const { file } = useAppSelector((state) => state.Report);
  const { dateRange } = useAppSelector((state) => state.Report);
  useEffect(() => {
    console.log(typeof file);
    if (file) {
      const url = window.URL.createObjectURL(file);
      const a = document.createElement("a");
      a.href = url;
      a.download = "filename.xlsx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  }, [file]);
  return (
    <div className="h-[70vh] w-full items-center justify-center px-10 flex flex-col">
      <DateRange
        onChange={(value) => {
          dispatch(setDateRange(value));
        }}
      />
      <div className="w-full flex justify-center">
        <CSButton
          onClick={() => {
            dispatch(getReport(dateRange));
          }}
          text="Generate report"
          className="mt-4 w-1/2"
        />
      </div>
    </div>
  );
}
