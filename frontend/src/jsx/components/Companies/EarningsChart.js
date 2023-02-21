import React from "react";
import ReactApexChart from "react-apexcharts";

class EarningsChart extends React.Component {
	constructor(props) {
		super(props);

		const data = [
			{
				id:1 ,score: 25, days: "01-02-2023"
			},
			{
				id:2, score: 5, days: "01-02-2023"
			},
			{
				id:3 ,score: 15, days: "01-02-2023"
			},
			{
				id:4 ,score: 15, days: "01-02-2023"
			},
			{
				id:5, score: 10, days: "01-02-2023"
			},
			{
				id:6 ,score: 35, days: "02-02-2023"
			},
			{
				id:7 ,score: 35, days: "02-02-2023"
			},
			{
				id:8, score: 10, days: "02-02-2023"
			},
			{
				id:9 ,score: 15, days: "03-02-2023"
			},
			{
				id:10 ,score: 25, days: "03-02-2023"
			},
			{
				id:11 ,score: 35, days: "03-02-2023"
			},
			{
				id:12 ,score: 10, days: "04-02-2023"
			},
			{
				id:13 ,score: 20, days: "04-02-2023"
			}
	]

	const arr = [{score: 25, days: "01-02-2023"},{score: 10, days: "02-02-2023"},{score: 35, days: "03-02-2023"},{score: 25, days: "04-02-2023"},{score: 15, days: "05-02-2023"},{score: 5, days: "06-02-2023"},{score: 10, days: "07-02-2023"}];

	//filter function
	var filterArray = data.filter(function (num)
	{
		 return num.days == '01-02-2023' ;
	}
	  );
	 console.log(filterArray);


  // get scores of all objects
     data.forEach(
	  nums=>{
		  console.log("Score "+nums.score , "date "+nums.days)
	  }
     )

       //average function
        const arr1 = [10, 22, 33, 45, 57];
        var sum = 0;
        for(var number of arr1){
	    sum += number
       }

        let average = sum/arr1.length
         console.log("average "+average)
		// const arr = [40, 55, 15, 50, 70, 50, 30]
		this.state = {
			series: [{
				name: 'Average Score',
				data: arr.map(i=>i.score)
			}],
			
			options:{
				chart:{
					type: 'bar',
					height: 350,
					stacked: true,
					toolbar: {
						show: false,
					}
				},
				plotOptions: {
					bar: {
						horizontal: false,
						columnWidth: '60%',
						
						endingShape: "rounded",
						startingShape: "rounded",
						backgroundRadius: 10,
						colors: {
							backgroundBarColor: '#fff',
							backgroundBarOpacity: 1,
							backgroundBarRadius: 10,
						},
					},
					
				},
				stroke:{
					width:8,
					colors:["#fff"]
				},
				colors:['#FEC64F', 'var(--secondary)', '#DBDBDB'],
				xaxis: {
					show: true,
					axisBorder: {
						show: false,
					},
					
					labels: {
						style: {
							colors: '#828282',
							fontSize: '14px',
							fontFamily: 'Poppins',
							fontWeight: 'light',
							cssClass: 'apexcharts-xaxis-label',
						},
					},
					crosshairs: {
						show: false,
					},
					
					categories: arr.map(i=>i.days),
				},
				yaxis: {
					show: true,
					labels: {
						style: {
							colors: '#828282',
							fontSize: '14px',
							fontFamily: 'Poppins',
							fontWeight: 'light',
							cssClass: 'apexcharts-xaxis-label',
						},
					},
				},
				grid: {
					show: true,
					borderColor: '#DBDBDB',
					strokeDashArray: 10,
					position: 'back',
					xaxis: {
						lines: {
							show: false
						}
					},   
					yaxis: {
						lines: {
							show: true
						}
					},  
				},
				toolbar: {
					enabled: false,
				},
				dataLabels: {
				  enabled: false
				},
				legend: {
					show:false
				},
				fill: {
					opacity: 1
				},
				responsive: [{
					breakpoint: 1601,
					options: {
						plotOptions: {
							bar: {
								columnWidth: '60%',
							},
							
						},
					},
				}]
			},					
		};
	}

	render() {
		return (
			<div id="columnChart">
				<ReactApexChart
				  options={this.state.options}
				  series={this.state.series}
				  type="bar"
				  height={350} 
				/>
			</div>
		);
	}
}

export default EarningsChart;