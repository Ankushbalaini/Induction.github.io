import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import { Last } from "react-bootstrap/esm/PageItem";
import { useHistory } from "react-router-dom";
import DepartmentDropdown from "../Department/DepartmentDropdown";

const images = require.context('../../../../../images/profile', true);


const UpdateProfile = ({isModalOpen, trackOnclick, profileData}) => {
    const navigate = useHistory();

    const token = useSelector((state) => state.auth.auth.token);
    const [userID, setUserID] = useState();
    const [deptID, setDeptID] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [aboutMe, setAboutMe] = useState();
    const [image, setImage] = useState({ preview: '', data: '' });
    const [preview, setPreview] = useState('dummy-user.png');
    const [address, setAddress] = useState();
    
    const loadImage = (imageName) => {
      return images(`./${imageName}`);
    }

    useEffect(() => {
        setDeptID(profileData.deptID);
        setUserID(profileData.profile._id);
        setFirstName(profileData.profile.first_name);
        setLastName(profileData.profile.last_name);
        setAboutMe(profileData.profile.aboutMe);
        setAddress(profileData.profile.address);
        setPreview(profileData.profile.profilePhoto);
        setEmail(profileData.email);
        
    },[profileData, isModalOpen]);


    const handleCallback = () => {
      trackOnclick(false);
    }

    const handleFileChange = async (e) => {
      const img = {
        preview: URL.createObjectURL(e.target.files[0]),
        data: e.target.files[0],
      }
      setImage(img)
    }

    const handleSubmit = async (e) => {
      e.preventDefault()

      // validate data
      if(firstName === '' || lastName === '' || aboutMe === '') {
        return swal("Failed", "All fields are required!", "error");
        return false;
      }

      let formData = new FormData()
      formData.append('deptID', deptID);
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('email', email);
      formData.append('aboutMe', aboutMe);
      formData.append('image', image.data);
      formData.append('profilePhoto', preview);
      formData.append('address', address);


      const response = await fetch('http://localhost:8081/api/users/edit/'+userID, {
        method: 'PUT',
        body: formData,
        headers: {
          "x-access-token" : token
        },
      })
      .then((data) => data.json())

      if ("status" in response && response.status == true) {
        return swal("Success", response.message, "success", {
          buttons: false,
          timer: 2000,
        }).then((value) => {
          handleCallback();
          //profile
          navigate.push("/students");
        });

      }else{
        return swal("Failed", "Error message", "error");
      }

    }


    return (
        <Modal className="modal fade" show={isModalOpen}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Profile </h5>
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
              encType
            >
              <div className="row">
                
                <div className="col-lg-6">
                  <div className="form-group mb-3">
                    <label htmlFor="department" className="text-black font-w600">
                      {" "}
                      Assign Department {deptID}<span className="required">*</span>{" "}
                    </label>

                    <select name="deptID"
                      className="form-control"
                      onChange={(e) => setDeptID(e.target.value)}
                    >
                      <DepartmentDropdown prevSelected={deptID}/>


                    </select>
                      
                    
                  </div>
                </div>
                </div>

                <div className="row">
                
                <div className="col-lg-6">
                  <div className="form-group mb-3">
                    <label htmlFor="first_name" className="text-black font-w600">
                      {" "}
                      First Name <span className="required">*</span>{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue=''
                      name="first_name"
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

                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <label htmlFor="email" className="text-black font-w600">
                      {" "}
                      Profile Pic <span className="required">*</span>
                    </label>
                    <div className="instructors-media">
                    <img src={ loadImage(preview).default } Style="max-height:100px; max-width:100px; padding:10px; border-radius:10px"></img>
                    </div> 
                    <input type="hidden" value={preview} name="profilePhoto" />
                    <input
                      type="file"
                      className="form-control"
                      name="image"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>




                <div className="col-lg-12">
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
                      rows={3}
                      className="form-control"
                      name="aboutMe"
                      placeholder=""
                      value={aboutMe}
                      onChange={(e)=>setAboutMe(e.target.value)}

                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <label htmlFor="address" className="text-black font-w600">
                      Address
                    </label>
                    <textarea
                      rows={3}
                      className="form-control"
                      name="address"
                      placeholder="Enter your current address"
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

    )
}

export default UpdateProfile;
