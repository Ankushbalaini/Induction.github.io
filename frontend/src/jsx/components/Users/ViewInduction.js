import React, { useEffect, useState, useRef, useStateCallback } from "react";
import { useLocation, useParams } from "react-router";
import "react-modal-video/css/modal-video.min.css";
import CurrentSlide from "../Inductions/components/CurrentSlide";
import InductionSlidesList from "../Inductions/components/InductionSlidesList";
import InductionTitle from "../Inductions/components/InductionTitle";
import { useSelector } from "react-redux";
import { getInduction } from "../APIs";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

const PAGE_CONSTANT = {
  FOCUS_OUT_LIMIT: 3,
  MESSAGE: "",
};

const ViewInduction = (props) => {
  const navigate = useHistory();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [inductionData, setInductionData] = useState();
  const [slideData, setSlideData] = useState();
  const [currentSlideContent, setCurrentSlideContent] = useState(null);
  const [isChangeContent, setIsChangeContent] = useState(false);
  const token = useSelector((state) => state.auth.auth.token);

  const [focusOutCount, setFocusOutCount] = useState(0);

  const handleVisibilityChange = (e) => {
    e.preventDefault();

    if (document.visibilityState === "visible") {
      // console.log('has focus');
    } else {
      if (focusOutCount >= PAGE_CONSTANT.FOCUS_OUT_LIMIT) {
        swal({
          title: "Induction Failed!",
          text: "You are switching tabs frequently.",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            swal("Test Fail. and redirecting you to inductions", {
              icon: "warning",
            }).then(() => {
              setFocusOutCount(0);
              navigate.push("/inductions");
            });
          }
        });
      } else {
        setFocusOutCount((prev) => prev + 1);
      }
      console.log(` ${focusOutCount} - visibility change count `);
    }
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
    const response = await getInduction(id, token);
    if ("status" in response && response.status == true) {
      setInductionData(response.data);
      setSlideData(response.slides);
      setCurrentSlideContent(response.slides[0]);
      setLoading(false);
      handleFullScreen();
    }
  };

  const setStateOfParent = (newSlide) => {
    setIsChangeContent(true);
    setCurrentSlideContent(newSlide);
    return;
  };

  // On every render
  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    if (loading) {
      handleGetInductionDetail();
    }
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [loading, props.setShowSidebar, focusOutCount]);

  const PageContent = loading ? (
    <i className="fas fa-atom fa-spin"></i>
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

      <div className="col-xl-4 col-xxl-5">
        <InductionSlidesList
          setStateOfParent={setStateOfParent}
          setCurrentSlideContent={setCurrentSlideContent}
          slides={slideData}
          inductionID={id}
        />
      </div>
    </>
  );

  return <div className="row">{PageContent}</div>;
};

export default ViewInduction;
