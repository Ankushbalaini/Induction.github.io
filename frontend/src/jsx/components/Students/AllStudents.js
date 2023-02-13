import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import ActionDropDown from "./ActionDropDown";

import UpdateUserModal from "./UpdateUserModal";

import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import CompanyDropdown from "../Companies/CompanyDropdown";
import DepartmentByCompany from "../Department/DepartmentByCompany";

const images = require.context("../../../../../images/profile/", true);

const AllStudents = () => {
  const navigate = useHistory();
  const token = useSelector((state) => state.auth.auth.token);
  const id = useSelector((state) => state.auth.auth.id);
  const role = useSelector((state) => state.auth.auth.role);

  const [searchCompany, setSearchCompany] = useState();
  const [searchDepartment, setSearchDepartment] = useState();
  const [searchName, setSearchName] = useState();
  const [departmentOptions, setDepartmentOptions] = useState();

  const [data, setData] = useState(
    document.querySelectorAll("#student_wrapper tbody tr")
  );
  const sort = 5;
  const activePag = useRef(0);
  const [loading, setLoading] = useState(true);
  const [test, settest] = useState(0);
  const [students, setStudents] = useState(0);
  const [profileData, setProfileData] = useState({
    email: "",
    createdAt: "",
    profile: {
      first_name: "",
      last_name: "",
      profilePhoto: "dummy-user.png",
      aboutMe: "",
      address: "",
    },
  });

  // model popup usestate
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserStatusChanged, setIsUserStatusChanged] = useState(false);

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

  const loadImage = (imageName) => {
    return images(`./${imageName}`);
  };

  const CompanyChangeFilter = (e) => {
    setSearchCompany(e.target.value);
    setLoading(true);

    setDepartmentOptions(
      <DepartmentByCompany parentCompany={e.target.value} />
    );
  };

  const DepartmentChangeFilter = (e) => {
    // change department
    setSearchDepartment(e.target.value);
    setLoading(true);
  };

  const searchByName = (e) => {
    setSearchName(e.target.value);
    setLoading(true);
  };

  // change status
  const changeUserStatus = (userID, status) => {
    // user id
    swal({
      title: "Are you sure?",
      text: `Once status Changed, User will get or loss access to account`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willChange) => {
      if (willChange) {
        const response = await fetch(
          "http://localhost:8081/api/users/changeUserStatus",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": token,
            },
            body: JSON.stringify({ userID: userID, status: status }),
          }
        ).then((data) => data.json());

        if ("status" in response && response.status == true) {
          swal("Poof! Your record has been updated!", {
            icon: "success",
          }).then(() => {
            setIsUserStatusChanged(true);
            //navigate.push("/students");
          });
        } else {
          return swal("Failed", response.message, "error");
        }
      } else {
        swal("Your status is not changed!");
      }
    });
  };

  // callback function to opdate state
  const trackOnclick = (payload, pdata) => {
    if (pdata) {
      setProfileData(pdata);
    }
    setIsModalOpen(payload);
  };

  // callback function to opdate state
  const trackDeleteClick = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this record!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your record has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your record is safe!");
      }
    });
  };

  const handlepageLoad = async (event) => {
    var str = "";
    if (searchCompany !== undefined) {
      str = "?company=" + searchCompany;

      if (searchDepartment !== undefined) {
        str += "&deptID=" + searchDepartment;
      }
    }

    if (searchDepartment !== undefined && searchCompany === undefined) {
      str = "?deptID=" + searchDepartment;
    }

    // else{
    //   str = "?deptID="+searchDepartment;
    // }

    const response = await fetch("http://localhost:8081/api/students/" + str, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    }).then((data) => data.json());

    if ("status" in response && response.status == true) {
      setStudents(response.data);
      setLoading(false);
      setIsUserStatusChanged(false);
      setData(document.querySelectorAll("#student_wrapper tbody tr"));
    } else {
      return swal("Failed", response.message, "error");
    }
  };

  // use effect
  useEffect(() => {
    handlepageLoad();
    setData(document.querySelectorAll("#student_wrapper tbody tr"));
  }, [
    profileData,
    isModalOpen,
    isUserStatusChanged,
    searchCompany,
    searchDepartment,
  ]);

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

  //css for button
  const buttonStyle = {
    margin: "auto",
    display: "flex",
  };

  const sortByName = () => {
    //
    alert("Here");
  };

  return (
    <>
      {loading ? (
        <h3>Loading</h3>
      ) : (
        <div className="row">
          <div className="col-xl-12">
            <div className="card students-list">
              <div className="card-header border-0 flex-wrap pb-0">
                <h4>Students List</h4>

                <div class="input-group search-area w-auto">
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
                    class="form-control"
                    placeholder="Search here..."
                  />
                </div>
              </div>

              <div className="card-body py-0">
                <div className="table-responsive">
                  <div
                    id="student_wrapper"
                    className="dataTables_wrapper no-footer"
                  >
                    {/* CompanyChangeFilter */}

                    {/* <label Style="margin:20px">Filter Users</label> */}

                    {role === "super_admin" ? (
                      <>
                        <select
                          Style="margin:20px; font-size: 16px;"
                          name="search_company"
                          onChange={(e) => CompanyChangeFilter(e)}
                          defaultValue={searchCompany}
                        >
                          <option>Select Company</option>
                          <CompanyDropdown />
                        </select>
                        {/* <label Style="margin:20px">Select Department</label> */}
                        <select
                          Style="margin:20px; font-size: 16px;"
                          name="search_department"
                          onChange={(e) => setSearchDepartment(e.target.value)}
                          defaultValue={searchDepartment}
                        >
                          <option>Select Department</option>
                          {departmentOptions}
                        </select>
                      </>
                    ) : null}

                    {role === "company" ? (
                      <>
                        <select
                          Style="margin:20px; font-size: 16px;"
                          name="search_department"
                          onChange={(e) => setSearchDepartment(e.target.value)}
                        >
                          <option value="all">All</option>
                          <DepartmentByCompany parentCompany={id} />
                        </select>
                      </>
                    ) : null}

                    {role === "instructor" ? (
                      <>
                        <select
                          Style="margin:20px; font-size: 16px;"
                          name="search_department"
                          onChange={(e) => setSearchDepartment(e.target.value)}
                        >
                          <option value="all">All</option>
                          <DepartmentByCompany parentCompany={id} />
                        </select>
                      </>
                    ) : null}

                    {/* <input Style="margin:20px; font-size: 16px;"  type="text" name="search" onChange={(e) => searchByName }  placeholder="Search......"></input> */}

                    <table
                      className="table display mb-4 dataTablesCard order-table card-table text-black application "
                      id="application-tbl1_next"
                    >
                      <thead>
                        <tr>
                          <th onClick={sortByName}>Name</th>
                          <th>Student ID</th>
                          <th>Join Date</th>
                          <th>Status</th>
                          <th Style="text-align: end">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map((row, index) => (
                          <tr key={index}>
                            <td>
                              <div className="d-flex align-items-center">
                                <img
                                  src={loadImage(row.profile.profilePhoto)}
                                  alt=""
                                />
                                <h4 className="mb-0 fs-16 font-w500">
                                  {row.profile?.first_name}{" "}
                                  {row.profile?.last_name}
                                </h4>
                              </div>
                            </td>
                            <td>{row.email}</td>
                            <td>
                              {new Date(row.createdAt).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                }
                              )}
                            </td>
                            <td>
                              <Link
                                className={`badge light ${
                                  row.status ? "badge-success" : "badge-danger"
                                }`}
                                to="/students"
                                onClick={() =>
                                  changeUserStatus(row._id, row.status)
                                }
                              >
                                {row.status ? "Active" : "Inactive"}
                              </Link>
                            </td>
                            <td>
                              <ActionDropDown
                                trackOnclick={trackOnclick}
                                profileData={row}
                                trackDeleteClick={trackDeleteClick}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
                          to="/students"
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
                              to="/students"
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
                          to="/students"
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

      <UpdateUserModal
        isModalOpen={isModalOpen}
        trackOnclick={trackOnclick}
        profileData={profileData}
      />
    </>
  );
};
export default AllStudents;
