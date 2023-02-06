import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
//import DropDownBlog from "../Dashboard/DropDownBlog";
import ActionDropDown from "../Students/ActionDropDown";
import certificate from "./../../../images/svg/degree-certificate.svg";
import clock from "./../../../images/svg/clock-1.svg";
import { useSelector } from "react-redux";
import UpdateProfile from "./UpdateProfile";

const images = require.context('../../../../../images/profile/', true);

const WidgetBlog = ({ changeImage, title, link, Count }) => {
  return (
    <>
      <div className="col-xl-6 col-lg-6 col-sm-6">
        <div className="card profile-widget">
          <div className="card-body">
            <div className="widget-courses align-items-center d-flex justify-content-between style-1 flex-wrap">
              <div className="d-flex">
                <img src={changeImage} alt="" />
                <div className="ms-4">
                  <h4>{Count}</h4>
                  <span>{title}</span>
                </div>
              </div>
              <Link to={link}>
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


const InstructorProfile = () => {

  const token = useSelector((state) => state.auth.auth.token);
  const [loading,setLoading] = useState(true);
  const [instructorData, setInstructorData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);	

  const getProfile = async () =>{
    const response = await getProfileApi(token);
    if ("status" in response && response.status == true) {
			setInstructorData(response.data);
			setLoading(false);
		}
  }

  // callback function to opdate state
  const trackOnclick = (payload) => {
    setIsModalOpen(payload);
  }
  

  // callback function to opdate state
  const trackDeleteClick = () => {
    swal({
      title: "Are you sure?",
      text:
        "Once deleted, you will not be able to recover this record!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your record has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your record is safe!");
      }
    })
  }


  const loadImage = (imageName) => {
    return images(`./${imageName}`);
  }

  useEffect(()=>{
    if(loading){
      getProfile();
    }
  }, [instructorData]);

  const pageContent = (loading) ? <h1>Loading</h1> :
    <div className="row">
      <div className="col-xl-4 col-xxl-5 col-lg-12">
        <div className="card instructors-box">
          <div className="card-header border-0">
            {/* <DropDownBlog /> */}
            <ActionDropDown trackOnclick={trackOnclick} trackDeleteClick={trackDeleteClick}/>
          </div>
          <div className="card-body text-center pb-3">
            <div className="instructors-media">
              
              { 
              (typeof instructorData.profile.profilePhoto  !== 'undefined' ||  instructorData.profile.profilePhoto !== '') ?  
              <img src={loadImage(instructorData.profile.profilePhoto)} />  : <img src={loadImage('dummy-user.png')} /> 
              }
              

              <div className="instructors-media-info mt-4">
                <h4 className="mb-1">{instructorData.profile.name}</h4>
                <span className="fs-18">Member Since1 {new Date(instructorData.createdAt).getFullYear()}</span>
              </div>
            </div>

            <div className="bio text-start my-4">
              <h4 className="mb-3">Bio</h4>
              <div className="bio-content">
                <p>{instructorData.profile.aboutMe}</p>
              </div>
            </div>

            <div className="bio text-start my-4">
              <h4 className="mb-3">Address</h4>
              <div className="bio-content">
                <p>{instructorData.profile.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-8 col-xxl-7 col-lg-12 ">
        <div className="row">
          {/* <WidgetBlog
            changeImage={certificate}
            title="Instructors"
            link="instructors"
            Count={instructorData.totalInductions}
          /> */}
          <WidgetBlog changeImage={clock} title="Inductions" link="inductions" Count={instructorData.totalInductions}/>
          <div className="widget-heading d-flex justify-content-between align-items-center">
            <h3 className="m-0">My Inductions</h3>
            <Link to={"./inductions"} className="btn btn-primary btn-sm">
              View all
            </Link>
          </div>
        </div>
      </div>

      <UpdateProfile isModalOpen={isModalOpen} trackOnclick={trackOnclick} instructorData={instructorData} />
    </div>



  return(
    <>
    {pageContent}

    

    </>
  )
  
};
export default InstructorProfile;
