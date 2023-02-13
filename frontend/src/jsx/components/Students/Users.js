import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import ActionDropDown from "./ActionDropDown";
import { getData } from "../APIs";
import UserPopup from "./UserPopup";



const images = require.context("../../../../../images/profile/", true);

const Users = () => {
  const token = useSelector((state) => state.auth.auth.token);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState();
  const [searchField, setSearchField] = useState("");
  const [data, setData] = useState(
    document.querySelectorAll("#student_wrapper tbody tr")
  );

  // Edit User- Popup
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileData, setProfileData] = useState();

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

  const changeUserStatus = () => {};

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
    const response = await getData(
      "http://localhost:8081/api/students/",
      token
    );
    if ("status" in response && response.status == true) {
      setUsers(response.data);
      setLoading(false);
      setData(document.querySelectorAll("#student_wrapper tbody tr"));
    } else {
      return swal("Failed", response.message, "error");
    }
  };


  //  
  const searchFilter = (e) =>{
    // map function for filter users and set New users
    setSearchField(e.target.value);

    // setUsers(response.data);

    // console.log(e.target.value);
  }

  useEffect(() => {
    // fetch users data
    getUserData(token);
  }, [isModalOpen]);

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
                    class="form-control"
                    placeholder="Search here..."
                    onChange={(e) => searchFilter(e) }
                  />
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
                        {users.map((user, index) => (
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
                                to="/students"
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

          {/* Update User popUp */}
          {(isModalOpen) ? 
          <UserPopup
            isModalOpen={isModalOpen}
            trackOnclick={trackOnclick}
            profileData={profileData}
          />
          : null }
        </div>
      )}
    </>
  );
};
export default Users;
