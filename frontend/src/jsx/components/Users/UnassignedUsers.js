import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import { getData } from "../APIs";
import UsersTable from "./UsersTable";
import PageTitle from "../../layouts/PageTitle";
import { API_ROOT_URL } from "../../constants";

const UnassignedUsers = () => {
  const token = useSelector((state) => state.auth.auth.token);
  const role = useSelector((state) => state.auth.auth.role);
  const loggedInID = useSelector((state) => state.auth.auth.id);
  const parentCompany = useSelector((state) => state.auth.auth.parentCompany);

  const [userUpdated, setUserUpdated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState();

  // filter states
  const [companyFilter, setCompanyFilter] = useState();
  const [deptFilter, setDeptFilter] = useState();

  const [filteredUsers, setFilteredUsers] = useState();
  const [searchField, setSearchField] = useState("");

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
  };

  // call api
  const getUserData = async (token) => {
    var API_URL = `${API_ROOT_URL}/students/unassigned`;

    const response = await getData(API_URL, token);
    if ("status" in response && response.status == true) {
      setUsers(response.data);
      setFilteredUsers(response.data);
      setLoading(false);
      setUserUpdated(false);
      setData(document.querySelectorAll("#student_wrapper tbody tr"));
    } else {
      return swal("Failed", response.message, "error");
    }
  };

  //
  const searchFilter = (e) => {
    const searchVal = e.target.value.trim();
    //setSearchField(searchVal);

    if (searchVal === "" || searchVal.length < 2) {
      //setSearchField("");
      setFilteredUsers(users);
      setData(document.querySelectorAll("#student_wrapper tbody tr"));
    } else {
      const filterUsers = users.filter((user) => {
        var fullname = user.profile.first_name + " " + user.profile.last_name;
        return (
          fullname.toLowerCase().includes(searchVal.toLowerCase()) ||
          user.email.toLowerCase().includes(searchVal.toLowerCase())
        );
      });
      setFilteredUsers(filterUsers);
      setSearchField(searchVal);
      setData(document.querySelectorAll("#student_wrapper tbody tr"));
    }
  };

  useEffect(() => {
    // fetch users data
    getUserData(token);

    // setData(document.querySelectorAll("#student_wrapper tbody tr"));
  }, [companyFilter, deptFilter, loading, userUpdated]);

  return (
    <>
      {loading ? (
        <h3>Loading</h3>
      ) : (
        <>
          <PageTitle activeMenu="Unassigned Users" motherMenu="Users" />
          <div className="row">
            <div className="col-xl-12">
              <div className="card students-list">
                <div className="card-header border-0 flex-wrap pb-6">
                  <h3>UNASSIGNED USERS LIST</h3>

                  <div class="input-group search-area w-auto pb-3">
                    <span class="input-group-text">
                      <a href="/react/demo/instructor-students">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M27.414 24.586L22.337 19.509C23.386 17.928 24 16.035 24 14C24 8.486 19.514 4 14 4C8.486 4 4 8.486 4 14C4 19.514 8.486 24 14 24C16.035 24 17.928 23.386 19.509 22.337L24.586 27.414C25.366 28.195 26.634 28.195 27.414 27.414C28.195 26.633 28.195 25.367 27.414 24.586ZM7 14C7 10.14 10.14 7 14 7C17.86 7 21 10.14 21 14C21 17.86 17.86 21 14 21C10.14 21 7 17.86 7 14Z"
                            fill="var(--primary)"
                          ></path>
                        </svg>
                      </a>
                    </span>
                    <input
                      type="text"
                      name="search"
                      id="search"
                      class="form-control"
                      placeholder="Search here..."
                      onChange={(e) => searchFilter(e)}
                    />
                  </div>
                </div>

                {/* filter at top */}

                <div className="card-body py-0">
                  <div className="table-responsive">
                    <div
                      id="student_wrapper"
                      className="dataTables_wrapper no-footer"
                    >
                      {/* User listing table */}
                      <UsersTable
                        filteredUsers={filteredUsers}
                        checkUserUpdated={checkUserUpdated}
                        redirectTo="unassigned-users"
                      />

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
                            to="/unassigned-users"
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
                                to="/unassigned-users"
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
                            to="/unassigned-users"
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
        </>
      )}
    </>
  );
};

export default UnassignedUsers;
