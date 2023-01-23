import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import { Last } from "react-bootstrap/esm/PageItem";

// api call 
async function updateProfileApi (token, formValues){
  const URL = 'http://localhost:8081/api/users/update';
	return fetch(URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token" : token
      },
      body: JSON.stringify(formValues),

    }).then((data) => data.json());
}


const UpdateProfile = ({isModalOpen, trackOnclick, profileData}) => {

    // console.log(profileData);
    const token = useSelector((state) => state.auth.auth.token);
    
    const [firstName, setFirstName] = useState(profileData.profile.first_name);
    const [lastName, setLastName] = useState(profileData.profile.last_name);
    const [email, setEmail] = useState(profileData.email);
    const [aboutMe, setAboutMe] = useState(profileData.profile.aboutMe);
    

    const handleCallback = () => {
      trackOnclick(false);
    }

    // On Form Submit
    const handleSubmit = async (e) =>{
      e.preventDefault();
      if(firstName == '' || lastName=='' || email =='' || aboutMe == ''){
        
      }
      const getProfile = async () =>{
        const formValues = {
          first_name: firstName,
          last_name: lastName,
          email: email,
          aboutMe: aboutMe
        };

        const response = await updateProfileApi(token, formValues);
        if ("status" in response && response.status == true) {
          return swal("Success", response.message, "success", {
            buttons: false,
            timer: 2000,
          }).then((value) => {
            handleCallback();
          });

        }else{
          return swal("Failed", "Error message", "error");
        }
      }
      getProfile();

    }



    return (
        <Modal className="modal fade" show={isModalOpen}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Profile</h5>
            <Button
              variant=""
              type="button"
              className="btn-close"
              data-dismiss="modal"
              onClick={handleCallback}
            ></Button>
          </div>
          <div className="modal-body">
            <form
              className="update-form"
              onSubmit={handleSubmit}
            >
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group mb-3">
                    <label htmlFor="author" className="text-black font-w600">
                      {" "}
                      First Name <span className="required">*</span>{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue=''
                      name="Author"
                      placeholder=""
                      value={firstName}
                      onChange={(e)=>setFirstName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group mb-3">
                    <label htmlFor="last_name" className="text-black font-w600">
                      {" "}
                      Last Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="last_name"
                      value={lastName}
                      onChange={(e)=>setLastName(e.target.value)}

                    />
                  </div>
                </div>


                <div className="col-lg-6">
                  <div className="form-group mb-3">
                    <label htmlFor="email" className="text-black font-w600">
                      {" "}
                      Email <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                      disabled

                    />
                  </div>
                </div>

				
                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <label htmlFor="aboutMe" className="text-black font-w600">
                      About me
                    </label>
                    <textarea
                      rows={8}
                      className="form-control"
                      name="aboutMe"
                      placeholder=""
                      defaultValue={""}
                      value={aboutMe}
                      onChange={(e)=>setAboutMe(e.target.value)}

                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <input
                      type="submit"
                      value="Update Profile"
                      className="submit btn btn-primary"
                      name="submit"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>

    )
}

export default UpdateProfile;
