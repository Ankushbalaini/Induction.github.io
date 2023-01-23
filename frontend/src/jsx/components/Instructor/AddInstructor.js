import React, { Fragment, useState, useRef } from "react";
import PageTitle from "../../layouts/PageTitle";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";


import CompanyDropdown from '../Companies/CompanyDropdown';
import e from "cors";

const AddInstructor = () => {
  const navigate = useHistory();
  const loggedrole = useSelector((state) => state.auth.auth.role);
	const parentCompanyID = useSelector((state) => state.auth.auth.id);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState('instructor');
  const [name, setName] = useState();
  const [parentCompany, setParentCompany] = useState(parentCompanyID);
  const [profilePhoto, setProfilePhoto] = useState();
  const [address, setAddress] = useState();
  const [aboutMe, setAboutMe] = useState();

  // validation messages
  let errorsObj = { email: "", password: "", cname: "", parentCompany:"" };
  const [errors, setErrors] = useState(errorsObj);

  const validate = () => {
    let error = false;
    const errorObj = { ...errorsObj };
    if (email == "") {
      errorObj.email = "Email is Required";
      error = true;
    }
    if (password == "") {
      errorObj.password = "Password is Required";
      error = true;
    }
    if (name == "") {
      errorObj.cname = "name is Required";
      error = true;
    }

    setErrors(errorObj);

    if (error) {
      return false;
    }
    else{
      return true;
    }
  }



  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!validate()){
      return false;
    }

    const instructorData = {
      email: email,
      password: password,
      name: name,
      role: role,
      parentCompany: parentCompany,
      profilePhoto: profilePhoto,
      address : address,
      aboutMe: aboutMe

    };

    const response = await addInstructor(instructorData);
    
    if ("status" in response && response.status == true) {
      return swal("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        // return <Navigate to="/instructors" />;
        navigate.push("/instructors");
      });
    } else {
      return swal("Failed", "Error message", "error");
    }
  };







  // api call
  async function addInstructor(formValues) {
    return fetch("http://localhost:8081/api/instructor/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    }).then((data) => data.json());
  }


  const handleParentCompChange = (e) =>{
    setParentCompany(e.target.value);
  }


  return (
    <Fragment>
      <PageTitle activeMenu="Add Instructor" motherMenu="Instructors" />

      <div className="col-xl-12 col-lg-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-titlhandleSubmite">Add Instructor</h4>
          </div>
          <div className="card-body">
            <div className="basic-form">
              <form onSubmit={handleSubmit}>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">
                    Email
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                    
                    {errors.email && <div Style="color:red;font-weight:600;padding:5px;">{errors.email}</div>}
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">
                    Password
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="password"
                      className="form-control"
                      placeholder=""
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                    {errors.password && <div Style="color:red;font-weight:600;padding:5px;">{errors.password}</div>}
                  </div>
                </div>



                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">
                    Name
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      onChange={(e) => setName(e.target.value) }
                      value={name}
                    />
                    {errors.cname && <div Style="color:red;font-weight:600;padding:5px;">{errors.cname}</div>}
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">Parent Company</label>
                  <div className="col-sm-9">

                    { (loggedrole == 'super_admin') ? 
                    <select className="form-control" onChange={ (e) => setParentCompany(e.target.value) }>
                        <option value="">Select</option>
                        <CompanyDropdown />
                    </select> : 
                    <input
                      type="hidden"
                      className="form-control"
                      placeholder=""
                      value={parentCompany}
                      disabled
                    />
                    
                    }
                    {errors.parentCompany && <div Style="color:red;font-weight:600;padding:5px;">{errors.parentCompany}</div>}

                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">
                    Photo
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      defaultValue="logo.png"
                      onChange={(e) => setProfilePhoto(e.target.value)}
                      value={profilePhoto}
                    />
                  </div>
                </div>

                

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">About me</label>
                  <div className="col-sm-9">
                    <textarea
                      className="form-control"
                      placeholder=""
                      onChange={(e) => setAboutMe(e.target.value)}
                    >
                      {aboutMe}
                    </textarea>
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">Address</label>
                  <div className="col-sm-9">
                    <textarea
                      className="form-control"
                      placeholder=""
                      onChange={(e) => setAddress(e.target.value)}
                    >
                      {address}
                    </textarea>
                  </div>
                </div>


                <div className="mb-12 row">
                  <div className="col-sm-12">
                    <button className="btn btn-success" type="submit">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddInstructor;
