import React, { Fragment, useState, useRef,useEffect } from "react";
import PageTitle from "../../layouts/PageTitle";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import CompanyDropdown from "../Companies/CompanyDropdown";
import DepartmentDropdown from "../Department/DepartmentDropdown";

import DepartmentByCompany from "../Department/DepartmentByCompany";

const AddInstructor = () => {
  const navigate = useHistory();
  const loggedrole = useSelector((state) => state.auth.auth.role);
  const id = useSelector((state) => state.auth.auth.id);
  const lrole = useSelector((state) => state.auth.auth.role);
  const token = useSelector((state) => state.auth.auth.token);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState('instructor');
  const [name, setName] = useState("");
  const [parentCompany, setParentCompany] = useState("");
  const [parentDepartment, setParentDepartment] = useState("");
  const [deptID, setDeptID] = useState("");
  const [profilePhoto, setProfilePhoto] = useState('dummy-user.png');
  const [image, setImage] = useState({preview:'', data:''})
  const [address, setAddress] = useState("");
  const [aboutMe, setAboutMe] = useState("");

  // validation messages
  let errorObj = { 
   email: "",
   password: "",
   name: "",
   parentCompany:"",
   parentDepartment:"",
   address: "",
   
};
  
  const [errors, setErrors] = useState(errorObj);

  const handleFileChange = async (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let error = false;
    const errorObj1 = { ...errorObj }

    if (email === "") {
      errorObj1.email = "Email is required";
      error = true;
    }
    if (password === "") {
      errorObj1.password = "Password is required";
      error = true;
    }
    if (name === "") {
      errorObj1.name = "Name is required";
      error = true;
    }
    if (parentCompany === "") {
      errorObj1.parentCompany = "Parent company is required";
      error = true;
    }
    if (parentDepartment === "") {
      errorObj1.parentDepartment = "Parent Department is required";
      error = true;
    }
    if (profilePhoto === "") {
      errorObj1.profilePhoto = "Profile Picture is required";
      error = true;
    }
    if (address === "") {
      errorObj1.address = "Address is required";
      error = true;
    }
    
    setErrors(errorObj1);

    if (error) return ;
    

    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    data.append("role", role);
    data.append("parentCompany", parentCompany);
    data.append("parentDepartment", parentDepartment);
    data.append("deptID", parentDepartment);
    data.append("profilePhoto", image.data);
    data.append("address", address);
    data.append("aboutMe", aboutMe);

    const response = await fetch("http://localhost:8081/api/instructor/add", {
      method: "POST",
      headers: {
        "x-access-token": token,
      },
      body: data,
    }).then((user) => user.json());

    if ("status" in response && response.status === true) {
      return swal("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        navigate.push("/instructors");
      });
    } else {
      return swal("Failed", response.message, "error");
    }
  };

  //css for button
  const buttonStyle = {
    margin: "auto",
    display: "flex",
    float: "right",
  };


   // on click validation remove function
  function handleKeyPress(e) {
    var key = e.key;
   if (key == key) {
        setErrors((errorObj == false))
    }
}

  useEffect(() => {}, [errors]);

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
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">Email</label>
                  <div className="col-sm-9">
                    <input
                      name="email"
                      type="email"
                      className="form-control"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      onKeyPress={(e) => handleKeyPress(e)}
                      // autocomplete="off"
                      // Role="presentation"
                    />
                    {errors.email && (
                      <div Style="color:red;font-weight:400">
                        {errors.email}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">Password</label>
                  <div className="col-sm-9">
                    <input
                      name="password"
                      type="password"
                      className="form-control"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      onKeyPress={(e) => handleKeyPress(e)}

                    />
                    {errors.password && (
                      <div Style="color:red;font-weight:400">
                        {errors.password}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">Name</label>
                  <div className="col-sm-9">
                    <input
                      name="name"
                      type="text"
                      className="form-control"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      onKeyPress={(e) => handleKeyPress(e)}

                    />
                    {errors.name && (
                      <div Style="color:red;font-weight:400">
                        {errors.name}
                      </div>
                    )}
                   
                  </div>
                </div>

                { (loggedrole == 'super_admin' || loggedrole == 'company' ) ?
                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">Parent Company</label>
                  <div className="col-sm-9">

                     
                    <select name="parentCompany" className="form-control" onChange={ (e) => setParentCompany(e.target.value) }
                    onKeyPress={(e) => handleKeyPress(e)}
                    >
                        <option value="">Select</option>
                        <CompanyDropdown />
                    </select> 
                   
                    {errors.parentCompany && (
                      <div Style="color:red;font-weight:400">
                        {errors.parentCompany}
                      </div>
                    )}

                      {errors.deptID && (
                        <div Style="color:red;font-weight:600;padding:5px;">
                          {errors.deptID}
                        </div>
                      )}
                    </div>
                    
                  </div>
                : 
                <input
                  name="parentCompany"
                  type="hidden"
                  className="form-control"
                  value={parentCompany}
                />
                
                }

              { (loggedrole == 'super_admin' || loggedrole == 'company' ) ?
                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">Parent Department</label>
                  <div className="col-sm-9">

                     
                    <select name="parentDepartment" className="form-control" onChange={ (e) => setParentDepartment(e.target.value) }
                    onKeyPress={(e) => handleKeyPress(e)}

                    >
                        <option value="">Select</option>
                        {/* <DepartmentDropdown parentCompany={parentCompany}/> */}
                        <DepartmentByCompany parentCompany={parentCompany} prevSelected="" />

                    </select> 
                    {errors.parentDepartment && (
                      <div Style="color:red;font-weight:400">
                        {errors.parentDepartment}
                      </div>
                    )}



                  </div>
                </div>
                : 
                <input
                  name="deptID"
                  type="hidden"
                  className="form-control"
                  value={parentDepartment}
                />
                }

                { (lrole === 'company') ? 
                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">Select Department</label>
                  <div className="col-sm-9">
                    <select name="deptID" className="form-control" onChange={ (e) => setDeptID(e.target.value) }>
                        <option value="">Select</option>
                        <DepartmentByCompany parentCompany={id} prevSelected="" />
                    </select> 


                  </div>
                </div> : null }

                

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">Photo</label>
                  <div className="col-sm-9">
                    <input
                      type="file"
                      className="form-control"
                      name="profilePhoto"
                      onChange={handleFileChange}
                      accept="image/png,image/jpeg,image/jpg"
                    />
                    

                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">About me</label>
                  <div className="col-sm-9">
                    <textarea
                      className="form-control"
                      name="aboutMe"
                      value={aboutMe}
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
                     
                      name="address"
                      
                      onChange={(e) => setAddress(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e)}

                    >
                      {address}
                    </textarea>
                    {errors.address && (
                      <div Style="color:red;font-weight:400">
                        {errors.address}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-12 row">
                  <div className="col-sm-12">
                    <button
                      className="btn btn-success"
                      type="submit"
                      style={buttonStyle}
                    >
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
