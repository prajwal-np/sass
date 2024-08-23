import { Bar } from "react-chartjs-2";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useEffect } from "react";
import {
  getBarData,
  getLineData,
} from "../../redux/dashboard/dashboard.action";
import { motion } from "framer-motion";
export default function BarComponent() {
  const dispatch = useAppDispatch();
  const { barData } = useAppSelector((state) => state.Dashboard);
  useEffect(() => {
    dispatch(getBarData({}));
  }, [dispatch]);

  return (
    <>
      <div className="w-[65vh] relative">
        <Bar
          data={{
            labels: barData.map((data) => data.label),
            datasets: [
              {
                label: "Monthly sales",
                data: barData.map(({ data }) => data),
                backgroundColor: [
                  "rgba(75,192,192,0.4)",
                  "rgba(75,192,192,1)",
                  "rgba(75,192,192,0.7)",
                ],
                borderColor: "rgba(75,192,192,1)",
              },
            ],
          }}
        />
      </div>
    </>
  );
}
