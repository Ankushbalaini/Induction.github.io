import React, { Fragment, useState, useRef, useEffect } from "react";
import PageTitle from "../../layouts/PageTitle";
import swal from "sweetalert";
import { useHistory, Link } from "react-router-dom";

const ListCompanies = () => {
  const navigate = useHistory();
  const [name, setName] = useState();
  const [companyID, setCompanyID] = useState();
  const [logo, setLogo] = useState();
  const [address, setAddress] = useState();
  const [companies, setCompanies] = useState();

  useEffect(() => {
    const handlepageLoad = async (event) => {
      //event.preventDefault();
      const response = await getCompanies();

      if ("status" in response && response.status == true) {
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
              <span className={`badge  light badge-success`}>{row.status}</span>
            </td>
            <td>
              <Link to={`/company-detail/${row._id}`}>View </Link>
            </td>
          </tr>
        ));
        setCompanies(rows);
      } else {
        return swal("Failed", "Error message", "error");
      }
    };

    handlepageLoad();
  }, []);

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
                        <th>About Company ID</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>Action</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>{companies}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ListCompanies;
