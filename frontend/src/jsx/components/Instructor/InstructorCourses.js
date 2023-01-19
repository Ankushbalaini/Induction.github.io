import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {Tab, Nav} from 'react-bootstrap';

import DropDownBlog from './../Dashboard/DropDownBlog';

import pic2 from './../../../images/courses/pic2.jpg';
import pic3 from './../../../images/courses/pic3.jpg';
import pic4 from './../../../images/courses/pic4.jpg';




const widgetBlog = [
	{changeClass:'bg-primary', percent:'75', title:'Courses', svgBlog:'', number:'23,940', redirectLink:'./courses'},
	{changeClass:'bg-warning', percent:'90', title:'Users', svgBlog:'', number:'94,230', redirectLink:'./students'},
	{changeClass:'bg-secondary', percent:'60', title:'Review', svgBlog:'', number:'32,567',redirectLink:'./'},
];
const sliderData = [
	{image:pic2},
	{image:pic3},
	{image:pic4},
];



const InstructorCourses = () =>{
	return(
		<>
			<div className="row">
				<div className="col-xl-9 col-xxl-8">
					<div className="row">
						
						{widgetBlog.map((item, ind)=>(
							<div className="col-xl-4 col-xxl-6 col-sm-6" key={ind}>
								<div className= {`card  widget-courses style-2 ${item.changeClass}`}>
									<div className="card-body">
										<div className="align-items-center d-flex justify-content-between flex-wrap">
											<div className="d-flex">
												<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M42.4001 36.2001C41.0001 36 39.6001 35.8 38.0001 35.8C33.0001 35.8 28.2001 37.2001 24.0001 40C19.8001 37.4001 15.0001 35.8 10.0001 35.8C8.60009 35.8 7.00009 36 5.60009 36.2001C4.60009 36.4001 3.80009 37.4 4.00009 38.6C4.20009 39.8 5.20009 40.4001 6.40009 40.2001C7.60009 40 8.80009 39.8 10.0001 39.8C14.6001 39.8 19.0001 41.2001 22.8001 44C23.4001 44.6 24.4001 44.6 25.2001 44C30.0001 40.6 36.0001 39.2001 41.6001 40.2001C42.6001 40.4001 43.8001 39.6 44.0001 38.6C44.2001 37.4 43.4001 36.4001 42.4001 36.2001ZM42.4001 4.20005C41.0001 4.00005 39.6001 3.80005 38.0001 3.80005C33.0001 3.80005 28.2001 5.20005 24.0001 8.00005C19.8001 5.20005 15.0001 3.80005 10.0001 3.80005C8.60009 3.80005 7.00009 4.00005 5.60009 4.20005C4.80009 4.20005 4.00009 5.20005 4.00009 6.00005V30C4.00009 31.2001 4.80009 32 6.00009 32C6.20009 32 6.20009 32 6.40009 32C7.60009 31.8 8.80009 31.6 10.0001 31.6C14.6001 31.6 19.0001 33 22.8001 35.8C23.4001 36.4 24.4001 36.4 25.2001 35.8C30.0001 32.4 36.0001 31 41.6001 32C42.6001 32.2001 43.8001 31.4 44.0001 30.4C44.0001 30.2 44.0001 30.2001 44.0001 30V6.00005C44.0001 5.20005 43.2001 4.20005 42.4001 4.20005Z" fill="white"/>
												</svg>
												<div className="ms-4">
													<Link to={`${item.redirectLink}`}><h4 className="fs-18 font-w700">{item.number}</h4></Link>
													
													<span>{item.title}</span>
												</div>	
											</div>	
											<div className="d-inline-block position-relative donut-chart-sale">
												{/* <DonutChart className="donut1" value={item.percent} backgroundColor="rgba(255, 255, 255, 1)"
													backgroundColor2= "rgba(255, 255, 255, 0.1)"
												/> */}
											</div>
										</div>
									</div>
								</div>
							</div>
						))}


						<div className="col-xl-12">
							<h4 className="mb-3">User Reviews</h4>
							<Swiper className="swiper front-view-slider"
								speed= {1500}					
								slidesPerView= {3}
								spaceBetween= {20}
								loop={false}
								breakpoints = {{
									1600: {
										slidesPerView: 3,
									},
									
									1200: {
										slidesPerView: 2,
									},
									575: {
										slidesPerView: 2,
									},
									360: {
										slidesPerView: 1,
									},
								}}
							>	
								{sliderData.map((d,i)=>(
									<SwiperSlide key={i}>											
										<div className="review-box card">											
											<div className="d-flex align-items-center">
												<img src={d.image} alt="" />
												<div className="ms-3">
													<h4 className="mb-0 fs-18 font-w500">Karen Hope</h4>
													<ul className="d-flex align-items-center raiting my-0">
														<li><i className="fas fa-star star-orange me-1"></i>
															<i className="fas fa-star star-orange me-1"></i>
															<i className="fas fa-star star-orange me-1"></i>
															<i className="fas fa-star star-orange me-1"></i>
															<i className="fas fa-star star-orange"></i>
														</li>
													</ul>
												</div>
											</div>
											<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</p>											
										</div>										
									</SwiperSlide>
								))}				
							</Swiper>									
						</div>								
					</div>
				</div>
				
				
				
			</div>
					
		</>
		
	)
}
export default InstructorCourses;