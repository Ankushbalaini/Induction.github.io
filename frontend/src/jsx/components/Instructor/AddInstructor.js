import React, { Fragment, useState, useRef } from "react";
import PageTitle from "../../layouts/PageTitle";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";


import CompanyDropdown from '../Companies/CompanyDropdown';


const AddInstructor = () => {
  const navigate = useHistory();
  const loggedrole = useSelector((state) => state.auth.auth.role);
	const parentCompanyID = useSelector((state) => state.auth.auth.id);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState('instructor');
  const [name, setName] = useState();
  const [parentCompany, setParentCompany] = useState(parentCompanyID);
  const [profilePhoto, setProfilePhoto] = useState('dummy-user.png');
  const [image, setImage] = useState({preview:'', data:''})
  const [address, setAddress] = useState();
  const [aboutMe, setAboutMe] = useState();

  // validation messages
  let errorsObj = { email: "", password: "", cname: "", parentCompany:"" };
  const [errors, setErrors] = useState(errorsObj);

  const handleFileChange = async (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)
  }



  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('password', password);
    data.append('role', role);
    data.append('parentCompany', parentCompany);
    data.append('profilePhoto', image.data);
    data.append('address', address);
    data.append('aboutMe', aboutMe);

    const response = await fetch("http://localhost:8081/api/instructor/add", {
      method: "POST",
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
              <form onSubmit={(e)=>handleSubmit(e)} >

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">
                    Email
                  </label>
                  <div className="col-sm-9">
                    <input
                      name="email"
                      type="email"
                      className="form-control"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      autocomplete="off"
                      required
                      Role="presentation"
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
                      name="password"
                      type="password"
                      className="form-control"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      required
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
                      name="name"
                      type="text"
                      className="form-control"
                      onChange={(e) => setName(e.target.value) }
                      value={name}
                      required
                    />
                    {errors.cname && <div Style="color:red;font-weight:600;padding:5px;">{errors.cname}</div>}
                  </div>
                </div>
                { (loggedrole == 'super_admin') ?
                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">Parent Company</label>
                  <div className="col-sm-9">

                     
                    <select name="parentCompany" className="form-control" onChange={ (e) => setParentCompany(e.target.value) }>
                        <option value="">Select</option>
                        <CompanyDropdown />
                    </select> 

                    {errors.parentCompany && <div Style="color:red;font-weight:600;padding:5px;">{errors.parentCompany}</div>}

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

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">
                    Photo
                  </label>
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
                      required
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
                      required
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
