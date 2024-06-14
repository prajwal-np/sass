import React from "react";
import { AxisOptions } from "react-charts";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
type MyDatum = { date: Date; stars: number };
Chart.register(CategoryScale);
export default function LineComponent() {
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
  const Data = [
    {
      id: 4,
      year: 2019,
      userGain: 4000,
      userLost: 4555,
    },
    {
      id: 5,
      year: 2020,
      userGain: 4300,
      userLost: 234,
    },
    {
      id: 6,
      year: 2021,
      userGain: 400,
      userLost: 234,
    },
    {
      id: 7,
      year: 2022,
      userGain: 700,
      userLost: 234,
    },
    {
      id: 8,
      year: 2023,
      userGain: 3300,
      userLost: 234,
    },
    {
      id: 9,
      year: 2024,
      userGain: 4100,
      userLost: 234,
    },
  ];
  return (
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
      style={{
        width: "70vh",
        height: "70vh",
      }}
      data={{
        labels: Data.map((data) => data.year),
        datasets: [
          {
            label: "Users Gained ",
            data: Data.map((data) => data.userGain),
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
  );
}
