import React, { useRef, useEffect, useState } from "react";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import UpdateProfile from "./UpdateProfile";
import CompanyDropdown from "../Companies/CompanyDropdown";
import DepartmentByCompany from "../Department/DepartmentByCompany";
import Table from "./DataTable";
import PageTitle from "../../layouts/PageTitle";
import { API_ROOT_URL } from "../../constants";

const USER_ROLES = {
  SUPER_ADMIN: "super_admin",
  COMPANY: "company",
  INSTRUCTOR: "instructor",
  USER: "user",
};

// api call
async function getInstructorApi(role, companyID, deptID) {
  var getInstructorsApi = `${API_ROOT_URL}/instructor/list`;
  if (USER_ROLES.COMPANY === role) {
    var getInstructorsApi =
      `${API_ROOT_URL}/instructor/listByCompany?role=company&parentCompany=${companyID}`;
  }
  return fetch(getInstructorsApi, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
}

/**
 * Instructor API call to filter byb company.
 *
 * @param {*} companyID
 * @returns
 */
async function filterInstructorApi(companyID, deptID) {
  let filterInstructorsApi =
    `${API_ROOT_URL}/instructor/filterByCompany?filterByCompany=${companyID}`;
  if (companyID == "all") {
    filterInstructorsApi = `${API_ROOT_URL}/instructor/list`;
  }
  return fetch(filterInstructorsApi, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
}

const Instructors = () => {
  const userID = useSelector((state) => state.auth.auth.id);
  const role = useSelector((state) => state.auth.auth.role);
  const token = useSelector((state) => state.auth.auth.token);
  const parentCompany = useSelector((state) => state.auth.auth.id);

  const [companyID, setCompanyID] = useState();
  const [deptID, setDeptID] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isUserStatusChanged, setIsUserStatusChanged] = useState(false);
  const [instructorData, setInstructorData] = useState({
    profile: {
      name: "",
      email: "",
      aboutMe: "",
      address: "",
      logo: "",
      _id: "",
    },
  });
  const [instructorsList, setInstructosList] = useState([]);

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
  const trackOnclick = (payload, userData) => {
    setIsModalOpen(payload);
    if (payload) {
      setInstructorData(userData);
    }
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

  const filterByCompany = (companyID) => {

    const handlepageLoad = async (event) => {
      const response = await filterInstructorApi(companyID);

      if ("status" in response && response.status == true) {
        setInstructosList(response.data);
      } else {
        return swal(
          "Failed",
          "Something went wrong, please try again later.",
          "error"
        );
      }
    };
    handlepageLoad();
  };

  /**
   * 
   * @param {*} e 
   * @returns 
   */
  const filterByDepartment = async (e) => {
    
    setDeptID(e.target.value);

     const URL = `${API_ROOT_URL}/instructor?deptID=${e.target.value}`;
     const response =  await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      }
    }).then((data) => data.json());

    if ("status" in response && response.status == true) {
      /* Prepare data for instructor data-table list, start */
      setInstructosList(response.data);
    } else {
      return swal("Failed", "Error message", "error");
    }
  };

  // use effect
  useEffect(() => {
    const handlepageLoad = async (event) => {
      const response = await getInstructorApi(role, parentCompany);
      if ("status" in response && response.status == true) {
        /* Prepare data for instructor data-table list, start */
        setInstructosList(response.data);
      } else {
        return swal("Failed", "Error message", "error");
      }
    };
    handlepageLoad();
  }, [isModalOpen, isUserStatusChanged]);

  return (
    <>
      <PageTitle activeMenu="Instructor List" motherMenu="Instructors" />
      <div className="row">
        <div className="col-xl-12">
          <div className="card students-list">
            <div className="card-header border-0 flex-wrap pb-0">
              <h2>INSTRUCTOR LIST</h2>
                { USER_ROLES.SUPER_ADMIN === role ?
                (
                  <>
                  
                   <div className="col-sm-2 ">
                  <label style={{fontWeight:"bold"}}>Select Company</label>
                <select
                  name="parentCompany"
                  className="form-cdeptIDontrol btn border-light"
                  onChange={(e) => filterByCompany(e.target.value)}
                >
                  <option value="all">All</option>
                  <CompanyDropdown/>
                </select> 
                </div>
                </>
                ) : 
                USER_ROLES.COMPANY === role ?
                (
                  <>
                  <div className="row">
                    <div className="col-m-3">
                    <label className="" style={{fontWeight:"bold"}}>Select Department</label>
                    <select
                      name="deptID"
                      className="form-control btn border-light"
                      value={deptID}
                      onChange={(e) => filterByDepartment(e) }
                    >
                      <option value="all">All</option>
                      <DepartmentByCompany parentCompany={userID} />
                    </select>
                    </div>
                    </div>
                  </>
                )
                : null  }
             
            </div>
            <div className="card-body ">
              <div className="table-responsive">
                <div id="student_wrapper" className="dataTables_wrapper ">
                  {/* <Table data={data} click={clickhandler} /> */}
                </div>
                <Table
                  data={instructorsList}
                  trackOnclick={trackOnclick}
                  trackDeleteClick={trackDeleteClick}
                  changeUserStatus={changeUserStatus}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      { isModalOpen  ? 
      <UpdateProfile
        isModalOpen={isModalOpen}
        trackOnclick={trackOnclick}
        instructorData={instructorData}
      ></UpdateProfile>
      : null }
    </>
  );
};
export default Instructors;
