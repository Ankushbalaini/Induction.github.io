import React, { useEffect, useState } from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

const images = require.context("../../../../../images/profile", true);

const UpdateProfile = ({ isModalOpen, trackOnclick, instructorData }) => {
  const navigate = useHistory();
  const token = useSelector((state) => state.auth.auth.token);
  const role = useSelector((state) => state.auth.auth.role);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [AboutMe, setAboutMe] = useState();
  const [address, setAddress] = useState();
  const [image, setImage] = useState({ preview: '', data: '' });
  const [profilePhoto, setProfilePhoto] = useState();

  const [preview, setPreview] = useState();
  const [userID, setUserID] = useState(instructorData.profile._id);
  
  const handleCallback = () => {
    trackOnclick(false);
  };

  const loadImage = (imageName) => {
    return images(`./${imageName}`);
  }

  const handleFileChange = async (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)
  }

  // on every render change values
  useEffect(()=>{

    setName(instructorData.profile.name);
    setEmail(instructorData.email);
    setAboutMe(instructorData.profile.aboutMe);
    setAddress(instructorData.profile.address);
    setProfilePhoto(instructorData.profile.profilePhoto);
    setUserID(instructorData.profile._id);
    
  },[isModalOpen])


  const handleSubmit = async (e) =>{
    e.preventDefault();
    // validate data
    if(name.trim() === '' || email.trim() === '' || address.trim() === '' || AboutMe ==='') {
      return swal("Failed", "All fields are required!", "error");
    }

    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('image', image.data);
    data.append('address', address);
    data.append('AboutMe', AboutMe);
    data.append('profilePhoto', profilePhoto);

    
    // const userID = "63cea890edb762dfb4abb220";

    const response = await fetch(
      "http://localhost:8081/api/instructor/edit/" + userID,
      {
        method: "PUT",
        body: data,
      }
    ).then((data) => data.json());

    if ("status" in response && response.status == true) {
      return swal("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        handleCallback();
        //profile
        if(role==='super_admin'){
          navigate.push("/instructors");
        }else{
          navigate.push("/instructor-profile");
        }
        
      });
      
    } else {
      return swal("Failed", response.message, "error");
    }
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
          <form className="update-form" onSubmit={handleSubmit}>


          <div className="row">
                <div className="col-lg-6">
                  <div className="form-group mb-3">
                    <label htmlFor="name" className="text-black font-w600">
                      {" "}
                      Instructor Name <span className="required">*</span>{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={name}
                      onChange={(e)=>setName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group mb-3">
                    <label htmlFor="email" className="text-black font-w600">
                      {" "}
                      Email <span className="required">*</span>{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue=''
                      name="email"
                      placeholder=""
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                      readOnly
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <label htmlFor="image" className="text-black font-w600">
                      {" "}
                      instructor Logo <span className="required">*</span>
                    </label>
                    <div className="instructors-media">



                    {/* <img src={ loadImage(preview) } Style="max-height:100px; max-width:100px; padding:10px; border-radius:10px"></img> */}


                    </div> 
                    <input type="hidden" value={preview} name="logo" />
                    <input
                      type="file"
                      className="form-control"
                      name="image"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <label htmlFor="last_name" className="text-black font-w600">
                      {" "}
                      About instructor <span className="required">*</span>
                    </label>
                    
                     <textarea
                      rows={2}
                      className="form-control"
                      name="AboutMe"
                      placeholder=""
                      defaultValue={""}
                      value={AboutMe}
                      onChange={(e)=>setAboutMe(e.target.value)}
                      />
                  </div>
                </div>


                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <label htmlFor="last_name" className="text-black font-w600">
                      {" "}
                      Address <span className="required">*</span>
                    </label>
                    
                     <textarea
                      rows={2}
                      className="form-control"
                      name="address"
                      placeholder=""
                      defaultValue={""}
                      value={address}
                      onChange={(e)=>setAddress(e.target.value)}
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
  );
};

export default UpdateProfile;