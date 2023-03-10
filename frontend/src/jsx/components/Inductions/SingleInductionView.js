import React, {
  useEffect,
  useState,
  useRef,
} from "react";
import { useLocation, useParams } from "react-router";
import Loading from 'react-fullscreen-loading';

import "react-modal-video/css/modal-video.min.css";
import CurrentSlide from "./components/CurrentSlide";
import InductionSlidesList from "./components/InductionSlidesList";
import InductionTitle from "./components/InductionTitle";

import { useSelector } from "react-redux";
import UpdatePassPercentage from "../Modals/UpdatePassPercentage";

import { getInduction } from "../APIs";


const SingleInductionView = (props) => {
  const [loading, setLoading] = useState(true);
  const [inductionData, setInductionData] = useState();
  const [slideData, setSlideData] = useState();
  const [passingMarksPop, setPassingMarksPop] = useState();
  const location = useLocation();

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
      // handleFullScreen();
    }
  };

  const openPopUp = () => {
    //console.log("openPopUp called");
    setPassingMarksPop(true);
    return;
  };

  const hidePopUp = () => {
    //console.log("hidePopUp called");
    setPassingMarksPop(false);
  };

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
  }, [loading, props.setShowSidebar]);

  const PageContent = loading ? (
    <Loading loading background-color="rgba(255, 255, 255, 0.1)" loaderColor="#000000"/>

  ) : (
    <>
      <div className="col-xl-8 col-xxl-7">
        <div className="card">
          <div className="card-body">
            {/* induction title and stats */}
            <InductionTitle title={inductionData.title} />

            {/* Slide content area and onclick changeable */}

            <CurrentSlide currentSlideContent={currentSlideContent} />

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

        {role === "instructor" ? (
          <>
            <div className="accordion accordion">
              <div class="card accordion-item">
                <button
                  type="button"
                  class="btn btn-primary m-3"
                  onClick={() => openPopUp()}
                >
                  Set Passing Percentage
                </button>
              </div>
            </div>

            <UpdatePassPercentage
              inductionID={id}
              passPercentage={inductionData.passPercentage}
              show={passingMarksPop}
              hidePopUp={hidePopUp}
            />
          </>
        ) : null}
      </div>
    </>
  );

  return <div className="row">{PageContent}</div>;
};

export default SingleInductionView;
