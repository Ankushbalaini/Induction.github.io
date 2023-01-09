import React,{useEffect, useState, useMemo, useLayoutEffect}  from 'react';
import {Link} from 'react-router-dom';
import ModalVideo from 'react-modal-video'
import {Tab, Nav, Accordion} from 'react-bootstrap';
import 'react-modal-video/css/modal-video.min.css';

import {AboutTabContent} from '../Courses/CourseDetail1'; 
import videoimg from    './../../../images/courses/video-img.jpg';
import pic3 from        './../../../images/courses/pic3.jpg';
import pic4 from        './../../../images/courses/pic4.jpg';


const SmallCardBlog =({title})=>{
	return(
		<div className="acc-courses">
			<div className="d-flex justify-content-between align-items-center">
				<div className="d-flex align-items-center">
					<span className="acc-icon">
					<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M11.3337 6V4.66666C11.3337 2.79999 9.86699 1.33333 8.00033 1.33333C6.13366 1.33333 4.66699 2.79999 4.66699 4.66666V6C3.53366 6 2.66699 6.86666 2.66699 8V12.6667C2.66699 13.8 3.53366 14.6667 4.66699 14.6667H11.3337C12.467 14.6667 13.3337 13.8 13.3337 12.6667V8C13.3337 6.86666 12.467 6 11.3337 6ZM6.00033 4.66666C6.00033 3.53333 6.86699 2.66666 8.00033 2.66666C9.13366 2.66666 10.0003 3.53333 10.0003 4.66666V6H6.00033V4.66666ZM8.66699 11.3333C8.66699 11.7333 8.40033 12 8.00033 12C7.60033 12 7.33366 11.7333 7.33366 11.3333V9.33333C7.33366 8.93333 7.60033 8.66666 8.00033 8.66666C8.40033 8.66666 8.66699 8.93333 8.66699 9.33333V11.3333Z" fill="#374557"/>
					</svg>
					</span>	
					<h4 className="m-0">{title}</h4>
				</div>	
				<span>1:00</span>
			</div>
		</div>
	)
}


const SlidesCard =(props)=>{

    const [currentSlide, setCurrentSlide] = useState();
    const [isOpen, setOpen] = useState(false);

    // uiop
    const changeInductionContent = () =>{
        
        // alert("here");
        // setCurrentSlide({
        //     "_id": "63b693c5b406bafb67e7fedf",
        //     "slideInductionId": "63b6862bc7ac344d83a01bca",
        //     "slideTitle": "Slide 2",
        //     "slideContent": "Slide 2 content",
        //     "createdAt": "2023-01-05T09:09:25.120Z",
        //     "updatedAt": "2023-01-05T09:09:25.120Z",
        //     "__v": 0
        // });
    }
    useEffect(()=>{
        console.log(currentSlide);
    },[]);

    //console.log(id);
	return(
        <div className="custome-accordion">
            <Accordion className="accordion" defaultActiveKey="0">	
                {/* {accordionBlog.map((data,i)=>( */}
                    <Accordion.Item className="card" >
                        <Accordion.Header as="h2" className="accordion-header border-0">
                            <span className="acc-heading">Video Courses</span>
                            <span className="ms-auto">(1/110)</span>
                        </Accordion.Header>    
                        <Accordion.Collapse id="collapseOne" >
                            <div className="accordion-body card-body pt-0">


                            { 
                            props.slides.map((slide, i)=>{
                                return <div className="acc-courses ">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                            <span className="acc-icon">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4 13C3.817 13 3.635 12.95 3.474 12.851C3.32918 12.7611 3.20965 12.6358 3.12671 12.4869C3.04378 12.338 3.00016 12.1704 3 12V4C3 3.653 3.18 3.331 3.474 3.149C3.61914 3.05976 3.7846 3.00891 3.95481 3.00121C4.12502 2.99351 4.29439 3.02923 4.447 3.105L12.447 7.105C12.6131 7.1882 12.7528 7.31599 12.8504 7.47405C12.948 7.63212 12.9997 7.81423 12.9997 8C12.9997 8.18578 12.948 8.36789 12.8504 8.52595C12.7528 8.68402 12.6131 8.8118 12.447 8.895L4.447 12.895C4.307 12.965 4.152 13 4 13Z" fill="var(--primary)"/>
                                                </svg>
                                            </span>	
                                            <h4 className="m-0">{slide.slideTitle}</h4>

                                            <button onClick={changeInductionContent}>Change Induction Content</button>
                                        </div>	
                                        {/* <span>1:00</span> */}
                                    </div>
                                </div>
                            })
                            }
                        

                                {/* <SmallCardBlog title='Getting Started' />
                                <SmallCardBlog title='Tools' />
                                <SmallCardBlog title='Install Tools' />
                                <SmallCardBlog title='Plugins' />	 */}

                            </div>
                        </Accordion.Collapse>	

                    </Accordion.Item>
                    
                {/* ))} */}
            </Accordion>
        </div>	
	)
}

export default SlidesCard;
