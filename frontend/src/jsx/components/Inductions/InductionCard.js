import React,{useEffect, useState, useMemo, useLayoutEffect}  from 'react';
import {Link} from 'react-router-dom';
import ModalVideo from 'react-modal-video'
import {Tab, Nav, Accordion} from 'react-bootstrap';
import 'react-modal-video/css/modal-video.min.css';

import {AboutTabContent} from '../Courses/CourseDetail1'; 
import videoimg from    './../../../images/courses/video-img.jpg';
import pic3 from        './../../../images/courses/pic3.jpg';
import pic4 from        './../../../images/courses/pic4.jpg';

const reviewsData = [
	{image: pic3, title:'Jordan Nico ', commentTime:'2 Month Ago',},
	{image: pic4, title:'Cahaya Hikari ', commentTime:'3 Month Ago',},
];


const InductionCard =(props)=>{
    const [isOpen, setOpen] = useState(false);
    const [defaultSlide, setDefaultSlide] 	= useState(true);

    useEffect(()=>{
        if(defaultSlide){
            setDefaultSlide(props.currentSlide);
        }
    },[]);

//    console.log("=========");
//     console.log(defaultSlide);
//     console.log("=========");


    //console.log(id);
	return(
	<div className="card-body">
        <div className="course-content d-flex justify-content-between flex-wrap">
            <div>
                <h3>Here</h3>
                <ul className="d-flex align-items-center raiting my-0 flex-wrap">
                    <li><span className="font-w500">5.0</span><i className="fas fa-star text-orange ms-2"></i>
                    </li>
                    <li>Review (1k)</li>
                    <li>10k Students</li>
                </ul>
            </div>
            
        </div>
        <div className="video-img style-1">
            <div className="view-demo">
                
                {defaultSlide.slideContent}
                {/* <img src={videoimg} alt="" />
                <div className="play-button text-center">
                    <Link to={'#'} className="popup-youtube" onClick={()=> setOpen(true)}>
                        <svg width="96" height="96" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M16.6154 0C7.41046 0 0 7.41043 0 16.6154V55.3846C0 64.5896 7.41046 72 16.6154 72H55.3846C64.5895 72 72 64.5896 72 55.3846V16.6154C72 7.41043 64.5895 0 55.3846 0H16.6154ZM26.259 19.3846C26.5876 19.3728 26.9098 19.4783 27.1677 19.6821L46.5523 34.9129C47.2551 35.4672 47.2551 36.5328 46.5523 37.0871C40.0921 42.1633 33.6278 47.2366 27.1677 52.3125C26.2575 53.034 24.9168 52.3814 24.9231 51.22V20.7692C24.9226 20.0233 25.5135 19.4141 26.259 19.3846Z" fill="white"/>
                        </svg>
                    </Link>
                </div>	 */}
            </div>	
        </div>
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
	)
}

export default InductionCard;
