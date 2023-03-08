import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import CompanyDropdown from "./CompanyDropdown";
import DepartmentByCompany from "../Department/DepartmentByCompany";
import { API_ROOT_URL } from "../../constants";

const USER_ROLES = {
  SUPER_ADMIN: "super_admin",
  COMPANY: "company",
  INSTRUCTOR: "instructor",
  USER: "user",
};

const UserPopup = ({ isModalOpen, trackOnclick, profileData }) => {
  const navigate = useHistory();
  const id = useSelector((state) => state.auth.auth.id);
  const instructorParentCompany = useSelector(
    (state) => state.auth.auth.parentCompany
  ); // used in case of instructor
  const token = useSelector((state) => state.auth.auth.token);
  const userRole = useSelector((state) => state.auth.auth.role);

  const intialValue = {
    parentCompany: profileData.parentCompany,
    deptID: profileData.deptID,
    userID: profileData.profile._id,
    email: profileData.email,
    first_name: profileData.profile.first_name,
    last_name: profileData.profile.last_name,
    aboutMe: profileData.profile.aboutMe,
    address: profileData.profile.address,
    profilePhoto: profileData.profile.profilePhoto,
  };

  const [state, setState] = useState(intialValue);
  const [image, setImage] = useState({ preview: "", data: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate data
    if (
      state.parentCompany === "" ||
      state.deptID === "" ||
      state.first_name === "" ||
      state.last_name === ""
    ) {
      return swal("Failed", "Please enter all required fields!", "error");
    }

    let formData = new FormData(e.target);

    const response = await fetch(
      `${API_ROOT_URL}/users/edit/${state.userID}`,
      {
        method: "PUT",
        body: formData,
        headers: {
          "x-access-token": token,
        },
      }
    ).then((data) => data.json());

    if ("status" in response && response.status == true) {
      return swal("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        handleCallback();
        //profile
        navigate.push("/users");
      });
    } else {
      return swal("Failed", response.message, "error");
    }
  };

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

  useEffect(() => {
    console.log("profile => " + JSON.stringify(profileData));
    setState(intialValue);
  }, [isModalOpen]);
  return (
    <Modal className="modal fade" show={isModalOpen} >
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
          <form className="update-form" onSubmit={handleSubmit}>
            <div className="row">
              {USER_ROLES.SUPER_ADMIN === userRole ? (
                <CompanyDropdown
                  selectedVal={profileData.parentCompany}
                  selectedDeptVal={profileData.deptID}
                />
              ) : null}

              <div className="col-lg-12">
                {USER_ROLES.COMPANY === userRole ? (
                  <div className="form-group mb-3">
                    <input type="hidden" name="parentCompany" value={id} />
                    <label
                      htmlFor="first_name"
                      className="text-black font-w600"
                    >
                      {" "}
                      Assign Department<span className="required">*</span>{" "}
                    </label>
                    <select
                      className="form-control"
                      name="deptID"
                      value={state.deptID}
                      onChange={(e) => {
                        setState({ ...state, deptID: e.target.value });
                      }}
                    >
                      <option value="">Select</option>
                      <DepartmentByCompany
                        parentCompany={id}
                        selectedDeptVal={state.deptID}
                      />
                    </select>
                  </div>
                ) : null}

                {USER_ROLES.INSTRUCTOR === userRole ? (
                  <div className="form-group mb-3">
                    <input
                      type="hidden"
                      name="parentCompany"
                      value={instructorParentCompany}
                    />
                    <label
                      htmlFor="first_name"
                      className="text-black font-w600"
                    >
                      {" "}
                      Assign Department <span className="required">*</span>{" "}
                    </label>
                    <select
                      className="form-control"
                      name="deptID"
                      value={state.deptID}
                      onChange={(e) => {
                        setState({ ...state, deptID: e.target.value });
                      }}
                      required
                    >
                      <DepartmentByCompany
                        parentCompany={instructorParentCompany}
                        selectedDeptVal={profileData.deptID}
                      />
                    </select>
                  </div>
                ) : null}
              </div>

              <div className="col-lg-6">
                <div className="form-group mb-3">
                  <label htmlFor="first_name" className="text-black font-w600">
                    {" "}
                    First Name  <span className="required">*</span>{" "}
                  </label>
                  <input type="hidden" name="mainID" value={profileData._id} />
                  <input
                    type="text"
                    className="form-control"
                    name="first_name"
                    value={state.first_name}
                    onChange={(e) =>
                      setState({ ...state, first_name: e.target.value })
                    }
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
                    value={state.last_name}
                    onChange={(e) =>
                      setState({ ...state, last_name: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="col-lg-12">
                <div className="form-group mb-3">
                  <label htmlFor="email" className="text-black font-w600">
                    {" "}
                    Profile Pic <span className="required">*</span>
                  </label>
                  <div className="user-media">
                    {/* <img
                      src={loadImage(state.profilePhoto).default}
                      Style="max-height:100px; max-width:100px; padding:10px; border-radius:10px"
                    ></img> */}
                  </div>
                  <input
                    type="hidden"
                    value={state.profilePhoto}
                    name="profilePhoto"
                  />
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
                    value={state.email}
                    onChange={(e) =>
                      setState({ ...state, email: e.target.value })
                    }
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
                    rows={2}
                    className="form-control"
                    name="aboutMe"
                    value={state.aboutMe}
                    onChange={(e) =>
                      setState({ ...state, aboutMe: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="col-lg-12">
                <div className="form-group mb-3">
                  <label htmlFor="address" className="text-black font-w600">
                    Address
                  </label>
                  <textarea
                    rows={2}
                    className="form-control"
                    name="address"
                    placeholder="Enter your current address"
                    value={state.address}
                    onChange={(e) =>
                      setState({ ...state, address: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="col-lg-12">
                <div className="form-group mb-3">
                  <input
                    style={{ display: "flex", margin: "auto" }}
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

export default UserPopup;
