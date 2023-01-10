import React,{useState}  from 'react';
import {Link} from 'react-router-dom';
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import {Dropdown} from 'react-bootstrap';
import DropDownBlog  from './DropDownBlog';

import DonutChart from './Dashboard/DonutChart';
//import ProfileActivityChart from './Dashboard/ProfileActivityChart';

//images
import pic2 from './../../../images/courses/pic2.jpg';
import cup from './../../../images/svg/cup.svg';
import puzzle from './../../../images/svg/puzzle.svg';
import planet from './../../../images/svg/planet.svg';
import skill from './../../../images/svg/skill.svg';
import readingtime from './../../../images/svg/readingtime.svg';
import certificate from './../../../images/svg/degree-certificate.svg';
import clock from './../../../images/svg/clock-1.svg';

const ProfileActivityChart = loadable(() =>
	pMinDelay(import("./Dashboard/ProfileActivityChart"), 1000)
);

const WidgetBlog = ({changeImage, title}) =>{
	return(
		<>
			<div className="col-xl-6 col-lg-6 col-sm-6">
				<div className="card profile-widget">
					<div className="card-body">
						<div className="widget-courses align-items-center d-flex justify-content-between style-1 flex-wrap">
							<div className="d-flex">
								<img src={changeImage}  alt="" />
								<div className="ms-4">
									<h4>100</h4>
									<span>{title}</span>
								</div>	
							</div>	
							<Link to={"./courses"}><i className="las la-angle-right text-primary"></i></Link>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

const CurrentCourse = ({bg1, changeClass, title, percent, numb1, numb2}) => {
	return(
		<>
			<div className="col-xl-6 col-sm-6">
				<div className="card">
					<div className="card-body">	
						<div className="students1">
							<div className="d-inline-block position-relative donut-chart-sale me-4">
								<DonutChart className="donut1" value={percent} backgroundColor={bg1}
									backgroundColor2= "rgba(245, 245, 245, 1)"
								/>
								<small className={changeClass} >{percent}%</small>
							</div>
							<div className="">
								<span>Class</span>
								<h4 className="fs-18 mb-3">{title}</h4>
								<span>Total Courses</span>	
								<h5 className="fs-18">{numb1} / {numb2}</h5>								
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
} 

const Profile = () =>{
	const [dropSelect, setDropSelect] = useState('This Month');


	
	return(
		<>
			<div className="row">
				<div className="col-xl-4 col-xxl-5 col-lg-12">
					<div className="card instructors-box">
						<div className="card-header border-0">
							<DropDownBlog />
						</div>
						<div className="card-body text-center pb-3">
							<div className="instructors-media">
								<img src={pic2}  alt="" />
								<div className="instructors-media-info mt-4">
									<h4 className="mb-1">Nella Vita</h4>
									<span className="fs-18">Member Since 2020</span>
									<div className="d-flex justify-content-center my-3 mt-4">
										<div className="info-box text-start style-1">
											<span>Points</span>
											<h4>2300</h4>
										</div>
										<div className="info-box text-start style-1">
											<span>Certificate</span>
											<h4>50</h4>
										</div>
									</div>
								</div>
							</div>
							<div className="achievements ">
								<h4 className="text-start mb-3">Achievements</h4>
								<div className="achievements-content flex-wrap">
									<span><img src={cup}  alt=""/></span>
									<span><img src={puzzle} alt="" /></span>
									<span><img src={planet} alt="" /></span>
									<span><img src={skill} alt="" /></span>
									<span><img src={readingtime} alt="" /></span>
								</div>	
							</div>
							<div className="bio text-start my-4">
								<h4 className="mb-3">Bio</h4>
								<div className="bio-content">
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
									<p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-xl-8 col-xxl-7 col-lg-12 ">
					<div className="row">
						<WidgetBlog changeImage={certificate}  title='Completed'  />
						<WidgetBlog changeImage={clock}  title='Progress'  />						
						<div className="widget-heading d-flex justify-content-between align-items-center">
							<h3 className="m-0">Current Courses</h3>
							<Link to={"./courses"} className="btn btn-primary btn-sm">View all</Link>
						</div>
						<CurrentCourse changeclassName="text-secondary"
							bg1="rgba(76, 188, 154, 1)"  title='UI Design Beginner' percent='80'  numb1='90' numb2='110' 
						/>
						<CurrentCourse changeclassName="text-warning"
							bg1='rgba(254, 198, 79, 1)' title='UX Research' percent='62' numb1='50' numb2='80'  
						/>
						
						<div className="col-xl-12">
							<div className="card score-active style-1">
								<div className="card-header border-0 pb-2 flex-wrap">
									<h4 className="me-4">Score Activity</h4>
									<ul className="d-flex mb-2">
										<li>
											<svg className="me-2" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
											<rect x="1.5" y="1.5" width="9" height="9" rx="4.5" fill="white" stroke="#FEC64F" strokeWidth="3"/>
											</svg>
											Last Month
										</li>
										<li>
											<svg className="me-2" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
											<rect x="1.5" y="1.5" width="9" height="9" rx="4.5" fill="white" stroke="#4CBC9A" strokeWidth="3"/>
											</svg>
											Last Month
										</li>
									</ul>
									<div className="d-flex align-items-center">
										<Dropdown className='select-dropdown me-2'>
											<Dropdown.Toggle as='div' className='i-false dashboard-select  selectBtn btn-dark'>{dropSelect} <i className="fa-solid fa-angle-down ms-2" /></Dropdown.Toggle>
											<Dropdown.Menu>
												<Dropdown.Item onClick={()=>setDropSelect("This Month")}>This Month</Dropdown.Item>
												<Dropdown.Item onClick={()=>setDropSelect("This Weekly")}>This Weekly</Dropdown.Item>
												<Dropdown.Item onClick={()=>setDropSelect("This Day")}>This Day</Dropdown.Item>
											</Dropdown.Menu>
										</Dropdown>
										<DropDownBlog />
									</div>
								</div>
								<div className="card-body pb-1 custome-tooltip pt-0">
									<ProfileActivityChart />
								</div>
							</div>
						</div>
					</div>
				</div>
				
			</div>	
		</>
	)
}
export default Profile;