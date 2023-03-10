import React, { useRef, useEffect, useState } from "react";
import swal from "sweetalert";
import TableAttempted from "./TableAttemtdInsuct";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
// import UserAttemptedInductioList from "../Modals/UserAttemptedInductioList";
import FiltersForAttempts from "../../Inductions/components/FilterForAttempts";

const USER_ROLES = {
  SUPER_ADMIN: "super_admin",
  COMPANY: "company",
  INSTRUCTOR: "instructor",
  USER: "user",
};

const InductionUsers = () => {
  const token = useSelector((state) => state.auth.auth.token);
  const role = useSelector((state) => state.auth.auth.role);
  const loginUser = useSelector((state) => state.auth.auth.id);
  const parentCompany = useSelector((state) => state.auth.auth.parentCompany);

  const [companyFilter, setCompanyFilter] = useState();
  const [inductionFilter, setInductionFilter] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]); // main listing data
  const [userPopupData, setUserPopupData] = useState();
  const [totalAttempts, setTotalAttempts] = useState();
  const [uniqueTitle, setUniqueTitle] = useState([]);

  // callback function to opdate state
  const trackOnclick = (payload, userData) => {
    // console.log("Clicked on view All "+ payload);
    setIsModalOpen(payload);
    if (userData) {
      setUserPopupData(userData);
    }
  };

  const hidePopUp = () => {
    setIsModalOpen(false);
  };

  const handlepageLoad = async (e) => {
    // query string
    
    var queryStr = "";
    
    queryStr = companyFilter ? `?company=${companyFilter}` 
              : (USER_ROLES.COMPANY === role) ? `?company=${loginUser}` 
              : (USER_ROLES.INSTRUCTOR === role) ? `?company=${parentCompany}` : '';
    queryStr += inductionFilter ? `&induction=${inductionFilter}` : "";

    const response = await fetch(
      "http://localhost:8081/api/induction/users" + queryStr,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      }
    ).then((data) => data.json());
    if ("status" in response && response.status == true) {
      setUsers(response.data);
    //   setUniqueTitle(response.data);
      setLoading(false);
    } else {
      return swal("Failed", response.message, "error");
    }
    // console.log(users,"inductions-attempts")
    // console.log(uniqueTitle, "unique title attemted")

  };

  // use effect
  useEffect(() => {
    handlepageLoad();
  }, [companyFilter, inductionFilter]);


  //css for button
  const buttonStyle = {
    margin: "auto",
    display: "flex",
  };


  const InductionFilterHandle = (e) => {
    setInductionFilter(e.target.value);
  };

  return (
    <>
      {loading ? (
        <h3>Loading</h3>
      ) : (
        <>
        {/* <PageTitle activeMenu="Attempted Induction" motherMenu="Inductions" /> */}
        <div className="row">
          <div className="col-xl-12">
            <div className="card students-list">  
              <div className="card-header border-0 flex-wrap pb-9">
              <h2>Test Attempts</h2>
              <FiltersForAttempts
                  InductionFilterHandle={InductionFilterHandle}
                  inductionFilter={inductionFilter}
                />
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <div id="user_wrapper" className="dataTables_wrapper">
            
                </div>
                <TableAttempted data={users} trackOnclick={trackOnclick} />
              </div>
         
            </div>
                {/* <h3>Induction Users</h3> */}

                {/* 
                <h2>Attempted Induction Users</h2>
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
                        </label>63fcce682cbf90615f5b06ec

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
               */}

               

             
            </div>
          </div>
        </div>
        </>
      )}

      {/* {isModalOpen ? (
        <UserAttemptedInductioList
          isModalOpen={isModalOpen}
          hidePopUp={hidePopUp}
          userPopupData={userPopupData}
        />
      ) : null} */}
    </>
  );
};
export default InductionUsers;
