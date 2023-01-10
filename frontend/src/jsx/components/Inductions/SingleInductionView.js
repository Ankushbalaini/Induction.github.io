import React,{useEffect, useState, useMemo, useLayoutEffect}  from 'react';
import { useParams } from 'react-router';
import {Link} from 'react-router-dom';
import ModalVideo from 'react-modal-video'
import {Tab, Nav, Accordion} from 'react-bootstrap';
import 'react-modal-video/css/modal-video.min.css';

import {AboutTabContent} from '../Courses/CourseDetail1'; 

import InductionCard from './InductionCard';
import SlidesCard from './SlidesCard';

import CurrentSlide from './components/CurrentSlide';
import InductionSlidesList from './components/InductionSlidesList';
import InductionTitle from './components/InductionTitle';


const getInductionDetailById =  async (id) =>{
    return await fetch('http://localhost:8081/api/induction/'+id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(data => data.json())
    .then((data)=>{
        return data;
    });
}


const SingleInductionView =(props)=> {
    const [loading, setLoading] = useState(true);
    const [inductionData, setInductionData] = useState();
    const [slideData, setSlideData] = useState();
    const [currentSlideContent,setCurrentSlideContent] = useState(null);
    const [isChangeContent, setIsChangeContent]= useState(false);

    const { id } = useParams();

    // API call for fetching all induction details with slides
    const handleGetInductionDetail =  async (e) => {
        const  response =  await getInductionDetailById(id);
        if('status' in response && response.status== true){
            setInductionData(response.data);
            setSlideData(response.slides);
            setCurrentSlideContent(response.slides[0]);
            setLoading(false);
        }
    }

    const setStateOfParent = (newSlide) =>{
        setIsChangeContent(true);
        setCurrentSlideContent(newSlide);
        return;
    }

    // On every render
    useEffect(()=>{

        if(loading){
            handleGetInductionDetail();
        }else{

            //console.log(currentSlideContent);
            //console.log(slideData);
            //console.log("use effect called due to loading true");
            //console.log(inductionData);
        }


        if(props.isChangeContent){
            console.log("Content changed");
        }else{
            console.log("content not changed");
        }

    },[]);

    const PageContent = loading ? <i className="fas fa-atom fa-spin"></i> :  
    <>
        <div className="col-xl-8 col-xxl-7"> 
            <div className="card"> 
                <div className="card-body">
                    {/* induction title and stats */}
                    <InductionTitle title={inductionData.induction_title} />

                    {/* Slide content area and onclick changeable */}

                    <CurrentSlide currentSlideContent={currentSlideContent} />
                    
                    {/* About Induction Area with tabs */}

                    
                
                </div>
            </div>
        </div>


        <div className="col-xl-4 col-xxl-5">
            <InductionSlidesList setStateOfParent={setStateOfParent} setCurrentSlideContent={setCurrentSlideContent} slides={slideData} />
        </div>
			
	</>;



return (
    <div className="row">
    {PageContent}
    </div>
);

}

export default SingleInductionView;
