import React, { useRef, useEffect, useState } from "react";
import swal from "sweetalert";
// import UpdateUserModal from "./UpdateUserModal";
import UpdateUserModal from "./UserPopup";
import Table from "./DataTable";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import CompanyDropdown from "../Companies/CompanyDropdown";
import DepartmentByCompany from "../Department/DepartmentByCompany";
import PageTitle from "../../layouts/PageTitle";
import {API_ROOT_URL} from "../../constants";
import LoadingSpinner from "../../pages/LoadingSpinner";

const USER_ROLES = {
  SUPER_ADMIN: "super_admin",
  COMPANY: "company",
  INSTRUCTOR: "instructor",
  USER: "user",
};

const Users = () => {
  const navigate = useHistory();
  const token = useSelector((state) => state.auth.auth.token);
  const id = useSelector((state) => state.auth.auth.id);
  const userRole = useSelector((state) => state.auth.auth.role);
  const [searchCompany, setSearchCompany] = useState();
  const [searchDepartment, setSearchDepartment] = useState();
  const [departmentOptions, setDepartmentOptions] = useState();
  const [data, setData] = useState(
    document.querySelectorAll("#student_wrapper tbody tr")
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isUserStatusChanged, setIsUserStatusChanged] = useState(false);
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
  const [students, setStudents] = useState([]);

  const CompanyChangeFilter = (e) => {
    setSearchCompany(e.target.value);
    setSearchDepartment("All");
    if (e.target.value !== "All") {
      setDepartmentOptions(
        <DepartmentByCompany parentCompany={e.target.value} />
      );
    }
  };

  // change department
  const DepartmentChangeFilter = (e) => {
    setSearchDepartment(e.target.value);
  };

  // callback function to opdate state
  const trackOnclick = (payload, userData) => {
    setIsModalOpen(payload);
    if (userData) {
      setProfileData(userData);
    }
  };
  // callback function to update state
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
          `${API_ROOT_URL}/users/changeUserStatus`,
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
            setIsUserStatusChanged(!isUserStatusChanged);
            //navigate.push("/students");
          });
        } else {
          return swal("Failed", response.message, "error");
        }
      } else {
        swal("Your status is not changed!");
      }
      handlepageLoad();
    });
  };
  const handlepageLoad = async (event) => {
    var str = "";
    if (searchCompany !== undefined && searchCompany !== "All") {
      str = "?company=" + searchCompany;
      if (searchDepartment !== undefined) {
        str += "&deptID=" + searchDepartment;
      }
    }
    if (searchDepartment !== undefined && searchCompany === undefined) {
      str = "?deptID=" + searchDepartment;
    }
    const response = await fetch(`${API_ROOT_URL}/students/${str}`, {
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
    // profileData,
    isModalOpen,
    isUserStatusChanged,
    searchCompany,
    searchDepartment,
  ]);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <PageTitle activeMenu="Users List" motherMenu="Users" />

          <div className="row">
            <div className="col-xl-12">
              <div className="card students-list">
                <div className="card-header border-0 ">
                  <h4 className="card-titlhandleSubmite">Assigned Users</h4>
                  {USER_ROLES.SUPER_ADMIN === userRole ? (
                    <div className="row">
                      <div
                        className="btn-group"
                        style={{
                          display: "flex",
                          alignItems: "end",
                          justifyContent: "end",
                          gap: "40px",
                          paddingRight: "20px",
                        }}
                      >
                        <div className="btn-group">
                          <label
                            style={{
                              paddingRight: "10px",
                              fontWeight: "bold",
                              paddingTop: "12px",
                            }}
                            className="pb-0"
                          >
                            {" "}
                            Select Company{" "}
                          </label>

                          <select
                            className="btn btn-white col-sm-2 border-light"
                            style={{ borderRadius: "8px" }}
                            name="search_company"
                            onChange={(e) => CompanyChangeFilter(e)}
                            value={searchCompany}
                          >
                            <option value="All">ALL</option>
                            <CompanyDropdown />
                          </select>
                        </div>

                        <div className="btn-group">
                          <label
                            style={{
                              paddingRight: "10px",
                              fontWeight: "bold",
                              paddingTop: "12px",
                            }}
                          >
                            {" "}
                            Select Department{" "}
                          </label>

                          <select
                            className="btn btn-white col-sm-2 border-light"
                            style={{ borderRadius: "8px" }}
                            name="search_department"
                            onChange={(e) =>
                              setSearchDepartment(e.target.value)
                            }
                            value={searchDepartment}
                          >
                            <option value="All">All</option>
                            {departmentOptions}
                          </select>
                        </div>
                      </div>
                      </div>
                  ) : null}
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <div id="student_wrapper" className="dataTables_wrapper">
                      {/* CompanyChangeFilter */}
                      {/* <label Style="margin:20px">Filter Users</label> */}
                      {USER_ROLES.COMPANY === userRole ? (
                        <div style={{display:"flex", justifyContent:"end", paddingBottom:"50px"}}>
                          <label
                          
                           style={{
                             paddingRight: "10px",
                             fontWeight: "bold",
                             paddingTop: "12px",
                             paddingBottom:"30px",
                           }}
                           className="pb-0"
                      
                          > 
                          Select Deparment</label>
                          <select
                            className="btn btn-white col-xl-2 border-light"
                            style={{ borderRadius: "8px", marginRight:"20px" }}
                            name="search_department"
                            onChange={(e) => DepartmentChangeFilter(e)}
                          >
                            <option value="All">All</option>
                            <DepartmentByCompany parentCompany={id} />
                          </select>
                        </div>
                        
                      ) : null}
                      {USER_ROLES.INSTRUCTOR === userRole ? (
                        <div style={{display:"flex",justifyContent:"end"}}>
                        <div className="col-xl-3 d-flex float-right">
                          <label style={{fontWeight:600,margin:"auto",display:"flex", justifyContent:"end" }}> Select Deparment</label>
                          <select
                           className="btn"
                           style={{padding:10, margin:3}}
                            name="search_department"
                            onChange={(e) => DepartmentChangeFilter(e)}
                          >
                            <option value="All">All</option>
                            <DepartmentByCompany parentCompany={id} />
                          </select>
                        </div>
                        </div>
                      ) : null}

                      {/* <input Style="margin:20px; font-size: 16px;"  type="text" name="search" onChange={(e) => searchByName }  placeholder="Search......"></input> */}
                    </div>
                    <Table
                      data={students}
                      trackOnclick={trackOnclick}
                      trackDeleteClick={trackDeleteClick}
                      changeUserStatus={changeUserStatus}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <UpdateUserModal
        isModalOpen={isModalOpen}
        trackOnclick={trackOnclick}
        profileData={profileData}
      />
    </>
  );
};
export default Users;
