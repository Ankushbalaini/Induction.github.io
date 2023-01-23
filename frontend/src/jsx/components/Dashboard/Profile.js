import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import DropDownBlog from "./DropDownBlog";

import DonutChart from "./Dashboard/DonutChart";
//import ProfileActivityChart from './Dashboard/ProfileActivityChart';

//images
import pic2 from "./../../../images/courses/pic2.jpg";
import cup from "./../../../images/svg/cup.svg";
import puzzle from "./../../../images/svg/puzzle.svg";
import planet from "./../../../images/svg/planet.svg";
import skill from "./../../../images/svg/skill.svg";
import readingtime from "./../../../images/svg/readingtime.svg";
import certificate from "./../../../images/svg/degree-certificate.svg";
import clock from "./../../../images/svg/clock-1.svg";
import { useSelector } from "react-redux";

import { Button, Dropdown, Modal } from "react-bootstrap";
import UpdateProfile from "./UpdateProfile";

const images = require.context('../../../../../images/profile', true);

const ProfileActivityChart = loadable(() =>
  pMinDelay(import("./Dashboard/ProfileActivityChart"), 1000)
);


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

// api call 
async function getProfileApi (token){
  const URL = 'http://localhost:8081/api/users/getProfile';
	return fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token" : token
      },
    }).then((data) => data.json());
}


const Profile = () => {
  const userID = useSelector((state) => state.auth.auth._id);
  const token = useSelector((state) => state.auth.auth.token);

  const [loading, setLoading] = useState(true);
  const [dropSelect, setDropSelect] = useState("This Month");
  const [isModalOpen, setIsModalOpen] = useState(false);	
  const [isOnDelete, setIsOnDelete] = useState(false);	
  const [profileData, setProfileData] = useState();
  
  // callback function to opdate state
  const trackOnclick = (payload) => {
    setIsModalOpen(payload);
  }

  const loadImage = (imageName) => {
    return images(`./${imageName}`);
  }

  // hook
  useEffect(()=>{
			getProfile();
  }, [isModalOpen]);

  //
  const getProfile = async () =>{
    const response = await getProfileApi(token);
    if ("status" in response && response.status == true) {
			setProfileData(response.data);
			setLoading(false);
		}
  }

  const pageContent = (loading) ? <h2>Loading</h2> :
    <>
      <div className="row">
        <div className="col-xl-4 col-xxl-5 col-lg-12">
          <div className="card instructors-box">
            <div className="card-header border-0">
              <DropDownBlog	trackOnclick={trackOnclick} />
            </div>
            <div className="card-body text-center pb-3">
              <div className="instructors-media">
                <img src={loadImage(profileData.profile.profilePhoto)} alt="" />


                <div className="instructors-media-info mt-4">
                  <h4 className="mb-1">{profileData.profile.first_name +" "+ profileData.profile.last_name} </h4>
                  <span className="fs-18">Member Since {new Date(profileData.createdAt).getFullYear()}</span>
                  <div className="d-flex justify-content-center my-3 mt-4">
                    <div className="info-box text-start style-1">
                      <span>Points</span>
                      <h4>{profileData.points || 10}</h4>
                    </div>
                    <div className="info-box text-start style-1">
                      <span>Certificate</span>
                      <h4>{profileData.certificates || 50}</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="achievements ">
                <h4 className="text-start mb-3">Achievements</h4>
                <div className="achievements-content flex-wrap">
                  <span>
                    <img src={cup} alt="" />
                  </span>
                  <span>
                    <img src={puzzle} alt="" />
                  </span>
                  <span>
                    <img src={planet} alt="" />
                  </span>
                  <span>
                    <img src={skill} alt="" />
                  </span>
                  <span>
                    <img src={readingtime} alt="" />
                  </span>
                </div>
              </div>
              <div className="bio text-start my-4">
                <h4 className="mb-3">Bio</h4>
                <div className="bio-content">
                  <p>
                    {profileData.profile.aboutMe}
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
              <h3 className="m-0">Current Courses</h3>
              <Link to={"./courses"} className="btn btn-primary btn-sm">
                View all
              </Link>
            </div>

            <div className="col-xl-12">
              <div className="card score-active style-1">
                <div className="card-header border-0 pb-2 flex-wrap">
                  <h4 className="me-4">Score Activity</h4>
                  <ul className="d-flex mb-2">
                    <li>
                      <svg
                        className="me-2"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="1.5"
                          y="1.5"
                          width="9"
                          height="9"
                          rx="4.5"
                          fill="white"
                          stroke="#FEC64F"
                          strokeWidth="3"
                        />
                      </svg>
                      Last Month
                    </li>
                    <li>
                      <svg
                        className="me-2"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="1.5"
                          y="1.5"
                          width="9"
                          height="9"
                          rx="4.5"
                          fill="white"
                          stroke="#4CBC9A"
                          strokeWidth="3"
                        />
                      </svg>
                      Last Month
                    </li>
                  </ul>
                  <div className="d-flex align-items-center">
                    <Dropdown className="select-dropdown me-2">
                      <Dropdown.Toggle
                        as="div"
                        className="i-false dashboard-select  selectBtn btn-dark"
                      >
                        {dropSelect}{" "}
                        <i className="fa-solid fa-angle-down ms-2" />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => setDropSelect("This Month")}
                        >
                          This Month
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => setDropSelect("This Weekly")}
                        >
                          This Weekly
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => setDropSelect("This Day")}
                        >
                          This Day
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <DropDownBlog />
                  </div>
                </div>
                <div className="card-body pb-1 custome-tooltip pt-0">
                  <ProfileActivityChart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

	  <UpdateProfile 
    isModalOpen={isModalOpen} 
    trackOnclick={trackOnclick} 
    profileData={profileData}
    />
		
      
  </>;

  
  return (
    <>{pageContent}</>
    
  );

};
export default Profile;
