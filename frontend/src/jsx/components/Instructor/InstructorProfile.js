import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DropDownBlog from "../Dashboard/DropDownBlog";
import certificate from "./../../../images/svg/degree-certificate.svg";
import clock from "./../../../images/svg/clock-1.svg";

const WidgetBlog = ({ changeImage, title }) => {
  

  return (
    <>
      <div className="col-xl-6 col-lg-6 col-sm-6">
        <div className="card profile-widget">
          <div className="card-body">
            <div className="widget-courses align-items-center d-flex justify-content-between style-1 flex-wrap">
              <div className="d-flex">
                <img src={changeImage} alt="" />
                <div className="ms-4">
                  <h4>100</h4>
                  <span>{title}</span>
                </div>
              </div>
              <Link to={"./courses"}>
                <i className="las la-angle-right text-primary"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const InstructorProfile = () => {
  return (
    <div className="row">
        <div className="col-xl-4 col-xxl-5 col-lg-12">
          <div className="card instructors-box">
            <div className="card-header border-0">
              <DropDownBlog />
            </div>
            <div className="card-body text-center pb-3">
              <div className="instructors-media">
                <img src="" alt="" />

                <div className="instructors-media-info mt-4">
                  <h4 className="mb-1">Company Name</h4>
                  <span className="fs-18">Member Since 2023</span>
                  <div className="d-flex justify-content-center my-3 mt-4">
                    <div className="info-box text-start style-1">
                      <span>Instructors</span>
                      <h4> 10</h4>
                    </div>
                    <div className="info-box text-start style-1">
                      <span>Inductions</span>
                      <h4>50</h4>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bio text-start my-4">
                <h4 className="mb-3">Bio</h4>
                <div className="bio-content">
                  <p>
                    Lorem LIpsun
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-8 col-xxl-7 col-lg-12 ">
          <div className="row">
            <WidgetBlog changeImage={certificate} title="Completed" />
            <WidgetBlog changeImage={clock} title="Progress" />
            <div className="widget-heading d-flex justify-content-between align-items-center">
              <h3 className="m-0">My Instructors</h3>
              <Link to={"./instructors"} className="btn btn-primary btn-sm">
                View all
              </Link>
            </div>
          </div>
        </div>
      </div>


    
  );
};
export default InstructorProfile;