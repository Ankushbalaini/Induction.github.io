import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import CompanyDropdown from "../Companies/CompanyDropdown";
import DepartmentByCompany from "../Department/DepartmentByCompany";

const images = require.context("../../../../../images/profile", true);

const UpdateUserModal = ({ isModalOpen, trackOnclick, profileData }) => {
  console.log(profileData);
  const navigate = useHistory();

  const id = useSelector((state) => state.auth.auth.id);
  const token = useSelector((state) => state.auth.auth.token);
  const role = useSelector((state) => state.auth.auth.role);

  const [userID, setUserID] = useState(); // User Table id
  const [mainID, setMainID] = useState(); // UserCred table id
  const [parentCompany, setParentCompany] = useState("");
  const [deptID, setDeptID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [image, setImage] = useState({ preview: "", data: "" });
  const [preview, setPreview] = useState("dummy-user.png");
  const [address, setAddress] = useState();
  const [departmentDropdown, setDepartmentDropdown] = useState();
  const [option, setOption] = useState();

  const handleCompanyChange = async (e) => {
    // call api to fetch departments
    setParentCompany(e.target.value);
    const response = await fetch(
      "http://localhost:8081/api/department/getDepartmentByComp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({ parentCompany: e.target.value }),
      }
    ).then((data) => data.json());

    if ("status" in response && response.status == true) {
      const rows = response.data.map((row, index) => (
        <option value={row._id}>{row.name}</option>
      ));
      setOption(rows);
    }
  };

 

  const handleCallback = () => {
    trackOnclick(false);
  };

  const loadImage = (imageName) => {
    return images(`./${imageName}`);
  };

  const handleFileChange = async (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };



  useEffect(() => {
    // setParentCompany(profileData.parentCompany);
    
    setDeptID(profileData.deptID);
    setMainID(profileData._id);
    setUserID(profileData.profile._id);
    setFirstName(profileData.profile.first_name);
    setLastName(profileData.profile.last_name);
    setAboutMe(profileData.profile.aboutMe);
    setAddress(profileData.profile.address);
    setPreview(profileData.profile.profilePhoto);
    setEmail(profileData.email);
    console.log('profileData', profileData);
    // call to api to update Department Dropdown
  }, [ isModalOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validate data
    if (firstName === "" || lastName === "" || aboutMe === "", parentCompany === "", deptID === "") {
      return swal("Failed", "All fields are required!", "error");
    }

    let data = new FormData();
    data.append("mainID", mainID);
    data.append("deptID", deptID);
    data.append("parentCompany", parentCompany);
    data.append("first_name", firstName);
    data.append("last_name", lastName);
    data.append("email", email);
    data.append("aboutMe", aboutMe);
    data.append("image", image.data);
    data.append("profilePhoto", preview);
    data.append("address", address);

    const response = await fetch(
      "http://localhost:8081/api/users/edit/" + userID,
      {
        method: "PUT",
        body: data,
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
        navigate.push("/students");
      });
    } else {
      return swal("Failed", "Error message", "error");
    }
  };


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
          <form className="update-form" onSubmit={handleSubmit} encType>
            <div className="row">
              {/* Super admin starts */}
              {role === "super_admin" ? (
                <>
                  <div className="col-lg-6">
                    <div className="form-group mb-3">
                      <label
                        htmlFor="parentCompany"
                        className="text-black font-w600"
                      >
                        {" "}
                        Assign Company <span className="required">*</span>{" "}
                      </label>
                      <select
                        name="parentCompany"
                        className="form-control"
                        onChange={handleCompanyChange}
                        value={parentCompany}
                      >
                        <option>Select</option>
                        <CompanyDropdown prevSelected={parentCompany} />
                      </select>
                    </div>
                  </div>
                  <div className="form-group mb-3">
                    <label
                      htmlFor="department"
                      className="text-black font-w600"
                    >
                      {" "}
                      Assign Department <span className="required">*</span>{" "}
                    </label>
                    <select
                      name="deptID"
                      className="form-control"
                      onChange={(e) => setDeptID(e.target.value)}
                      value={deptID}
                    >
                      <option>Select</option>
                      {option}
                    </select>
                  </div>
                </>
              ) : null}

              {/* Super admin ends */}

              {/* company start */}
              {role === "company" ? (
                <div className="form-group mb-3">
                  <label htmlFor="department" className="text-black font-w600">
                    {" "}
                    Assign Department <span className="required">*</span>{" "}
                  </label>
                  <select
                    name="deptID"
                    className="form-control"
                    onChange={(e) => setDeptID(e.target.value)}
                    value={deptID}
                  >
                    <option>Select</option>
                    <DepartmentByCompany />
                  </select>
                </div>
              ) : null}

              {/* company ends */}

              {/* company start */}
              {role === "instructor" ? (
                <div className="form-group mb-3">
                  <label htmlFor="department" className="text-black font-w600">
                    {" "}
                    Assign Department <span className="required">*</span>{" "}
                  </label>
                  <select
                    name="deptID"
                    className="form-control"
                    onChange={(e) => setDeptID(e.target.value)}
                    value={deptID}
                  >
                    <option>Select</option>
                    <DepartmentByCompany parentCompany={id} />
                  </select>
                </div>
              ) : null}

              {/* company ends */}

              <div className="col-lg-6">
                <div className="form-group mb-3">
                  <label htmlFor="first_name" className="text-black font-w600">
                    {" "}
                    First Name <span className="required">*</span>{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue=""
                    name="firstName"
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
                    name="lastName"
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
                    <img
                      src={loadImage(preview).default}
                      Style="max-height:100px; max-width:100px; padding:10px; border-radius:10px"
                    ></img>
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
                    value={aboutMe}
                    onChange={(e) => setAboutMe(e.target.value)}
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
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
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

export default UpdateUserModal;
