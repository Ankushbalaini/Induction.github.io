import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CalendarBlog from "../Dashboard/Dashboard/CalendarBlog";
import ScheduleRadilChart from "../Dashboard/Dashboard/ScheduleRadilChart";
import LearningActivityChart from "./LearningActivityChart";
// import AttemtedViewDashboard from "./components/AttemtedViewDashboard"
import Companydashboardlisting from "./components/Companydashboardlisting";

// api call
async function getDashboard(token) {
  return await fetch("http://localhost:8081/api/dashboard/company", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    }
  }).then((data) => data.json());
}


const CompanyDashboard = () => {
  const token = useSelector((state) => state.auth.auth.token);
  const intitalState = {
    totalUsers:0,
    totalInstructors:0,
    totalInductions:0,

  }
  const [companyDB, setCompanyDB] = useState();
  const [loading, setLoading] = useState(true);
  const [averageData, setAverageData] = useState();
  // const [averageData, setAverageData] = useState();
  console.log(averageData)
  const handlepageLoad = async (e) => {
    const response = await getDashboard(token);
    if("status" in response && response.status === true){
      setCompanyDB(response.data);
    }else{
      alert(response.message);
    }
  };


  useEffect(() => {
    //if (loading) {
      handlepageLoad();
      //setLoading(false);
    //}
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-xl-4 col-lg-4 col-xxl-4 col-sm-4">
          <div className="widget-stat card bg-primary">
            <div className="card-body  p-4">
              <div className="media">
                <span className="me-3">
                  <i className="bi bi-book"></i>
                </span>
                <div className="media-body text-white">
                  <p className="mb-1">Total Users</p>
                  <h3 className="text-white">{companyDB?.totalUsers}</h3>
                  <div className="progress mb-2 bg-secondary">
                    <div
                      className="progress-bar progress-animated bg-light"
                      style={{ width: companyDB?.totalUsers + "%" }}
                    ></div>
                  </div>
                  {/* <small>80% Increase in 20 Days</small> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-lg-4 col-xxl-4 col-sm-4">
          <div className="widget-stat card bg-secondary">
            <div className="card-body p-4">
              <div className="media">
                <span className="me-3">
                  <i className="la la-graduation-cap"></i>
                </span>
                <div className="media-body text-white">
                  <p className="mb-1">Total Instructor</p>
                  <h3 className="text-white">{companyDB?.totalInstructors}</h3>
                  <div className="progress mb-2 bg-primary">
                    <div
                      className="progress-bar progress-animated bg-light"
                      style={{ width: companyDB?.totalInstructors + "%" }}
                    ></div>
                  </div>
                  {/* <small>76% Increase in 20 Days</small> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-lg-4 col-xxl-4 col-sm-4">
          <div className="widget-stat card bg-danger">
            <div className="card-body p-4">
              <div className="media">
                <span className="me-3">
                  <i className="bi bi-award-fill"></i>
                </span>
                <div className="media-body text-white">
                  <p className="mb-1">Total Induction</p>
                  <h3 className="text-white">{companyDB?.totalInductions}</h3>
                  <div className="progress mb-2 bg-primary">
                    <div
                      className="progress-bar progress-animated bg-light"
                      style={{ width: companyDB?.totalInductions + "%" }}
                    ></div>
                  </div>
                  {/* <small>76% Increase in 20 Days</small> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-12">
                <div className="card">
                  <div className="card-header border-0 flex-wrap">
                    <h3>Test Average Score</h3>
                    <div className="d-flex align-items-center">
                      
                      <div className="d-flex align-items-center ms-3">
                        <span className="work-ic">
                          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.4 0.840088H6.59997C5.07305 0.842458 3.60934 1.45007 2.52965 2.52977C1.44995 3.60947 0.842336 5.07317 0.839966 6.60009V19.4001C0.842336 20.927 1.44995 22.3907 2.52965 23.4704C3.60934 24.5501 5.07305 25.1577 6.59997 25.1601H19.4C20.9269 25.1577 22.3906 24.5501 23.4703 23.4704C24.55 22.3907 25.1576 20.927 25.16 19.4001V6.60009C25.1576 5.07317 24.55 3.60947 23.4703 2.52977C22.3906 1.45007 20.9269 0.842458 19.4 0.840088ZM20.3984 13.6401H16.9936L14.8432 17.8769C14.7911 17.9815 14.7107 18.0693 14.6111 18.1305C14.5115 18.1916 14.3968 18.2234 14.28 18.2225H14.2416C14.1175 18.2182 13.9976 18.1769 13.8973 18.1039C13.7969 18.0309 13.7207 17.9296 13.6784 17.8129L11.0928 11.1441L9.95357 13.2945C9.90275 13.4001 9.82262 13.4888 9.72276 13.5501C9.62289 13.6113 9.50751 13.6426 9.39037 13.6401H5.60157C5.43183 13.6401 5.26904 13.5727 5.14902 13.4526C5.02899 13.3326 4.96157 13.1698 4.96157 13.0001C4.96157 12.8303 5.02899 12.6676 5.14902 12.5475C5.26904 12.4275 5.43183 12.3601 5.60157 12.3601H9.00637L10.6192 9.31369C10.6739 9.20296 10.7603 9.11099 10.8674 9.04946C10.9746 8.98792 11.0975 8.9596 11.2208 8.96809C11.3442 8.9747 11.463 9.0169 11.563 9.08958C11.6629 9.16226 11.7397 9.26233 11.784 9.37769L14.3568 16.0209L16.0336 12.7057C16.0905 12.6024 16.1738 12.5159 16.275 12.4552C16.3761 12.3945 16.4916 12.3617 16.6096 12.3601H20.3984C20.5681 12.3601 20.7309 12.4275 20.8509 12.5475C20.9709 12.6676 21.0384 12.8303 21.0384 13.0001C21.0384 13.1698 20.9709 13.3326 20.8509 13.4526C20.7309 13.5727 20.5681 13.6401 20.3984 13.6401Z" fill="#4CBC9A "/>
                          </svg>
                        </span>
                        <div className="ms-3 fs-18 bold">
                          <span className="bold fw-200">Last 10 Records </span>
                          <h5 className="fs-20 mb-0 m-auto">{averageData}</h5>
                        </div>
                      </div>
                    </div>	
                  </div>
          
                  <div className="card-body">
                  <LearningActivityChart averageData={averageData} setAverageData={setAverageData} />
                  </div>

                </div>
              </div>

              {/* <div className="col-xl-12">
                  <AttemtedViewDashboard />
                  </div> */}
                  <div className="col-xl-12">
                  <Companydashboardlisting />
                  </div>
      </div>
    </>
  );
};

export default CompanyDashboard;
