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
              </div>

              {role === "super_admin" ? (
                      <div >
                           <select className="btn btn-white col-sm-2 border-dark"
                          Style="margin:20px; font-size: 16px; float:right"
                          name="search_department"
                          onChange={(e) => setSearchDepartment(e.target.value)}
                          defaultValue={searchDepartment}
                        >
                          <option>Select Department</option>
                          {departmentOptions}
                        </select>
                        <select className="btn btn-white col-sm-2 border-dark"
                          Style="margin:20px; font-size: 16px; float:right"
                          name="search_company"
                          onChange={(e) => CompanyChangeFilter(e)}
                          defaultValue={searchCompany}
                        >
                          <option className="col-lg-4" >Select Company</option>
                          <CompanyDropdown />
                        </select>
                     
                </div>
                    ) : null}

              <div className="card-body">
                <div className="table-responsive">
                  <div
                    id="student_wrapper"
                    className="dataTables_wrapper"
                  >       
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
                    <div className="wrapper-paggination-style"> 
                    </div>
                  </div>
                  <Table data={students} trackOnclick={trackOnclick} trackDeleteClick={trackDeleteClick}/>

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
