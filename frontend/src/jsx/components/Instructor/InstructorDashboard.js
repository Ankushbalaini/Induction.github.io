import React,{useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import {Sparklines, SparklinesLine} from "react-sparklines";

import DropDownBlog from './../Dashboard/DropDownBlog';
//import TotalStudentsChart from './Instructor/TotalStudentsChart';
//import EarningsChart from './Instructor/EarningsChart';
//import WorkingActivityChart from './Instructor/WorkingActivityChart';
import CalendarBlog from './../Dashboard/Dashboard/CalendarBlog';
import { useSelector } from 'react-redux';


// const TotalStudentsChart = loadable(() =>
// 	pMinDelay(import("./Instructor/TotalStudentsChart"), 1000)
// );
// const EarningsChart = loadable(() =>
// 	pMinDelay(import("./Instructor/EarningsChart"), 1000)
// );
// const WorkingActivityChart = loadable(() =>
// 	pMinDelay(import("./Instructor/WorkingActivityChart"), 1000)
// );

// const sampleData = [4,7,4,9,5,6,8,4,2,4,5,6];

// const timelineBlog = [
// 	{title:'Introduction Wireframe', change:'bg-primary'},
// 	{title:'Basic React', change:'bg-secondary'},
// 	{title:'Basic Js', change:'bg-warning'},
// ];

// function UpComingEvent(){
// 	return(
// 		<>
// 			<div className="d-flex justify-content-between side-border">
// 				<h4 className="mb-0 fs-18 font-w500">5 Jan</h4>
// 				<div className="dropdown custom-dropdown mb-0">
// 					<DropDownBlog />
// 				</div>
// 			</div>
// 			<ul className="timeline-active style-4">
// 				{timelineBlog.map((data, ind)=>(
// 					<li className="d-flex align-items-center" key={ind}>
// 						<span className="time-1">08.00 AM</span>
// 						<div className="panel">
// 							<div className={`line-color ${data.change}`}></div>
// 							<Link to={"#"} className="timeline-panel text-muted">
// 								<span className="d-block">UI Design</span>
// 								<h4 className="mb-0">{data.title}</h4>
// 							</Link>
// 						</div>	
// 					</li>
// 				))}				
// 			</ul>
// 		</>
// 	)
// }

const InstructorDashboard = () =>{
 const token = useSelector((state) => state.auth.auth.token);
 const [instructorDB,setInstructorDB]=useState();
 const [loading, setLoading] = useState(true);
 

 const  handlepageLoad = async (e) =>{
   const response = await fetch ("http://localhost:8081/api/dashboard/instructor",{
    method:"GET", 
    headers:{
      "Content-Type": "application/json",
      "x-access-token" : token,
    },
   })
   const result = await response.json();
   const {data} = result;
   setInstructorDB(data);
 }
 
 useEffect(() => {
  if(loading){
    handlepageLoad();
  }},[]);

	return(
		<>
			<div className="row">
			<div className="col-xl-6 col-lg-6 col-xxl-6 col-sm-6">
                 <div className="widget-stat card bg-primary">
                  <div className="card-body  p-4">
                    <div className="media">
                      <span className="me-3">
                        <i className="bi bi-book"></i>
                      </span>
                      <div className="media-body text-white">
                        <p className="mb-1" >Total Inductions</p>
                        <h3 className="text-white">{instructorDB?.totalInductions}</h3>
                        <div className="progress mb-2 bg-secondary">
                          <div
                            className="progress-bar progress-animated bg-light"
                            style={{ width: "80%" }}
                          ></div>
                        </div>
                        <small>80% Increase in 20 Days</small>
                      </div>
                    </div>
                  </div>
                 </div>
                </div>
              
                <div className="col-xl-6 col-lg-6 col-xxl-6 col-sm-6">
                 <div className="widget-stat card bg-secondary">
                   <div className="card-body p-4">
                     <div className="media">
                       <span className="me-3">
                         <i className="bi bi-people"></i>
                       </span>
                       <div className="media-body text-white">
                         <p className="mb-1 font-weight-bold">Total Users</p>
                         <h3 className="text-white">{instructorDB?.totalUsers}</h3>
                         <div className="progress mb-2 bg-primary">
                           <div
                             className="progress-bar progress-animated bg-light"
                             style={{ width: "76%" }}
                           ></div>
                         </div>
                         <small>76% Increase in 20 Days</small>
                       </div>
                     </div>
                   </div>
                 </div>
                </div>

                {/* <div className="col-xl-4 col-lg-4 col-xxl-4 col-sm-4">
                 <div className="widget-stat card bg-danger">
                   <div className="card-body p-4">
                     <div className="media">
                       <span className="me-3">
                         <i className="bi bi-award-fill"></i>
                       </span>
                       <div className="media-body text-white">
                         <p className="mb-1">Total Courses</p>
                         <h3 className="text-white">4/10</h3>
                         <div className="progress mb-2 bg-primary">
                           <div
                             className="progress-bar progress-animated bg-light"
                             style={{ width: "76%" }}
                           ></div>
                         </div>
                         <small>76% Increase in 20 Days</small>
                       </div>
                     </div>
                   </div>
                 </div>
                </div> */}
				
				
			</div>	
		</>
	)
}
export default InstructorDashboard;