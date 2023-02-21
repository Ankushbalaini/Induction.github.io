import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import ActionDropDown from "./ActionDropDown";

import UpdateUserModal from "./UpdateUserModal";
import Table from "./DataTable";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sort = 5;
  const activePag = useRef(0);
  const [loading, setLoading] = useState(true);
  const [test, settest] = useState(0);

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


  const loadImage = (imageName) => {
    return images(`./${imageName}`);
  };

  const CompanyChangeFilter = (e) => {
    setSearchCompany(e.target.value);
    setSearchDepartment('All');
    // setLoading(true);

    if (e.target.value !== 'All') {
      setDepartmentOptions(
        <DepartmentByCompany parentCompany={e.target.value} />
      );
    }
  };

  const DepartmentChangeFilter = (e) => {
    
    // change department
    setSearchDepartment(e.target.value);
    //setLoading(true);
  };

  const searchByName = (e) => {
    setSearchName(e.target.value);
    setLoading(true);
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
    if (searchCompany !== undefined && searchCompany !== 'All') {
      str = "?company=" + searchCompany;

      if (searchDepartment !== undefined) {
        str += "&deptID=" + searchDepartment;
      }

     

    }

    if (searchDepartment !== undefined && searchCompany === undefined) {
      str = "?deptID=" + searchDepartment;
    }


    

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
    // profileData,
    isModalOpen,
    isUserStatusChanged,
    searchCompany,
    searchDepartment
  ]);


  //css for button
  const buttonStyle = {
    margin: "auto",
    display: "flex",
  };


  return (
    <>
      {loading ? (
        <h3>Loading</h3>
      ) : (
        <div className="row">
          <div className="col-xl-12">
            <div className="card students-list">
              <div className="card-header border-0 ">
                <h2>Users List</h2>
              </div>

              {role === "super_admin" ? (
                <div className="btn-group" style={{display: "flex", alignItems:"end", justifyContent:"end",gap:"40px", paddingRight: "50px"}} >

          
                <div className="btn-group" >
                    <label style={{paddingRight:"10px",fontWeight:"bold",paddingTop:"12px"}} className="pb-0"> Select Company </label>
                    <select className="btn btn-white col-sm-2 border-dark"
                    style={{borderRadius:"8px"}}
                      name="search_company"
                      onChange={(e) => CompanyChangeFilter(e)}
                      value={searchCompany}>
                      <option value="All">ALL</option>
                      <CompanyDropdown />
                    </select>

                    </div>

                  <div className="btn-group">
                    <label style={{paddingRight:"10px",fontWeight:"bold",paddingTop:"12px"}}> Select Deparment </label>

                    <select className="btn btn-white col-sm-2 border-dark"
                    style={{borderRadius:"8px"}}
                      name="search_department"
                      onChange= { (e) => setSearchDepartment(e.target.value) }
                      value={searchDepartment}
                    >
                      <option value="All">All</option>
                      {departmentOptions}
                    </select>
                  </div>

                
          </div>
              ) : null}

              <div className="card-body">
                <div className="table-responsive">
                  <div
                    id="student_wrapper"
                    className="dataTables_wrapper"
                  >
                    {/* CompanyChangeFilter */}

                    {/* <label Style="margin:20px">Filter Users</label> */}


                    {role === "company" ? (
                      <div>
                        <label> Select Deparment</label>
                        <select
                          Style="margin:20px; font-size: 16px;"
                          name="search_department"
                          onChange={(e) => DepartmentChangeFilter(e)}
                        >
                          <option value="All">All</option>
                          <DepartmentByCompany parentCompany={id} />
                        </select>
                      </div>
                    ) : null}

                    {role === "instructor" ? (
                      <div className="col-sm-3">
                        <label > Select Deparment</label>
                        <select
                          Style="margin:30px; font-size: 15px;"
                          name="search_department"
                          onChange={(e) => DepartmentChangeFilter(e)}
                        >
                          <option value="All">All</option>
                          <DepartmentByCompany parentCompany={id} />
                        </select>
                      </div>
                    ) : null}

                    {/* <input Style="margin:20px; font-size: 16px;"  type="text" name="search" onChange={(e) => searchByName }  placeholder="Search......"></input> */}
                    <Table data={students} trackOnclick={trackOnclick} trackDeleteClick={trackDeleteClick} changeUserStatus={changeUserStatus} />
                    
                    
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
