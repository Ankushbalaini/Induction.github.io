import React, { Fragment, useState, useRef } from "react";
import PageTitle from "../../layouts/PageTitle";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

const AddCompany = () => {
  const navigate = useHistory();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [companyID, setCompanyID] = useState();
  const [logo, setLogo] = useState();
  const [address, setAddress] = useState();
  const [aboutCompany, setAboutCompany] = useState();
  

  let handleSubmit = async (e) => {
    e.preventDefault();
    const company = {
      email: email,
      password: password,
      name: name,
      companyID: companyID,
      logo: logo,
      address : address,
      aboutCompany: aboutCompany

    };
    // let formData = new FormData();
    const response = await addCompany(company);
    
    if ("status" in response && response.status == true) {
      return swal("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        // return <Navigate to="/inductions" />;
        navigate.push("/companies");
      });
    } else {
      return swal("Failed", "Error message", "error");
    }
  };

  // api call
  async function addCompany(formValues) {
    return fetch("http://localhost:8081/api/company/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    }).then(
      (data) => data.json()
    );
  }

  return (
    <Fragment>
      <PageTitle activeMenu="Add Company" motherMenu="Company" />

      <div className="col-xl-12 col-lg-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-titlhandleSubmite">Add Company</h4>
          </div>
          <div className="card-body">
            <div className="basic-form">
              <form onSubmit={handleSubmit} method="POST" enctype="multipart/form-data">

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">
                    Company Email
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder=""
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">
                    Company Password
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">
                    Company Name
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">Slug</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      onChange={(e) => setCompanyID(e.target.value)}
                      value={companyID}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">
                    Company Logo
                  </label>
                  <div className="col-sm-9">
                  <input
                      type="file"
                      className="form-control" name="logo"
                      accept="image/png,image/jpeg,image/jpg"
                    />
                    {/* <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      defaultValue="logo.png"
                      onChange={(e) => setLogo(e.target.value)}
                      value={logo}
                    /> */}
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">Address</label>
                  <div className="col-sm-9">
                    <textarea
                      className="form-control"
                      name="address"
                      placeholder=""
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    >
                      {address}
                    </textarea>
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">About Company</label>
                  <div className="col-sm-9">
                    <textarea
                      className="form-control"
                      name="aboutCompany"
                      placeholder=""
                      onChange={(e) => setAboutCompany(e.target.value)}
                      required
                    >
                      {aboutCompany}
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

export default AddCompany;
