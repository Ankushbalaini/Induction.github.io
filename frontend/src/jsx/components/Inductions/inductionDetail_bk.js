import React,{useEffect, useState}  from 'react';
import { useParams } from 'react-router';
import {Link} from 'react-router-dom';
import ModalVideo from 'react-modal-video'
import {Tab, Nav, Accordion} from 'react-bootstrap';
import 'react-modal-video/css/modal-video.min.css';

import {AboutTabContent} from '../Courses/CourseDetail1'; 
import DropDownBlog from './../Dashboard/DropDownBlog';
//Images
import videoimg from './../../../images/courses/video-img.jpg';
import pic3 from './../../../images/courses/pic3.jpg';
import pic4 from './../../../images/courses/pic4.jpg';

const reviewsData = [
	{image: pic3, title:'Jordan Nico ', commentTime:'2 Month Ago',},
	{image: pic4, title:'Cahaya Hikari ', commentTime:'3 Month Ago',},
];


const InductionDetail =()=> {
	const [isOpen, setOpen] = useState(false);
	const [activeDefault, setActiveDefault] = useState(0);
	const { id } = useParams();
	const [inductionData, setInductionData] = useState({});
	const [slideData, setSlideData] 		= useState(null);
	const [getHTMLString, setGetHTMLString] = useState(null);
	const [slideContent, setSlideContent] 	= useState(null);

	const  createMarkup = (theExactHtmlWithTag) => {
        return { __html: theExactHtmlWithTag };
    }

	useEffect(()=>{
		console.log("on every render" );
		const handleGetInduction =  async (e) => {
			const slides = await getAllSlides();
			if('status' in slides && slides.status == true){
				setSlideData(slides.data);
				//setSlideContent("helloooo 1");
				
				//console.log(slides.data);
			}
			const response =  await getInductionById();
			if('status' in response && response.status== true){
				setInductionData(response.data);
				// console.log("here1");
				//console.log(inductionData);
			}
		}
		handleGetInduction();
	},[id]);


	const getInductionById =  async () =>{
		//console.log("called1");
		return fetch('http://localhost:8081/api/induction/'+id, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
			})
			.then(data => data.json()).catch();
	}

	const getAllSlides =  async () =>{
		//console.log("called2");
		return fetch('http://localhost:8081/api/slides/'+id, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
			})
			.then(data =>  data.json() ).catch();
	}

	return(
		<>
			<div className="row">
				
				<div className="col-xl-8 col-xxl-7">
					<div className="card">
						<div className="card-body">
							<div className="course-content d-flex justify-content-between flex-wrap">
								<div>
									<h3>{inductionData.induction_title} 123</h3>
									
								</div>
							</div>
							{/* <div dangerouslySetInnerHTML={ createMarkup( inductionData.induction_content ) } id="slideDataDiv" /> */}

							<div dangerouslySetInnerHTML={ createMarkup( 'no data set' ) } id="slideDataDiv" />


							

							<Tab.Container defaultActiveKey='About'>
								<div className="course-details-tab style-2 mt-4">
									<nav>
										<Nav as='div' className="nav nav-tabs tab-auto" id="nav-tab">
											<Nav.Link as='button' className="nav-link" id="nav-about-tab" eventKey='About' type="button">About</Nav.Link>
											<Nav.Link as='button' className="nav-link" id="nav-reviews-tab" eventKey='Review' type="button">Reviews</Nav.Link>
											<Nav.Link as='button' className="nav-link" id="nav-discussion-tab" eventKey='Discussion' type="button">Discussion</Nav.Link>
										</Nav>
									</nav>
									<Tab.Content className="tab-content" id="nav-tabContent">
										<Tab.Pane  id="nav-about" eventKey='About'>
											<div className="about-content">
												<h4>About This Course</h4>
												<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
												Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
												<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
											</div>
										</Tab.Pane>
										<Tab.Pane eventKey='Review'>
											{reviewsData.map((item, index)=>(
												<div className="user-pic2" key={index}>
													<div className="d-flex align-items-center">
														<img src={item.image} alt="" />
														<div className="ms-3">
															<h4>{item.title}</h4>
															<ul className="d-flex align-items-center raiting my-0 flex-wrap">
																<li><span className="font-w500">5.0</span><i className="fas fa-star star-orange ms-2 me-1"></i>
																	<i className="fas fa-star star-orange me-1"></i>
																	<i className="fas fa-star star-orange me-1"></i>
																	<i className="fas fa-star star-orange me-1"></i>
																	<i className="fas fa-star star-orange"></i>
																</li>
																<li>{item.commentTime}</li>
															</ul>
														</div>
													</div>
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
												</div>
											))}
										</Tab.Pane>
										<Tab.Pane id="nav-discussion" eventKey='Discussion'>
											<div className="about-content">
												<AboutTabContent title='About This Course' />
												<AboutTabContent title="Course’s Objectives" />
											</div>
										</Tab.Pane>
									</Tab.Content>
								</div>
							
							</Tab.Container>
						</div>
					</div>
				</div>







				<div className="col-xl-4 col-xxl-5">
					

					
					<div className="custome-accordion">
						<Accordion className="accordion" defaultActiveKey="0">	

							{/* {accordionBlog.map((data,i)=>( */}
								<Accordion.Item className="card" key={1} eventKey={`${1}`}>
									<Accordion.Header as="h2" className="accordion-header border-0">
										<span className="acc-heading">Induction Slides</span>
										<span className="ms-auto">(1/2)</span>
									</Accordion.Header>    
									<Accordion.Collapse eventKey={`${1}`} id="collapseOne" class="show">
										
										<div className="accordion-body card-body pt-0">

										 { slideData.map((data,i)=>(  
											<div className="acc-courses active" eventKey={`${i}`} onClick={()=>setSlideContent(data.slideContent)}>

												<div className="d-flex justify-content-between align-items-center active">
													<div className="d-flex align-items-center">
													slideContent							<span className="acc-icon">
															<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M4 13C3.817 13 3.635 12.95 3.474 12.851C3.32918 12.7611 3.20965 12.6358 3.12671 12.4869C3.04378 12.338 3.00016 12.1704 3 12V4C3 3.653 3.18 3.331 3.474 3.149C3.61914 3.05976 3.7846 3.00891 3.95481 3.00121C4.12502 2.99351 4.29439 3.02923 4.447 3.105L12.447 7.105C12.6131 7.1882 12.7528 7.31599 12.8504 7.47405C12.948 7.63212 12.9997 7.81423 12.9997 8C12.9997 8.18578 12.948 8.36789 12.8504 8.52595C12.7528 8.68402 12.6131 8.8118 12.447 8.895L4.447 12.895C4.307 12.965 4.152 13 4 13Z" fill="var(--primary)"/>
															</svg>
														</span>	
														<h4 className="m-0">{data.slideTitle}</h4>
													</div>
												</div>
											</div>
											))}  

										</div>
										
									</Accordion.Collapse>



								</Accordion.Item>
								
							{/* ))} */}




						</Accordion>
					</div>						
				</div>


			</div>
			

		</>
	)
}
export default InductionDetail;