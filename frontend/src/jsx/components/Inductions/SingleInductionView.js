import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useLayoutEffect,
} from "react";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";

import { Button, Dropdown, Modal } from "react-bootstrap";

import "react-modal-video/css/modal-video.min.css";
import CurrentSlide from "./components/CurrentSlide";
import InductionSlidesList from "./components/InductionSlidesList";
import InductionTitle from "./components/InductionTitle";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";
import UpdatePassPercentage from "../Modals/UpdatePassPercentage";

import { getInduction } from "../APIs";
import SideBar from "../../layouts/nav/SideBar";

const getInductionDetailById = async (id, token) => {
  return await fetch("http://localhost:8081/api/induction/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token" : token
    },
  })
    .then((data) => data.json())
    .then((data) => {
      return data;
    });
};

const SingleInductionView = (props) => {
  const [loading, setLoading] = useState(true);
  const [inductionData, setInductionData] = useState();
  const [slideData, setSlideData] = useState();
  const [passingMarksPop, setPassingMarksPop] = useState();
  const location= useLocation();

  const [currentSlideContent, setCurrentSlideContent] = useState(null);
  const [isChangeContent, setIsChangeContent] = useState(false);
  const token = useSelector((state) => state.auth.auth.token);
  const role = useSelector((state) => state.auth.auth.role);
  const { id } = useParams();

  const [clickedOutside, setClickedOutside] = useState(false);
  const myRef = useRef();

  const handleClickOutside = (e) => {
    e.preventDefault();

    console.log("outside");
    if (!myRef.current.contains(e.target)) {
      setClickedOutside(true);
    }
  };

  const handleClickInside = () => {
    console.log("inside");
    setClickedOutside(false);
  };

  const handleFullScreen = () => {
    const elem = document.documentElement;
  
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      elem.requestFullscreen();
    }
  };



  // API call for fetching all induction details with slides
  const handleGetInductionDetail = async (e) => {
   
    // getInduction
    const response = await getInduction(id, token);


    if ("status" in response && response.status == true) {
      setInductionData(response.data);
      setSlideData(response.slides);
      setCurrentSlideContent(response.slides[0]);
      setLoading(false);
      handleFullScreen();
    
    }
  };

  const openPopUp= () => {
    //console.log("openPopUp called");
    setPassingMarksPop(true);
    return;
  }

  const hidePopUp = () =>{
    //console.log("hidePopUp called");
    setPassingMarksPop(false);
  }


  const setStateOfParent = (newSlide) => {
    setIsChangeContent(true);
    setCurrentSlideContent(newSlide);
    return;
  };

  // On every render
  useEffect(() => {
    if (loading) {
      handleGetInductionDetail();
    }
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => document.removeEventListener("mousedown", handleClickOutside);
    
 
  }, [loading,props.setShowSidebar]);

  const PageContent = loading ? (
    <i className="fas fa-atom fa-spin"></i>
  ) : (
    <>
      <ol className="breadcrumb">
        <li className="breadcrumb-item active">
          {/* <Link className="d-flex align-self-center" to={"../inductions"}>
            <svg
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.99981 12C8.99905 11.8684 9.02428 11.7379 9.07404 11.6161C9.12381 11.4942 9.19713 11.3834 9.28981 11.29L13.2898 7.28999C13.4781 7.10168 13.7335 6.9959 13.9998 6.9959C14.2661 6.9959 14.5215 7.10168 14.7098 7.28999C14.8981 7.47829 15.0039 7.73369 15.0039 7.99999C15.0039 8.26629 14.8981 8.52168 14.7098 8.70999L11.4098 12L14.6998 15.29C14.8636 15.4813 14.9492 15.7274 14.9395 15.979C14.9298 16.2307 14.8255 16.4695 14.6474 16.6475C14.4693 16.8256 14.2305 16.93 13.9789 16.9397C13.7272 16.9494 13.4811 16.8638 13.2898 16.7L9.28981 12.7C9.10507 12.5137 9.00092 12.2623 8.99981 12Z"
                fill="#374557"
              />
            </svg>
            Back
          </Link> */}
        </li>
      </ol>

      <div className="col-xl-8 col-xxl-7">
        <div className="card">
          <div className="card-body">
            {/* induction title and stats */}
            <InductionTitle title={inductionData.title} />

            {/* Slide content area and onclick changeable */}

            <CurrentSlide currentSlideContent={currentSlideContent} 
            />

            {/* About Induction Area with tabs */}
          </div>
        </div>
      </div>

      {/* <div className="col-xl-8 col-xxl-7">
        <div className="card">
          <div className="card-body">
               <Link className="d-flex align-self-center" to={"../mcq"}>MCQ</Link>
          </div>
        </div>
      </div> */}

          


        <div className="col-xl-4 col-xxl-5">
        
        <InductionSlidesList
          setStateOfParent={setStateOfParent}
          setCurrentSlideContent={setCurrentSlideContent}
          slides={slideData}
          inductionID={id}
        />

        { (role === 'instructor') ? <>
        <div className="accordion accordion">
          <div class="card accordion-item">
            <button type="button" class="btn btn-primary m-3" 
              onClick={() => openPopUp() }>Set Passing Percentage</button>
          </div>
        </div>

        <UpdatePassPercentage inductionID={id} passPercentage={inductionData.passPercentage} show={passingMarksPop} hidePopUp={hidePopUp} />
        </>
        : null }
      </div>

      


      
    </>
  );

  return <div className="row">
    {PageContent}
    </div>;
};

export default SingleInductionView;
