import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import { getData } from "../APIs";
import Filters from "./Filters";
import UsersTable from "./UsersTable";

const UnassignedUsers = () => {
  const token = useSelector((state) => state.auth.auth.token);
  const role = useSelector((state) => state.auth.auth.role);
  const loggedInID = useSelector((state) => state.auth.auth.id);
  const parentCompany = useSelector((state) => state.auth.auth.parentCompany);

  const [userUpdated,setUserUpdated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState();

  // filter states
  const [companyFilter, setCompanyFilter] = useState();
  const [deptFilter, setDeptFilter] = useState();

  const [data, setData] = useState(
    document.querySelectorAll("#student_wrapper tbody tr")
  );

  const [test, settest] = useState(0);
  const sort = 5;
  const activePag = useRef(0);

  // Active data
  const chageData = (frist, sec) => {
    for (var i = 0; i < data.length; ++i) {
      if (i >= frist && i < sec) {
        data[i].classList.remove("d-none");
      } else {
        data[i].classList.add("d-none");
      }
    }
  };

  // Active pagginarion
  activePag.current === 0 && chageData(0, sort);
  // paggination
  let paggination = Array(Math.ceil(data.length / sort))
    .fill()
    .map((_, i) => i + 1);

  // Active paggination & chage data
  const onClick = (i) => {
    activePag.current = i;
    chageData(activePag.current * sort, (activePag.current + 1) * sort);
    settest(i);
  };

  const checkUserUpdated = () => {
    setUserUpdated(true);
    // alert( "User is updated and model closed" );
  }

  // call api
  const getUserData = async (token) => {
    var API_URL = "http://localhost:8081/api/students/unassigned";

    const response = await getData(API_URL, token);
    if ("status" in response && response.status == true) {
      setUsers(response.data);
      setLoading(false);
      setUserUpdated(false);
      setData(document.querySelectorAll("#student_wrapper tbody tr"));
    } else {
      return swal("Failed", response.message, "error");
    }
  };

  

  useEffect(() => {

    // fetch users data
    getUserData(token);
    
    // setData(document.querySelectorAll("#student_wrapper tbody tr"));
  }, [ companyFilter, deptFilter, loading, userUpdated ]);

  return (
    <>
      {loading ? (
        <h3>Loading</h3>
      ) : (
        <div className="row">
          <div className="col-xl-12">
            <div className="card students-list">
              {/* filter at top */}
              
              <div className="card-body py-0">
                <div className="table-responsive">
                  <div
                    id="student_wrapper"
                    className="dataTables_wrapper no-footer"
                  >
                    {/* User listing table */}
                    <UsersTable filteredUsers={users} checkUserUpdated={checkUserUpdated}/>

                    <div className="d-sm-flex text-center justify-content-between align-items-center mt-3 mb-3">
                      <div className="dataTables_info">
                        Showing {activePag.current * sort + 1} to{" "}
                        {data.length > (activePag.current + 1) * sort
                          ? (activePag.current + 1) * sort
                          : data.length}{" "}
                        of {data.length} entries
                      </div>
                      <div
                        className="dataTables_paginate paging_simple_numbers mb-0"
                        id="application-tbl1_paginate"
                      >
                        <Link
                          className="paginate_button previous "
                          to="/users"
                          onClick={() =>
                            activePag.current > 0 &&
                            onClick(activePag.current - 1)
                          }
                        >
                          <i
                            className="fa fa-angle-double-left"
                            aria-hidden="true"
                          ></i>
                        </Link>
                        <span>
                          {paggination.map((number, i) => (
                            <Link
                              key={i}
                              to="/users"
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
                          to="/users"
                          onClick={() =>
                            activePag.current + 1 < paggination.length &&
                            onClick(activePag.current + 1)
                          }
                        >
                          <i
                            className="fa fa-angle-double-right"
                            aria-hidden="true"
                          ></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UnassignedUsers;
