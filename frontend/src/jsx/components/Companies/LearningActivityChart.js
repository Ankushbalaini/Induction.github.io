import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import { useEffect } from "react";
import { format } from 'date-fns'
import ReactApexChart from "react-apexcharts";

const LearningActivityChart = () => {
  const token = useSelector((state) => state.auth.auth.token);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(); // main listing data
  const [scores, setScores] = useState();
  const [daywise, setDayWise]=useState();


  const handlepageLoad = async (e) => {
    // query string
    const response = await fetch(" http://localhost:8081/api/company/dashboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    }).then((data) => data.json());
    if ("status" in response && response.status == true) {
      console.log(response.data, "response data....")
      setUsers(response.data);
      setLoading(false);
    } else {
      return swal("Failed", response.message, "error");
    }
  };
  useEffect(() => {
    handlepageLoad();
  }, []);
//  console.log(users, "users data...................")
  // arrays to push data
  const dataset1 = [];
  const dataset2 = [];

  // useEffect(() => {
  // if(users){
  //   const {rows} = users;
  //   // console.log(rows,'rows...')
  //   rows.map(i=>dataset1.push(i.score))
  //   rows.map(i=>dataset2.push(i.createdAt))
  //   setScores(dataset1)
  //   setDayWise(dataset2)
  // }}, [users]);

  useEffect(() => {
    if (users) {
      const { rows } = users;
      const dateFormat = 'dd MMM yyyy'; // format string for date
      rows.forEach((i) => {
        dataset1.push(i.score);
        dataset2.push(format(new Date(i.createdAt), dateFormat)); // format date string and push to dataset2 array
      });
      setScores(dataset1);
      setDayWise(dataset2);
    }

    	//filter function
	var filterArray = daywise.filter(function (num)
	{
		 return num.daywise === daywise ;
	}
	  );
	 console.log(filterArray, "filter array");

    //average function
  var sum = 0;
  for (var number of dataset1) {
    sum += number;
  }
  let average = sum / dataset1.length;

  console.log("average " + average);
  }, [users]);
  
console.log(scores,"scores")
// console.log(daywise, "daywise data")

// if(users) {
//   for(const val of users) {
//     console.log(val,"val...........")
//     dataset1.push(val.score);
//     // dataset2.push(val.createdAt)
//     console.log(dataset1, "dataset1 array...");
    
//     //console.log(dataset1.testStatus, "dataset1 teststatus")
//   }
// } 

  //calculating average
  // const arr1 = [10, 22, 33, 45, 57];
  

  // use effect
  
  // console.log("set-users", users);
  //   console.log("dataset1 scores",dataset1.score)

  // arrays to push data
  // const dataset1 = [];
  // const dataset2 = [];

  // for (const val of users) {
  //   dataset1.push(val.result);
    // console.log(dataset1, "dataset1 array...");
    
    // console.log(dataset1.testStatus, "dataset1 teststatus")
  // }

//   dataset1.forEach(
// 	nums=>{
// 		console.log("Score "+nums.score , "testStatus "+nums.testStatus)
// 	}
//    )
  const state = {
 
    series: [
      {
        name: "",
        data: scores
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
        categories:daywise,
        labels: {
          style: {
            colors: "#3E4954",
            fontSize: "14px",
            fontFamily: "Poppins",
            fontWeight: 200,
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
        height={500}
      />
    </div>
  );
};
export default LearningActivityChart;
