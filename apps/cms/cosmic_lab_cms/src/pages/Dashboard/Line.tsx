import React, { useEffect } from "react";
import { AxisOptions } from "react-charts";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { getLineData } from "../../redux/dashboard/dashboard.action";
type MyDatum = { date: Date; stars: number };
Chart.register(CategoryScale);
export default function LineComponent() {
  const dispatch = useAppDispatch();
  const { lineData } = useAppSelector((state) => state.Dashboard);
  useEffect(() => {
    dispatch(getLineData({}));
  }, [dispatch]);
  console.log(lineData);

  const data = {
    labels: ["Red", "Orange", "Blue"],
    // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
    datasets: [
      {
        label: "Popularity of colours",
        data: [55, 23, 96],
        // you can set indiviual colors for each bar
        backgroundColor: [
          "rgba(255, 255, 255, 0.6)",
          "rgba(255, 255, 255, 0.6)",
          "rgba(255, 255, 255, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const datatemp = [
    {
      label: "Purchases",
      data: [
        {
          date: new Date(),
          stars: 1,
        },
      ],
    },
    {
      label: "Purchases-2",
      data: [
        {
          date: new Date(new Date().setHours(20)),
          stars: 2,
        },
      ],
    },
  ];

  const primaryAxis = React.useMemo(
    (): AxisOptions<MyDatum> => ({
      getValue: (datum) => datum.date,
      elementType: "line",
      styles: {
        tick: {
          fill: "rgb(197 29 29 / 70%)",
          backgroundColor: "green",
          fontSize: "20px!important",
        },
      },
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    (): AxisOptions<MyDatum>[] => [
      {
        getValue: (datum) => datum.stars,
        elementType: "line",

        styles: {
          fill: "rgb(197 29 29 / 70%)",
          backgroundColor: "green",
          fontSize: "200px!important",
        },
      },
    ],
    []
  );

  return (
    <div className="w-[70vh]">
      <Line
        // options={{
        //   layout: {
        //     padding: {
        //       left: 50, // Adjust this value to increase the gap
        //       right: 20,
        //     },
        //   },

        //   scales: {
        //     yAxes: {
        //       beginAtZero: true,
        //       display: true,
        //     },
        //     xAxes: {
        //       display: true,
        //     },
        //   },
        // }}

        data={{
          labels: lineData.map((data) => data.label),
          datasets: [
            {
              label: "Transaction",
              data: lineData.map(({ data }) => data),
              fill: false,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
            },
          ],
        }}
      />
    </div>
  );
}
