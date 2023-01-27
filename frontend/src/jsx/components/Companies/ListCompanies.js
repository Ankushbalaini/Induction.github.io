import React, { Fragment, useState, useRef, useEffect } from "react";
import PageTitle from "../../layouts/PageTitle";
import swal from "sweetalert";
import Form from "react-bootstrap/Form";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";

import Table from './DataTable';
import data from './data';


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

const ListCompanies = () => {
  const navigate = useHistory();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [logo, setLogo] = useState();
  const [address, setAddress] = useState();
  const [aboutCompany, setAboutCompany] = useState();
  const [companies, setCompanies] = useState();
  const [editHere, seteditHere] = useState(false);
  const [image, setImage] = useState({ preview: "", data: "" });

  const [updateValue, setUpdateValue] = useState("");
  const [editID, setEditID] = useState();

  const clickhandler = name => console.log("delete", name);
  
  // set up values inside modal popup
  const openModel = (rowData) => {
    setEditID(rowData._id);
    setName(rowData.name);
    setEmail(rowData.email);
    setLogo(rowData.logo);
    setAddress(rowData.address);
    setAboutCompany(rowData.aboutCompany);
    seteditHere(true);
  };

  // re-render page on every update
  useEffect(() => {
    handlepageLoad();
    //console.log(companies);

  }, [editHere]);


  //css for button
  const mystyle = {
    margin: "auto",
    display: "flex",
  };

  const loadImage = (imageName) => {
    return images(`./${imageName}`);
  }


  // logo image uploader
  const handleFileChange = async (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  // update submit handler
  const onSubmitHandle = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('logo', image.data);
    data.append('address', address);
    data.append('aboutCompany', aboutCompany);
    data.append('logo_previous', logo);

    const response = await fetch(
      "http://localhost:8081/api/company/edit/" + editID,
      {
        method: "PUT",
        body: data,
      }
    ).then((data) => data.json());

    if ("status" in response && response.status == true) {
      seteditHere(false);
      return swal("Success", response.message, "success");
    } else {
      return swal("Failed", response.message, "error");
    }
  };

  

  // on List companies page first render
  const handlepageLoad = async (event) => {
    const response = await getCompanies();
    if ("status" in response && response.status == true) {
      // setCompanies(response.data);

      
      const rows = response.data.map((row, index) => (
        // Only do this if items have no stable IDs
        <tr key={index}>
          <td>
            <div className="d-flex align-items-center">
              <h4 className="mb-0 fs-16 font-w500">
                {row.name}({row.companyID})
              </h4>
            </div>
          </td>
          <td>{row.email}</td>
          <td>{row.aboutCompany}</td>
          <td>{row.address}</td>
          <td>
            <span classname={`badge  light badge-success`}>{row.status}</span>
          </td>

          <td>
          <Dropdown>
          <Dropdown.Toggle
            as="a"
            className="btn-link i-false btn sharp tp-btn-light btn-dark"
          >
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.0012 9.86C11.6544 9.86 11.3109 9.92832 10.9905 10.061C10.67 10.1938 10.3789 10.3883 10.1336 10.6336C9.88835 10.8788 9.6938 11.17 9.56107 11.4905C9.42834 11.8109 9.36002 12.1544 9.36002 12.5012C9.36002 12.848 9.42834 13.1915 9.56107 13.5119C9.6938 13.8324 9.88835 14.1236 10.1336 14.3688C10.3789 14.6141 10.67 14.8086 10.9905 14.9413C11.3109 15.0741 11.6544 15.1424 12.0012 15.1424C12.7017 15.1422 13.3734 14.8638 13.8687 14.3684C14.3639 13.873 14.642 13.2011 14.6418 12.5006C14.6417 11.8001 14.3632 11.1284 13.8678 10.6332C13.3724 10.138 12.7005 9.85984 12 9.86H12.0012ZM3.60122 9.86C3.25437 9.86 2.91092 9.92832 2.59048 10.061C2.27003 10.1938 1.97887 10.3883 1.73361 10.6336C1.48835 10.8788 1.2938 11.17 1.16107 11.4905C1.02834 11.8109 0.960022 12.1544 0.960022 12.5012C0.960022 12.848 1.02834 13.1915 1.16107 13.5119C1.2938 13.8324 1.48835 14.1236 1.73361 14.3688C1.97887 14.6141 2.27003 14.8086 2.59048 14.9413C2.91092 15.0741 3.25437 15.1424 3.60122 15.1424C4.30171 15.1422 4.97345 14.8638 5.46866 14.3684C5.96387 13.873 6.24198 13.2011 6.24182 12.5006C6.24166 11.8001 5.96324 11.1284 5.46781 10.6332C4.97237 10.138 4.30051 9.85984 3.60002 9.86H3.60122ZM20.4012 9.86C20.0544 9.86 19.7109 9.92832 19.3905 10.061C19.07 10.1938 18.7789 10.3883 18.5336 10.6336C18.2884 10.8788 18.0938 11.17 17.9611 11.4905C17.8283 11.8109 17.76 12.1544 17.76 12.5012C17.76 12.848 17.8283 13.1915 17.9611 13.5119C18.0938 13.8324 18.2884 14.1236 18.5336 14.3688C18.7789 14.6141 19.07 14.8086 19.3905 14.9413C19.7109 15.0741 20.0544 15.1424 20.4012 15.1424C21.1017 15.1422 21.7734 14.8638 22.2687 14.3684C22.7639 13.873 23.042 13.2011 23.0418 12.5006C23.0417 11.8001 22.7632 11.1284 22.2678 10.6332C21.7724 10.138 21.1005 9.85984 20.4 9.86H20.4012Z"
                fill="#A098AE"
              />
            </svg>
          </Dropdown.Toggle>
          <Dropdown.Menu
            className="dropdown-menu dropdown-menu-end"
            align="right"
          >
            <Dropdown.Item onClick={() => openModel(row)}>
              Edit
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

            
          </td>

          <td>
            <span className={`badge  light badge-success`}>{row.status}</span>
          </td>
        </tr>
      ));
      setCompanies(rows);
      
    } else {
      return swal("Failed", "Error message", "error");
    }
  };

  // handlepageLoad();

  return (
    <Fragment>
      <PageTitle activeMenu="All Companies" motherMenu="Company" />

      <div className="row">
        <div className="col-xl-12">
          <div className="card students-list">
            <div className="card-header border-0 flex-wrap pb-0">
              <h4>Company List</h4>
            </div>
            <div className="card-body py-0">
              <div className="table-responsive">
                <div
                  id="student_wrapper"
                  className="dataTables_wrapper no-footer"
                >
                  <table
                    className="table display mb-4 dataTablesCard order-table card-table text-black application "
                    id="application-tbl1_next"
                  >
                    <thead>
                      <tr>
                        <th>Name (ID)</th>
                        <th>Email</th>
                        <th>About Company</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>

                      { companies }
                      
                      
                    </tbody>
                  </table>
                </div>

                <Table data={data} click={clickhandler} />

              </div>
            </div>
          </div>
        </div>
      </div>
      {/* edit Modal */}

      <Modal className="modal fade" show={editHere}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Company Details </h5>
            <Button
              variant=""
              type="button"
              className="btn-close"
              data-dismiss="modal"
              onClick={() => seteditHere(false)}
            ></Button>
          </div>
          <div className="modal-body">
            <form className="comment-form" onSubmit={(e) => onSubmitHandle(e)}>
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group mb-3">
                    <label htmlFor="author" className="text-black font-w600">
                      {" "}
                      Name <span className="required"></span>
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group mb-3">
                    <label htmlFor="author" className="text-black font-w600">
                      {" "}
                      Company Email<span className="required"></span>{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="company email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group mb-3">
                    <label htmlFor="author" className="text-black font-w600">
                      {" "}
                      Company Logo<span className="required"></span>{" "}
                    </label>
                    
                    <input
                      type="file"
                      className="form-control"
                      name="logo"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                
                <div className="col-lg-6">
                  <div className="form-group mb-3">
                    <input type="hidden" name="logo-img" value={logo} />
                    {/* <img src={loadImage(logo)} /> */}
                    {logo}
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
                      placeholder="add Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
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
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <Button
                      type="submit"
                      value="Submit"
                      className="submit btn btn-primary"
                      style={mystyle}
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
    </Fragment>
  );
};

export default ListCompanies;
