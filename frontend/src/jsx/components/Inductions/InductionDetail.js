import React,{useEffect, useState, useMemo, useLayoutEffect}  from 'react';
import { useParams } from 'react-router';
import {Link} from 'react-router-dom';
import ModalVideo from 'react-modal-video'
import {Tab, Nav, Accordion} from 'react-bootstrap';
import 'react-modal-video/css/modal-video.min.css';

import {AboutTabContent} from '../Courses/CourseDetail1'; 

import InductionCard from './InductionCard';
import SlidesCard from './SlidesCard';

import CurrentSlideView from './components/CurrentSlide';
import SlideListView from './components/InductionSlidesList';




const InductionDetail =()=> {
	const [isOpen, setOpen] = useState(false);
	const [activeDefault, setActiveDefault] = useState(0);
	const { id } = useParams();
	const [inductionData, setInductionData] = useState({});
	const [slideData, setSlideData] 		= useState(null);
	
	const [getHTMLString, setGetHTMLString] = useState(null);
	const [slideContent, setSlideContent] 	= useState(null);
	const [loading, setLoading] = useState(true);
	const [currentSlide, setCurrentSlide] = useState();

	// API call 
	const getInductionSlidesById =  async () =>{
		return await fetch('http://localhost:8081/api/slides/'+id, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(data => data.json())
			.then((slides)=>{
				return slides
			});
	}

	const handleGetInduction =  async (e) => {
		const  response =  await getInductionSlidesById();
		if('status' in response && response.status== true){
			setSlideData(response.data);
			setCurrentSlide(response.data[0]);
			setLoading(false);
		}
	}
	
	// On every render
	useEffect(()=>{
		if(loading){
			handleGetInduction();
		}else{
			console.log(slideData);
			console.log("use effect called due to loading true");
			console.log(currentSlide);
		}
		
	},[]);

	const  createMarkup = (theExactHtmlWithTag) => {
        return { __html: theExactHtmlWithTag };
    }

	const PageContent = loading ? <i className="fas fa-atom fa-spin"></i> :  <>
			<div className="col-xl-8 col-xxl-7"> 
				<div className="card"> 
					<InductionCard id={id} slides={slideData} currentSlide={currentSlide}/> 
				</div>
			</div>
			<div className="col-xl-4 col-xxl-5">
				<SlidesCard slides={slideData}></SlidesCard>
			</div>
		</>;






	return(
		<>
			<div className="row">
				{PageContent}
			</div>
		</>
	)
}
export default InductionDetail;