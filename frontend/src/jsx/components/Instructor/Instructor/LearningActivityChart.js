import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
const LearningActivityChart = () => {
  const token = useSelector((state) => state.auth.auth.token);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]); // main listing data
  const [scores, setScores] = useState();

  // //sample data
  // const arr = [
  //     {score: 25, days: "22-02-2023"},
  //     {score: 10, days: "23-02-2023"},
  //     {score: 35, days: "24-02-2023"},
  //     {score: 25, days: "25-02-2023"},
  //     {score: 15, days: "26-02-2023"},
  //     {score: 5, days: "27-02-2023"},
  //     {score: 10, days: "28-02-2023"}
  // ];

  const handlepageLoad = async (e) => {
    // query string
    const response = await fetch("http://localhost:8081/api/induction/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    }).then((data) => data.json());
    if ("status" in response && response.status == true) {
      setUsers(response.data);
      setLoading(false);
    } else {
      return swal("Failed", response.message, "error");
    }
    // console.log(response.data, "response data....")
    console.log(users, "users data under api res");
  };

  //calculating average
  const arr1 = [10, 22, 33, 45, 57];
  var sum = 0;
  for (var number of arr1) {
    sum += number;
  }
  let average = sum / arr1.length;
  console.log("average " + average);

  // use effect
  useEffect(() => {
    handlepageLoad();
  }, []);
  console.log("set-users", users);
  //   console.log("dataset1 scores",dataset1.score)

  // arrays to push data
  const dataset1 = [];
  const dataset2 = [];

  for (const val of users) {
    dataset1.push(val.result);
    console.log(dataset1, "dataset1 array...");
    
    // console.log(dataset1.testStatus, "dataset1 teststatus")
  }

//   dataset1.forEach(
// 	nums=>{
// 		console.log("Score "+nums.score , "testStatus "+nums.testStatus)
// 	}
//    )
  const state = {
    series: [
      {
        name: "",
        data: [40, 50, 40, 60, 90, 70, 90],
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 300,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [3, 3, 3],
        colors: ["var(--secondary)", "var(--primary)"],
        curve: "straight",
      },
      legend: {
        show: false,
        tooltipHoverFormatter: function (val, opts) {
          return (
            val +
            " - " +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            ""
          );
        },
        markers: {
          fillColors: ["var(--secondary)", "var(--primary)"],
          width: 16,
          height: 16,
          strokeWidth: 0,
          radius: 16,
        },
      },
      markers: {
        size: [8, 8],
        strokeWidth: [4, 4],
        strokeColors: ["#fff", "#fff"],
        border: 2,
        radius: 2,
        colors: ["var(--secondary)", "var(--primary)", "#fff"],
        hover: {
          size: 10,
        },
      },
      xaxis: {
        categories: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        labels: {
          style: {
            colors: "#3E4954",
            fontSize: "14px",
            fontFamily: "Poppins",
            fontWeight: 100,
          },
        },
        axisBorder: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          minWidth: 20,
          offsetX: -16,
          style: {
            colors: "#3E4954",
            fontSize: "14px",
            fontFamily: "Poppins",
            fontWeight: 100,
          },
        },
      },
      fill: {
        colors: ["#fff", "#FF9432"],
        type: "gradient",
        opacity: 1,
        gradient: {
          shade: "light",
          shadeIntensity: 1,
          colorStops: [
            [
              {
                offset: 0,
                color: "#fff",
                opacity: 0,
              },
              {
                offset: 0.6,
                color: "#fff",
                opacity: 0,
              },
              {
                offset: 100,
                color: "#fff",
                opacity: 0,
              },
            ],
            [
              {
                offset: 0,
                color: "var(--primary)",
                opacity: 0.4,
              },
              {
                offset: 50,
                color: "var(--primary)",
                opacity: 0.25,
              },
              {
                offset: 100,
                color: "#fff",
                opacity: 0,
              },
            ],
          ],
        },
      },
      colors: ["#1EA7C5", "#FF9432"],
      grid: {
        borderColor: "#F1F1F1",
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      responsive: [
        {
          breakpoint: 1602,
          options: {
            markers: {
              size: [6, 6, 4],
              hover: {
                size: 7,
              },
            },
            chart: {
              height: 230,
            },
          },
        },
      ],
    },
  };
  return (
    <div id="chart">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="area"
        height={300}
      />
    </div>
  );
};
export default LearningActivityChart;
