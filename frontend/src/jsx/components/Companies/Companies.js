import React, { Fragment, useState, useRef, useEffect } from "react";
import PageTitle from "../../layouts/PageTitle";
import swal from "sweetalert";
import Form from "react-bootstrap/Form";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";

import Table from './DataTable';
import data from './data';
import UpdateCompanyProfile from './UpdateCompanyProfile';
import e from "cors";


const images = require.context("../../../../../images/company/", true);

// api call
async function getCompanies(formValues) {
  return fetch("http://localhost:8081/api/company/list", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formValues),
  }).then((data) => data.json());
}

const Companies = () => {
  const navigate = useHistory();
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ name: ''});

  // model popup usestate
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [image, setImage] = useState({ preview: "", data: "" });
  const [logo, setLogo] = useState();
  const [address, setAddress] = useState();
  const [aboutCompany, setAboutCompany] = useState();
  const [editID, setEditID] = useState();
  const [companyID, setCompanyID] = useState();

  const actionHandler = (company) => {
    setIsModalOpen(true);
    setModalData(company);
    setName(company.name);
    setEmail(company.email);
    setLogo(company.logo);
    setAddress(company.address);
    setAboutCompany(company.aboutCompany);
    setCompanyID(company.companyID)
    setEditID(company._id);
    // set values
  }

  const deleteClick = (comp_name) => {
    // show delete confirmation msg
    swal({
      title: "Are you sure?",
      text:
        `Once deleted, you will not be able to recover ${comp_name} company!`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your company has been deleted!", {
          icon: "success",
        });
      } 
    })
  }

  // Edit company submit handler
  const onSubmitHandle = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('logo', image.data);
    data.append('address', address);
    data.append('aboutCompany', aboutCompany);
    data.append('logo_previous', logo);
    data.append('companyID', companyID)

    const response = await fetch(
      "http://localhost:8081/api/company/edit/" + editID,
      {
        method: "PUT",
        body: data,
      }
    ).then((data) => data.json());

    if ("status" in response && response.status == true) {
      setIsModalOpen(false);
      return swal("Success", response.message, "success");
    } else {
      return swal("Failed", response.message, "error");
    }
  };

  // logo image uploader
  const handleFileChange = async (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };


  // re-render page on every update
  useEffect(() => {
    handlepageLoad();
  }, [loading,isModalOpen]);

  // callback function to opdate state
  const trackOnclick = (payload) => {
    setIsModalOpen(payload);
  }

  // on List companies page first render
  const handlepageLoad = async (event) => {
    const response = await getCompanies();
    if ("status" in response && response.status == true) {
      setCompanies(response.data);
      setLoading(false);
    } else {
      return swal("Failed", "Error message", "error");
    }
  };


  
  const pageContent = (loading) ? <h1>loading</h1>: 
    <Fragment>
      <PageTitle activeMenu="All Companies" motherMenu="Company" />

      <div className="row">
        <div className="col-xl-12">
          <div className="card students-list">
            <div className="card-header border-0 flex-wrap pb-0">
              <h4>Company List here</h4>
            </div>
            <div className="card-body py-0">
              <div className="table-responsive">
                <div
                  id="student_wrapper"
                  className="dataTables_wrapper no-footer"
                >
                  {/* <Table data={data} click={clickhandler} /> */}
                  <Table data={companies} actionHandler={actionHandler} deleteClick={deleteClick}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* edit Modal */}
      {/* <UpdateCompanyProfile isModalOpen={isModalOpen} trackOnclick={trackOnclick} companyData={companies}/> */}

      <Modal className="modal fade" show={isModalOpen}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Company Details </h5>


            <Button
              variant=""
              type="button"
              className="btn-close"
              data-dismiss="modal"
              onClick={() => setIsModalOpen(false)}
            ></Button>
          </div>
          <div className="modal-body">
            <form className="company-form" onSubmit={(e) => onSubmitHandle(e)}>
              <div className="row">

                <div className="col-lg-6">
                  <div className="form-group mb-3">
                    <label htmlFor="author" className="text-black font-w600">
                      {" "}
                      Name <span className="required"></span>*
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={name}
                      onChange={(e)=>setName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group mb-3">
                    <label htmlFor="author" className="text-black font-w600">
                      {" "}
                      Company Email<span className="required">*</span>{" "}
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group mb-3">
                    <label htmlFor="author" className="text-black font-w600">
                      {" "}
                      Company Slug<span className="required">*</span>{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="companyID"
                      placeholder="Slug"
                      value={companyID}
                      onChange={(e) => setCompanyID(e.target.value)}
                      required
                    />
                  </div>
                </div>


                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <label htmlFor="author" className="text-black font-w600">
                      {" "}
                      Company Logo<span className="required">*</span>{" "}
                      ({logo})
                      <input type="hidden" name="logo-img" value={logo} />
                    </label>
                    
                    <input
                      type="file"
                      className="form-control"
                      name="logo"
                      onChange={handleFileChange}
                      accept="image/jpeg,image/jpg,image/png"
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
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <label
                      htmlFor="aboutCompany"
                      className="text-black font-w600"
                    >
                      About Company
                    </label>
                    <textarea
                      rows={3}
                      className="form-control"
                      name="aboutCompany"
                      placeholder="Tell us More"
                      value={aboutCompany}
                      onChange={(e) => setAboutCompany(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <Button
                      type="submit"
                      value="Submit"
                      className="submit btn btn-primary"
                    >
                      Submit
                    </Button>
                  </div>
                </div>





              </div>
            </form>
          </div>
        </div>
      </Modal>

      
    </Fragment>;

    return (
      <>{pageContent}</>
    );
};

export default Companies;