import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import ActionDropDown from "./ActionDropDown";
import { getData } from "../APIs";
import UserPopup from "./UserPopup";
import CompanyDropdown from "../Companies/CompanyDropdown";
import DepartmentByCompany from "../Department/DepartmentByCompany";

const images = require.context("../../../../../images/profile/", true);

const Users = () => {
  const token = useSelector((state) => state.auth.auth.token);
  const role = useSelector((state) => state.auth.auth.role);
  const loggedInID = useSelector((state) => state.auth.auth.id);
  const parentCompany = useSelector((state) => state.auth.auth.parentCompany);


  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState();

  // filter states
  const [filteredUsers, setFilteredUsers] = useState();
  const [searchField, setSearchField] = useState("");

  const [companyFilter, setCompanyFilter] = useState();
  const [deptFilter, setDeptFilter] = useState();

  const [data, setData] = useState(
    document.querySelectorAll("#student_wrapper tbody tr")
  );

  // Edit User- Popup
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileData, setProfileData] = useState();
  const [isUserStatusChanged, setIsUserStatusChanged] = useState(false);

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
            // navigate.push("/users");
          });
        } else {
          return swal("Failed", response.message, "error");
        }
      } else {
        swal("Your status is not changed!");
      }
    });
  };

  const loadImage = (imageName) => {
    return images(`./${imageName}`);
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

  // call api
  const getUserData = async (token) => {

    var API_URL = "http://localhost:8081/api/students/";

    // company filter adding api URL
    if (companyFilter !== undefined) {
      if (companyFilter === "All") {
      } else {
        API_URL = API_URL + "?company=" + companyFilter + "&";
      }
    }

    // department filter adding api URL
    if(companyFilter !== undefined && companyFilter !== 'All' &&  deptFilter !== undefined){
      if (deptFilter === "All") {
      } else {
        API_URL = API_URL + "deptID=" + deptFilter;
      }
    }

    const response = await getData(API_URL, token);
    if ("status" in response && response.status == true) {
      setUsers(response.data);
      setFilteredUsers(response.data);
      setLoading(false);
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
      setSearchField("");
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

  const CompanyFilterHandle = (e) => {
    // set parent Company
    setCompanyFilter(e.target.value);
    setSearchField("");
  };

  const DepartmentFilterHandle = (e) =>{
    setDeptFilter(e.target.value);
    setSearchField("");
  }


  useEffect(() => {
    

    if(role === 'company'){
      setCompanyFilter(loggedInID);
    }

    if(role === 'instructor'){
      // get parent Company of instructor and set in company filter - pending
      setCompanyFilter(parentCompany);
    }

    // fetch users data
    getUserData(token);
    
    // setData(document.querySelectorAll("#student_wrapper tbody tr"));
  }, [isModalOpen, isUserStatusChanged, companyFilter, deptFilter, loading ]);


  return (
    <>
      {loading ? (
        <h3>Loading</h3>
      ) : (
        <div className="row">
          <div className="col-xl-12">
            <div className="card students-list">
              <div className="card-header border-0 flex-wrap pb-0">
                <h4>Users List</h4>

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
                    name="search"
                    id="search"
                    class="form-control"
                    placeholder="Search here..."
                    onChange={(e) => searchFilter(e)}
                  />
                </div>
                <div class="input-group">
                  {role === "super_admin" ? (
                    <>
                      <label for="company_filter">Select Company: </label>
                      <select
                        Style="margin:20px; font-size: 16px;"
                        name="company_filter"
                        onChange={(e) => CompanyFilterHandle(e)}
                      >
                        <option value="All">All</option>
                        <CompanyDropdown />
                      </select>


                      <label for="dept_filter">Select Department: </label>
                      <select
                        Style="margin:20px; font-size: 16px;"
                        name="dept_filter"
                        onChange={(e) => DepartmentFilterHandle(e)}
                      >
                        <option value="All">All</option>
                        <DepartmentByCompany parentCompany={companyFilter}/>
                        
                      </select>
                    </>
                  ) : null }




                  {role === "company" ? (
                    <>
                      <label for="dept_filter">Select Department: </label>
                      <select
                        Style="margin:20px; font-size: 16px;"
                        name="dept_filter"
                        onChange={(e) => DepartmentFilterHandle(e)}
                      >
                        <option value="All">All</option>
                        
                        <DepartmentByCompany parentCompany={loggedInID}/>
                        
                      </select>
                    </>
                  ) : null }

                  {role === "instructor" ? (
                    <>
                      <label for="dept_filter">Select Department:</label>
                      <select
                        Style="margin:20px; font-size: 16px;"
                        name="dept_filter"
                        onChange={(e) => DepartmentFilterHandle(e)}
                      >
                        <option value="All">All</option>
                        <DepartmentByCompany parentCompany={parentCompany}/>
                        
                      </select>
                    </>
                  ) : null }



                </div>
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
                          <th>Name</th>
                          <th>Email</th>
                          <th>Join Date</th>
                          <th>Status</th>
                          <th Style="text-align: end">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((user, index) => (
                          <tr key={index}>
                            <td>
                              <div className="d-flex align-items-center">
                                <img
                                  src={loadImage(user.profile.profilePhoto)}
                                  alt=""
                                />
                                <h4 className="mb-0 fs-16 font-w500">
                                  {user.profile?.first_name}{" "}
                                  {user.profile?.last_name}
                                </h4>
                              </div>
                            </td>
                            <td>{user.email}</td>
                            <td>
                              {new Date(user.createdAt).toLocaleDateString(
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
                                  user.status ? "badge-success" : "badge-danger"
                                }`}
                                to="/users"
                                onClick={() =>
                                  changeUserStatus(user._id, user.status)
                                }
                              >
                                {user.status ? "Active" : "Inactive"}
                              </Link>
                            </td>
                            <td>
                              <ActionDropDown
                                trackOnclick={trackOnclick}
                                profileData={user}
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

          {/* Update User popUp */}
          {isModalOpen ? (
            <UserPopup
              isModalOpen={isModalOpen}
              trackOnclick={trackOnclick}
              profileData={profileData}
            />
          ) : null}
        </div>
      )}
    </>
  )
}

export default Users;