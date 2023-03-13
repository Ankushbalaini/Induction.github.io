import React, { useEffect, useState } from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import { API_ROOT_URL } from "../../constants";

const UpdateProfile = ({ isModalOpen, trackOnclick, instructorData }) => {
  const navigate = useHistory();
  const token = useSelector((state) => state.auth.auth.token);
  const role = useSelector((state) => state.auth.auth.role);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState({ preview: "", data: "" });
  const [profilePhoto, setProfilePhoto] = useState("");

  const [preview, setPreview] = useState("");
  const [userID, setUserID] = useState(instructorData.profile._id);

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

  // on every render change values
  useEffect(() => {
    setName(instructorData.profile.name);
    setEmail(instructorData.email);
    setAboutMe(instructorData.profile.aboutMe);
    setAddress(instructorData.profile.address);
    setProfilePhoto(instructorData.profile.profilePhoto);
    setUserID(instructorData.profile._id);
    // handleSubmit();
  }, [isModalOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validate data
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      address.trim() === "" ||
      aboutMe === ""
    ) {
      return swal("Failed", "All fields are required!", "error");
    }

    let data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("image", image.data);
    data.append("address", address);
    data.append("aboutMe", aboutMe);
    data.append("profilePhoto", profilePhoto);

    // const userID = "63cea890edb762dfb4abb220";

    const response = await fetch(`${API_ROOT_URL}/instructor/edit/${userID}`, {
      method: "PUT",
      body: data,
    }).then((data) => data.json());

    if ("status" in response && response.status == true) {
      return swal("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        handleCallback();
        //profile
        if (role === "super_admin") {
          navigate.push("/instructors");
        }
        // }else{
        //   navigate.push("/instructor-profile");
        // }
      });
    } else {
      return swal("Failed", response.message, "error");
    }
  };

  return (
    <Modal
      className="modal fade"
      show={isModalOpen}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Update Instructor</h5>
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
                    onChange={(e) => setName(e.target.value)}
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
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder=""
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    readOnly
                  />
                </div>
              </div>

              <div className="col-lg-12">
                <div className="form-group mb-3">
                  <label htmlFor="image" className="text-black font-w600">
                    {" "}
                    Image <span className="required">*</span>
                  </label>
                  <div className="instructors-media"></div>
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
                    name="aboutMe"
                    placeholder=""
                    value={aboutMe}
                    onChange={(e) => setAboutMe(e.target.value)}
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
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-lg-12">
                <div className="form-group mb-3">
                  <input
                    style={{ margin: "auto", display: "flex" }}
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
