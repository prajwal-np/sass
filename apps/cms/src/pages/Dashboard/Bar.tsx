import { Bar } from "react-chartjs-2";

export default function BarComponent() {
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
    <Bar
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
  );
}
