import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import ActionDropDown from "./ActionDropDown";
// import UpdateUserModal from "./UpdateUserModal";
import Table from "./UsersDatatable";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import CompanyDropdown from "../Companies/CompanyDropdown";
import DepartmentByCompany from "../Department/DepartmentByCompany";
import InductionDropdown from "../Slides/InductionDropdown";
import UserAttemptedInductioList from "../Modals/UserAttemptedInductioList";
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
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
  const intialState = {
    inductionID: "",
    slideTitle: "",
    slideContent: "",
    order: "",
  };
  const [state, setState] = useState(intialState);
  const [students, setStudents] = useState([]);
  const loadImage = (imageName) => {
    return images(`./${imageName}`);
  };
  const CompanyChangeFilter = (e) => {
    setSearchCompany(e.target.value);
    setSearchDepartment("All");
    // setLoading(true);
    if (e.target.value !== "All") {
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


  const showModal = () =>{
    
  }
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
                <h2>Attempted Users</h2>
                {role === "super_admin" ? (
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
                          Select Induction{" "}
                        </label>
                        <select
                          className="btn btn-white col-sm-2 border-light"
                          style={{ borderRadius: "8px" }}
                          name="slideInductionId"
                          value={state.inductionID}
                          onChange={(e) =>
                            setState({ ...state, inductionID: e.target.value })
                          }
                        >
                          <option>Select</option>
                          <InductionDropdown />
                        </select>
                      </div>
                    </div>
                  </div>
                ) : null}
                {role === "company" ? (
                  <div
                    className="btn-group col-sm-4"
                    style={{ float: "right", marginBottom: "5px" }}
                  >
                    <label
                      style={{
                        paddingRight: "10px",
                        fontWeight: "bold",
                        paddingTop: "12px",
                      }}
                    >
                      {" "}
                      Select Induction{" "}
                    </label>
                    <select
                      className="btn btn-white col-sm-2 border-light"
                      style={{ borderRadius: "8px" }}
                      name="slideInductionId"
                      value={state.inductionID}
                      onChange={(e) =>
                        setState({ ...state, inductionID: e.target.value })
                      }
                    >
                      <option>Select</option>
                      <InductionDropdown />
                    </select>
                  </div>
                ) : null}
                {role === "instructor" ? (
                  <div
                    className="btn-group col-sm-4"
                    style={{ float: "right", marginBottom: "5px" }}
                  >
                    <label
                      style={{
                        paddingRight: "10px",
                        fontWeight: "bold",
                        paddingTop: "12px",
                      }}
                    >
                      {" "}
                      Select Induction{" "}
                    </label>
                    <select
                      className="btn btn-white col-sm-2 border-light"
                      style={{ borderRadius: "8px" }}
                      name="slideInductionId"
                      value={state.inductionID}
                      onChange={(e) =>
                        setState({ ...state, inductionID: e.target.value })
                      }
                    >
                      <option>Select</option>
                      <InductionDropdown />
                    </select>
                  </div>
                ) : null}
              </div>


              <div className="card-body">
                <div className="table-responsive">
                  <div
                    id="student_wrapper"
                    className="dataTables_wrapper"
                  ></div>
                  <Table
                    data={students}
                    trackOnclick={trackOnclick}
                    showModal={showModal}
                  />
                </div>


              </div>
            </div>
          </div>
        </div>
      )}
      <UserAttemptedInductioList show={false} />
    </>
  );
};
export default AllStudents;
