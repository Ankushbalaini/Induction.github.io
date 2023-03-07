import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CalendarBlog from "../Dashboard/Dashboard/CalendarBlog";
import ScheduleRadilChart from "../Dashboard/Dashboard/ScheduleRadilChart";
import { API_ROOT_URL } from "../../constants";

// api call
async function getDashboard(token) {
  return await fetch(`${API_ROOT_URL}/dashboard/company`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  }).then((data) => data.json());
}

const CompanyDashboard = () => {
  const token = useSelector((state) => state.auth.auth.token);
  const intitalState = {
    totalUsers: 0,
    totalInstructors: 0,
    totalInductions: 0,
  };
  const [companyDB, setCompanyDB] = useState();
  const [loading, setLoading] = useState(true);

  const handlepageLoad = async (e) => {
    const response = await getDashboard(token);
    if ("status" in response && response.status === true) {
      setCompanyDB(response.data);
    } else {
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
            <div className="card-body">
              <div className="row">
                <div className="col-xl-6 col-xxl-12">
                  <div className="card-calendar style-1 process-calendar">
                    <CalendarBlog />
                    {/* <input type='text' className="form-control d-none" id='datetimepicker' /> */}
                  </div>
                </div>
                <div className="col-xl-6 redial col-xxl-12">
                  <p className="text-center">Your Progress this Month</p>
                  <ScheduleRadilChart />
                  <p className="my-4 text-center">
                    Lorem ipsum dolor sit amet, adipiscing elit, sed do eiusmod
                    tempor
                  </p>
                  <ul className="skil-list">
                    {/* {contentBlog.map((item, ind)=>(
													<li key={ind}>	
														<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
															<rect x="1.5" y="1.5" width="9" height="9" rx="4.5" fill="white" stroke={item.color} strokeWidth="3"/>
														</svg>
														{item.title}
													</li>
												))}												 */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyDashboard;
