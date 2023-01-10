import React, { Fragment, useState, useRef } from "react";
import PageTitle from "../../layouts/PageTitle";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

const ListCompanies = () => {
  const navigate = useHistory();
  const [name, setName] = useState();
  const [companyID, setCompanyID] = useState();
  const [logo, setLogo] = useState();
  const [address, setAddress] = useState();
  

  let handlepageLoad = async (event) => {
    event.preventDefault();
    const company = {
      name: name,
      companyID: companyID,
      logo: logo,
      address : address
    };

    const response = await getCompanies(company);
    
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
  async function getCompanies(formValues) {
    return fetch("http://localhost:8081/api/company/all", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    }).then((data) => data.json());
  }

  return (
    <Fragment>
      <PageTitle activeMenu="All Companies" motherMenu="Company" />

      <div className="col-xl-12 col-lg-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-titlhandleSubmite">Company List</h4>
          </div>
          <div className="card-body">
            Welcome to company listing page
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ListCompanies;
