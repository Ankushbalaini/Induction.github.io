import React, { useEffect, useState } from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import { API_ROOT_URL, PROFILE_ASSETS_URL } from "../../constants";

// const images = require.context('../../../../../images/profile', true);

const UpdateProfile = ({ isModalOpen, trackOnclick, profileData }) => {
  const navigate = useHistory();

  const token = useSelector((state) => state.auth.auth.token);

  const [firstName, setFirstName] = useState(profileData.profile.first_name);
  const [lastName, setLastName] = useState(profileData.profile.last_name);
  const [email, setEmail] = useState(profileData.email);
  const [aboutMe, setAboutMe] = useState(profileData.profile.aboutMe);
  const [image, setImage] = useState({ preview: "", data: "" });
  const [preview, setPreview] = useState(profileData.profile.profilePhoto);

  // const loadImage = (imageName) => {
  //   return images(`./${imageName}`);
  // }

  const handleCallback = () => {
    trackOnclick(false);
  };

  const handleFileChange = async (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate data
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      aboutMe.trim() === ""
    ) {
      return swal("Failed", "All fields are required!", "error");
    }

    let formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("aboutMe", aboutMe);
    formData.append("image", image.data);
    formData.append("profilePhoto", preview);

    const response = await fetch(`${API_ROOT_URL}/users/update`, {
      method: "PUT",
      body: formData,
      headers: {
        "x-access-token": token,
      },
    }).then((data) => data.json());

    if ("status" in response && response.status == true) {
      return swal("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        handleCallback();
        //profile
        navigate.push("/profile");
      });
    } else {
      return swal("Failed", "Error message", "error");
    }
  };

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
          <form className="update-form" onSubmit={handleSubmit} encType>
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
                    defaultValue=""
                    name="Author"
                    placeholder=""
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
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
                    onChange={(e) => setLastName(e.target.value)}
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
                    {/* <img
                      src={loadImage(preview).default}
                      Style="max-height:100px; max-width:100px; padding:10px; border-radius:10px"
                    ></img> */}
                    <img src={`${PROFILE_ASSETS_URL}/${preview}`} className="img-thumbnail mb-3" width={100}/>
                    
                  </div>
                  <input type="hidden" value={preview} name="profilePhoto" />
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
                  <label htmlFor="email" className="text-black font-w600">
                    {" "}
                    Email <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    defaultValue={""}
                    value={aboutMe}
                    onChange={(e) => setAboutMe(e.target.value)}
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
