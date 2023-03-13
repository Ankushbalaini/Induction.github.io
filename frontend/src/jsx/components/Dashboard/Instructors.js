import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ActionDropDown from "./ActionDropDown";
import UpdateProfile from "../Instructor/UpdateProfile";
import { API_ROOT_URL } from "../../constants";
const images = require.context("../../../../../images/profile/", true);

// api call
async function getInstructorApi(role, companyID) {
  var getInstructorsApi = `${API_ROOT_URL}/instructor/list`;
  if (role == "company") {
    var getInstructorsApi = `${API_ROOT_URL}/instructor/listByCompany?role=company&parentCompany=${companyID}`;
  }
  return fetch(getInstructorsApi, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
}

const Instructors = (props) => {
  const role = useSelector((state) => state.auth.auth.role);
  const parentCompany = useSelector((state) => state.auth.auth.id);

  const [loading, setLoading] = useState(true);
  const [instructorsData, setInstructorsData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [instructorData, setInstructorData] = useState({
    profile: {
      name: "",
      email: "",
      aboutMe: "",
      address: "",
      logo: "",
      _id: "",
    },
  });

  const getInstructors = async (e) => {
    const response = await getInstructorApi(role, parentCompany);

    if ("status" in response && response.status == true) {
      setInstructorsData(response.data);
      setLoading(false);
    }
  };

  // hook
  useEffect(() => {
    if (loading) {
      getInstructors();
    }
  }, [instructorData]);

  // import images
  const loadImage = (imageName) => {
    return images(`./${imageName}`);
  };

  // callback function to opdate state
  const trackOnclick = (payload, userData) => {
    setIsModalOpen(payload);
    if (payload) {
      console.log(userData);
      setInstructorData(userData);
    }
  };

  const PageContent = loading ? (
    <i className="fas fa-atom fa-spin"></i>
  ) : (
    <>
      {instructorsData.map((user, index) => (
        <div className="col-xl-3 col-xxl-4 col-md-4" key={index}>
          <div className="card instructors-box">
            <div className="card-header border-0">
              <ActionDropDown trackOnclick={trackOnclick} userData={user} />
            </div>
            <div className="card-body text-center pb-3">
              <div className="instructors-media">
                
                <img
                  className="img-fluid"
                  src={`${PROFILE_ASSETS_URL}/${user.profile.profilePhoto}`}
                  alt={user.profile.profilePhoto}
                />

                {/* <img src={ loadImage(user.profile.profilePhoto) } alt="" /> */}

                <div className="instructors-media-info">
                  <h4>{user.profile.name}</h4>
                  <h5>{user.email}</h5>

                  <h4>Parent company name</h4>

                  <h4>Department Name</h4>
                  {/* <h5>{user.parentCompany}</h5> */}
                  {/* <ul className="d-flex align-items-center raiting my-0 justify-content-center">
											<li><span className="font-w500">5.0</span><i className="fas fa-star text-orange ms-2"></i></li>
											<li>Review (1k)</li>
										</ul> */}
                  {/* <div className="custome-badge">
											<Link to={"#"}><span className="badge badge-xl">Users (10)</span></Link>
											<Link to={"#"}><span className="badge badge-xl">Inductions (2)</span></Link>
											<Link to={"#"}><span className="badge badge-xl">Departments (1)</span></Link>
										</div> */}
                </div>
              </div>
            </div>
            {/* <div className="card-footer pt-0 border-0">
								<Link to={"./instructor-liveclass"} className="btn btn-secondary  btn-block">View Class</Link>
							</div> */}
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="row">
      {PageContent}
      <UpdateProfile
        isModalOpen={isModalOpen}
        trackOnclick={trackOnclick}
        instructorData={instructorData}
      ></UpdateProfile>
    </div>
  );
};
export default Instructors;
