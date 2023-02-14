import React,{useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import {Sparklines, SparklinesLine} from "react-sparklines";
import { Pie } from "react-chartjs-2";



import DropDownBlog from './../Dashboard/DropDownBlog';
//import TotalStudentsChart from './Instructor/TotalStudentsChart';
//import EarningsChart from './Instructor/EarningsChart';
import WorkingActivityChart from './Instructor/WorkingActivityChart';
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

 const [scoreData, setScoreData]=useState();
 const [testID, setTestID]=useState();

 
 
 //score of students
 const  handlepageScore = async (e) =>{
	const response = await fetch ("http://localhost:8081/api/users/inductions/" + testID,{
	 method:"GET", 
	 headers:{
	   "Content-Type": "application/json",
	   "x-access-token" : token,
	 },
	})
	const result = await response.json();
	const {data} = result;
	setScoreData(data);
  }
  useEffect(() => {
	if(loading){
		handlepageScore();
	}},[]);

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
		<div>
		
		
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
                        {/* <small>80% Increase in 20 Days</small> */}
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
                         {/* <small>76% Increase in 20 Days</small> */}
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
			
		</div>
	)
}
export default InstructorDashboard;


// <div id="DZ_W_TimeLine11" className="widget-timeline">
// 							// 	<h4 className="mb-3 mt-4">Upcoming Events</h4>								
// 							// 	<UpComingEvent />
// 							// 	<UpComingEvent />
// 							// </div>


// <div className="col-xl-4 col-xxl-12 col-sm-12">
// 							<div className="card">
// 								<div className="card-header border-0 pb-0">
// 									<h4>Earnings</h4>
// 								</div>
// 								<div className="card-body pt-0 px-3">
// 									<EarningsChart />
									
// 									<div className="px-3">
// 										<h4 className="mb-2">$45,741</h4>
// 										<span>+15%
// 											<svg className="ms-3" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
// 											<path d="M23.25 12C23.25 5.775 18.225 0.75 12 0.75C5.775 0.749999 0.75 5.775 0.75 12C0.749999 18.225 5.775 23.25 12 23.25C18.225 23.25 23.25 18.225 23.25 12ZM11.25 16.575L11.25 9.675L9.3 11.4C8.85 11.775 8.25 11.7 7.875 11.325C7.725 11.1 7.65 10.875 7.65 10.65C7.65 10.35 7.8 10.05 8.025 9.9L11.625 6.75C11.7 6.675 11.775 6.675 11.85 6.6C11.925 6.6 11.925 6.6 12 6.525C12.075 6.525 12.075 6.525 12.15 6.525L12.225 6.525C12.3 6.525 12.3 6.525 12.375 6.525L12.45 6.525C12.525 6.525 12.525 6.525 12.6 6.6C12.6 6.6 12.675 6.6 12.675 6.675L12.75 6.75C12.75 6.75 12.75 6.75 12.825 6.825L15.975 10.05C16.35 10.425 16.35 11.1 15.975 11.475C15.6 11.85 14.925 11.85 14.55 11.475L13.125 9.975L13.125 16.65C13.125 17.175 12.675 17.7 12.075 17.7C11.7 17.55 11.25 17.1 11.25 16.575Z" fill="#4CBC9A"/>
// 											</svg>
// 										</span>
// 									</div>
// 								</div>
// 							</div>
// 						</div>