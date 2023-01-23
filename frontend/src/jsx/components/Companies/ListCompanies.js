import React, { useState, useEffect, Fragment,  useRef } from "react";
// import { Table, Pagination } from "react-bootstrap";

import data from "../table/tableData.js";
import PageTitle from "../../layouts/PageTitle";
import swal from "sweetalert";
import { useHistory, Link } from "react-router-dom";


const columns = [
    "",
    "Name",
    "Department",
    "Gender",
    "Education",
    "Mobile",
    "Email",
    "Joining Date",
    "Action",
 ];


const ListCompanies = () => {
    const [data, setdata] = useState();

  



  useEffect(() => {
    const handlepageLoad = async (event) => {
      //event.preventDefault();
      const response = await getCompanies();

      if ("status" in response && response.status == true) {
        
        setdata(response.data);
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


    const sort = 3;
  let paggination = Array(Math.ceil(10 / sort))
      .fill()
      .map((_, i) => i + 1);

  const activePag = useRef(0);
  const jobData = useRef(
      data.slice(
      activePag.current * sort,
      (activePag.current + 1) * sort
      )
  );
  //const [demo, setdemo] = useState();
  const onClick = (i) => {
      activePag.current = i;

      jobData.current = data.slice(
      activePag.current * sort,
      (activePag.current + 1) * sort
      );
      
  };
  





  return (
    <div className="col-12">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Profile Datatable</h4>
        </div>
        <div className="card-body">
          <div className="w-100 table-responsive">
            <div id="example_wrapper" className="dataTables_wrapper">
              <table id="example" className="display w-100 dataTable">
                <thead>
                  <tr role="row">
                    {/* {columns.map((d, i) => (
                      <th key={i}>{d}</th>
                    ))} */}
                  </tr>
                </thead>
                <tbody>
                  {/* {jobData.current.map((d, i) => (
                    <tr key={i}>
                      {d.map((da, i) => (
                        <Fragment key={i}>
                          <td>
                            {i === 0 ? (
                              <img
                                className="rounded-circle"
                                width="35"
                                src={da}
                                alt=""
                              />
                            ) : (
                              <Fragment>
                                {da}
                                {i === 8 && (
                                  <div className="d-flex">
                                    <Link
                                      to="#"
                                      className="btn btn-primary shadow btn-xs sharp me-1"
                                    >
                                      <i className="fas fa-pencil-alt"></i>
                                    </Link>
                                    <Link
                                      to="#"
                                      className="btn btn-danger shadow btn-xs sharp"
                                    >
                                      <i className="fa fa-trash"></i>
                                    </Link>
                                  </div>
                                )}
                              </Fragment>
                            )}
                          </td>
                        </Fragment>
                      ))}
                    </tr>
                  ))} */}
                </tbody>
                
              </table>

              <div className="d-sm-flex text-center justify-content-between align-items-center mt-3 mb-2">
                <div className="dataTables_info">
                  Showing {activePag.current * sort + 1} to{" "}
                  {data.length > (activePag.current + 1) * sort
                    ? (activePag.current + 1) * sort
                    : data.length}{" "}
                  of {data.length} entries
                </div>
                <div
                  className="dataTables_paginate paging_simple_numbers mb-0"
                  id="example5_paginate"
                >
                  <Link
                    className="paginate_button previous disabled"
                    to="/table-datatable-basic"
                    onClick={() =>
                      activePag.current > 0 && onClick(activePag.current - 1)
                    }
                  >
                    <i className="fa fa-angle-double-left" aria-hidden="true"></i>
                  </Link>
                  <span>
                    {paggination.map((number, i) => (
                      <Link
                        key={i}
                        to="/table-datatable-basic"
                        className={`paginate_button  ${
                          activePag.current === i ? "current" : ""
                        } `}
                        onClick={() => onClick(i)}
                      >
                        {number}
                      </Link>
                    ))}
                  </span>
                  <Link
                    className="paginate_button next"
                    to="/table-datatable-basic"
                    onClick={() =>
                      activePag.current + 1 < paggination.length &&
                      onClick(activePag.current + 1)
                    }
                  >
                    <i className="fa fa-angle-double-right" aria-hidden="true"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCompanies;
