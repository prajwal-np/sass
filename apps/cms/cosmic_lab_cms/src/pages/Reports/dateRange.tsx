import { getLocalTimeZone, startOfMonth, today } from "@internationalized/date";
import { DateRangePicker } from "@nextui-org/date-picker";
import { DateValue } from "@nextui-org/react";
import { useEffect, useState } from "react";
type Props = {
  onChange: (_value: { fromDate: string; toDate: string }) => void;
};
export default function DateRange({ onChange }: Props) {
  const [dates, setDates] = useState<{
    start: DateValue;
    end: DateValue;
  }>({
    start: startOfMonth(today(getLocalTimeZone())),
    end: today(getLocalTimeZone()),
  });
  useEffect(() => {
    if (dates) {
      onChange({
        fromDate: dates.start.toString(),
        toDate: dates.end.toString(),
      });
    }
  }, [dates]);
  return (
    <>
      <DateRangePicker
        value={dates}
        onChange={(value) => {
          setDates({
            start: value.start,
            end: value.end,
          });
        }}
        fullWidth
        granularity="day"
        className="bg-black-500 w-full"
        label="Report date range"
        maxValue={today(getLocalTimeZone())}
      />
    </>
  );
}
