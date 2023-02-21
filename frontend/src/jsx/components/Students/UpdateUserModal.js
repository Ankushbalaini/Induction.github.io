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

  const navigate = useHistory();

  const id = useSelector((state) => state.auth.auth.id);

  const instructorParentCompany = useSelector((state) => state.auth.auth.parentCompany);


  const token = useSelector((state) => state.auth.auth.token);
  const role = useSelector((state) => state.auth.auth.role);
  const parentCompanyID=useSelector((state) => state.auth.auth.id);
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
  const [address, setAddress] = useState("");
  const [departmentDropdown, setDepartmentDropdown] = useState();
  const [option, setOption] = useState();

   // validation messages
   let errorObj = { 
    email: "",
    password: "",
    firstName: "",
    lastName:"",
    address: "",
    parentCompany: "",
    deptID: "",
 };

 const [errors, setErrors] = useState(errorObj);


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
     setParentCompany(profileData.parentCompany);
    
    // setParentCompany(profileData.parentCompany);
    console.log(profileData,"profile")
    setDeptID(profileData.deptID);
    setMainID(profileData._id);
    setUserID(profileData.profile._id);
    setFirstName(profileData.profile.first_name);
    setLastName(profileData.profile.last_name);
    setAboutMe(profileData.profile.aboutMe);
    setAddress(profileData.profile.address);
    setPreview(profileData.profile.profilePhoto);
    setEmail(profileData.email);
   
    // call to api to update Department Dropdown
  }, [ isModalOpen]);

  const handleSubmit = async (e) => {
    console.log(e.target.value,"ee....");
     


    e.preventDefault();
   

    let error = false;
    const errorObj1 = { ...errorObj }

    if (email === "") {
      errorObj1.email = "Email is required";
      error = true;
    }
    if (parentCompany === "") {
      errorObj1.parentCompany = "Choose company first!";
      error = true;
    }
    if (deptID === "") {
      errorObj1.deptID = "Choose Department first!";
      error = true;
    }
   
    if (firstName === "") {
      errorObj1.firstName = "First Name is required";
      error = true;
    }
    if (lastName === "") {
      errorObj1.lastName = "Last Name is required";
      error = true;
    }
    if (address === "") {
      errorObj1.address = "address is required";
      error = true;
    }
    if (aboutMe === "") {
      errorObj1.aboutMe = "About section is  is required";
      error = true;
    }
    setErrors(errorObj1);

    if (error) return ;


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
        if(role==='super_admin'){
        navigate.push("/students");
        }
      });
    } else {
      return swal("Failed", response.message, "error");
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
          <form className="update-form" onSubmit={handleSubmit} >
            <div className="row">

              {/* Super admin starts */}
              {role === "super_admin" ? (
                <div>
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
                        <option value={''}>Select</option>
                        <CompanyDropdown prevSelected={parentCompany} />
                      </select>
                      {errors.parentCompany && (
                        <div Style="color:red;font-weight:400">
                          {errors.parentCompany}
                        </div>
                      )}
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
                      <option  value={''}>Select</option>
                      {option}
                    </select>
                    {errors.deptID && (
                      <div Style="color:red;font-weight:400">
                        {errors.deptID}
                      </div>
                    )}
                  </div>
                </div>
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
                  {errors.deptID && (
                    <div Style="color:red;font-weight:400">
                      {errors.deptID}
                    </div>
                  )}
                </div>
              ) : null}
              {/* company ends */}

              {/* instructor start */}
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
                    <DepartmentByCompany parentCompany={instructorParentCompany} />
                  </select>
                </div>
              ) : null}
              {/* instructor ends */}

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
                 {errors.firstName && (
                    <div Style="color:red;font-weight:400">
                      {errors.firstName}
                    </div>
                  )}
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
                  />{errors.lastName && (
                    <div Style="color:red;font-weight:400">
                      {errors.lastName}
                    </div>
                  )}
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
                  /> {errors.aboutMe && (
                    <div Style="color:red;font-weight:400">
                      {errors.aboutMe}
                    </div>
                  )}
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
                  style={{margin: "auto", display: "flex"}}
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
