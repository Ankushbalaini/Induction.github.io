import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import "swiper/css";
import { Dropdown, Button } from "react-bootstrap";
import swal from "sweetalert";
import PageTitle from "../../layouts/PageTitle";

//images
import course1 from "./../../../images/courses/course1.jpg";
import SideBar from "../../layouts/nav/SideBar";
import { useSelector } from "react-redux";
import CompanyDropdown from "../Companies/CompanyDropdown";
import { API_ROOT_URL } from "../../constants";

const USER_ROLES = {
  SUPER_ADMIN: "super_admin",
  COMPANY: "company",
  INSTRUCTOR: "instructor",
  USER: "user",
};

const images = require.context("../../../../../images/inductions/", true);

function Inductions() {
  const navigate = useHistory();

  const token = useSelector((state) => state.auth.auth.token);
  const userRole = useSelector((state) => state.auth.auth.role);

  const [source, setSource] = useState("list");
  const [filterCompany, setFilterCompany] = useState();
  const [inductions, setInductions] = useState();
  const [loading, setloading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [totalRecords, setTotalRecords] = useState();

  // api call
  async function getAllInductions(page) {
    return fetch(`${API_ROOT_URL}/induction?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    }).then((data) => data.json());
  }

  async function filterInductions(page, companyID) {
    let filterInductionsApi =
      `${API_ROOT_URL}/induction/filter/by/company?page=${page}&filterByCompany=${companyID}`;
    if (companyID == "all") {
      filterInductionsApi = `${API_ROOT_URL}/induction?page=${page}`;
    }
    return fetch(filterInductionsApi, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    }).then((data) => data.json());
  }

  const loadImage = (imageName) => {
    return images(`./${imageName}`);
  };

  const filterByCompany = async (companyID) => {
    setSource("filter");
    setFilterCompany(companyID);
    const response = await filterInductions(page, companyID);
    if ("status" in response && response.status == true) {
      setInductions(response.data);
      //return;
      setloading(false);
      setData(document.querySelectorAll("#student_wrapper .cardDiv"));
    }
  };

  const handleGetInduction = async (page) => {
    const response = await getAllInductions(page);
    if ("status" in response && response.status == true) {
      setInductions(response.data);
      setloading(false);
      setTotalRecords(response.pagination.totalRecords);
      setLimit(response.pagination.limit);

      setData(document.querySelectorAll("#student_wrapper .cardDiv"));
    }
  };
  const [data, setData] = useState(
    document.querySelectorAll("#student_wrapper tbody tr")
  );

  // Edit User- Popup
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileData, setProfileData] = useState();
  const [isUserStatusChanged, setIsUserStatusChanged] = useState(false);

  // use effect
  useEffect(() => {
    if (source == "filter") {
      filterByCompany(filterCompany);
    } else {
      handleGetInduction(page);
    }
  }, [page, loading, totalRecords]);

  const [test, settest] = useState(0);
  const sort = 6;
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
  const confirmHandler = (inductionID) => {
    // user id
    swal({
      title: "Are you sure?",
      text: `Once induction Started, User is not allowed to leave induction.`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willChange) => {
      if (willChange) {
        swal("Poof! Your induction has been started!", {
          icon: "success",
        }).then(() => {
          // navigate to induction page
          // call induction is viewed api- later on

          if (USER_ROLES.USER === userRole) {
            navigate.push(`/view-induction/${inductionID}`);
          } else {
            navigate.push(`/single-induction-view/${inductionID}`);
          }
        });
      } else {
        return swal("Failed", "Induction is not started", "error");
      }
    });
  };

  //   const handler = (event) => {

  //   setKeyarr(event.code === 'ArrowUp' ? "up arrow" : "nothing");
  // };

  const content = loading ? (
    <h1>Loading</h1>
  ) : (
    <>
      <PageTitle activeMenu="Inductions" motherMenu="Inductions" />

      <div className="widget-heading d-flex justify-content-between align-items-center">
        <h3 className="m-0">All Inductions ({totalRecords})</h3>

        {USER_ROLES.SUPER_ADMIN === userRole ? (
          <div className="col-lg-4">
            <select
              name="parentCompany"
              className="form-control"
              onChange={(e) => filterByCompany(e.target.value)}
            >
              <option value="all">All</option>
              <CompanyDropdown />
            </select>
          </div>
        ) : null}
        {/* <Link to={"./inductions"} className="btn btn-primary btn-sm">
          View all
        </Link> */}
      </div>

      <div className="row dataTables_wrapper no-footer" id="student_wrapper">
        {inductions.map((data, index) => (
          <div className="col-xl-4 col-md-6 cardDiv" key={index}>
            <div className="card all-crs-wid">
              <div className="card-body">
                {USER_ROLES.USER !== userRole ? (
                  <Dropdown Style="text-align: end ">
                    <Dropdown.Toggle
                      as="a"
                      className="btn-link i-false btn sharp tp-btn-light btn-dark"
                    >
                      <svg
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.0012 9.86C11.6544 9.86 11.3109 9.92832 10.9905 10.061C10.67 10.1938 10.3789 10.3883 10.1336 10.6336C9.88835 10.8788 9.6938 11.17 9.56107 11.4905C9.42834 11.8109 9.36002 12.1544 9.36002 12.5012C9.36002 12.848 9.42834 13.1915 9.56107 13.5119C9.6938 13.8324 9.88835 14.1236 10.1336 14.3688C10.3789 14.6141 10.67 14.8086 10.9905 14.9413C11.3109 15.0741 11.6544 15.1424 12.0012 15.1424C12.7017 15.1422 13.3734 14.8638 13.8687 14.3684C14.3639 13.873 14.642 13.2011 14.6418 12.5006C14.6417 11.8001 14.3632 11.1284 13.8678 10.6332C13.3724 10.138 12.7005 9.85984 12 9.86H12.0012ZM3.60122 9.86C3.25437 9.86 2.91092 9.92832 2.59048 10.061C2.27003 10.1938 1.97887 10.3883 1.73361 10.6336C1.48835 10.8788 1.2938 11.17 1.16107 11.4905C1.02834 11.8109 0.960022 12.1544 0.960022 12.5012C0.960022 12.848 1.02834 13.1915 1.16107 13.5119C1.2938 13.8324 1.48835 14.1236 1.73361 14.3688C1.97887 14.6141 2.27003 14.8086 2.59048 14.9413C2.91092 15.0741 3.25437 15.1424 3.60122 15.1424C4.30171 15.1422 4.97345 14.8638 5.46866 14.3684C5.96387 13.873 6.24198 13.2011 6.24182 12.5006C6.24166 11.8001 5.96324 11.1284 5.46781 10.6332C4.97237 10.138 4.30051 9.85984 3.60002 9.86H3.60122ZM20.4012 9.86C20.0544 9.86 19.7109 9.92832 19.3905 10.061C19.07 10.1938 18.7789 10.3883 18.5336 10.6336C18.2884 10.8788 18.0938 11.17 17.9611 11.4905C17.8283 11.8109 17.76 12.1544 17.76 12.5012C17.76 12.848 17.8283 13.1915 17.9611 13.5119C18.0938 13.8324 18.2884 14.1236 18.5336 14.3688C18.7789 14.6141 19.07 14.8086 19.3905 14.9413C19.7109 15.0741 20.0544 15.1424 20.4012 15.1424C21.1017 15.1422 21.7734 14.8638 22.2687 14.3684C22.7639 13.873 23.042 13.2011 23.0418 12.5006C23.0417 11.8001 22.7632 11.1284 22.2678 10.6332C21.7724 10.138 21.1005 9.85984 20.4 9.86H20.4012Z"
                          fill="#A098AE"
                        />
                      </svg>
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                      className="dropdown-menu dropdown-menu-end"
                      align="right"
                    >
                      {/* <Dropdown.Item onClick={trackDeleteClick}>Delete</Dropdown.Item> */}
                      <Dropdown.Item>
                        <Link to={`/update-induction/${data._id}`}>Update</Link>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : null}

                <div className="courses-bx">
                  <div className="dlab-media">
                    {data.thumbnail !== "" ? (
                      <img
                        className="img-fluid"
                        src={loadImage(data.thumbnail)}
                        alt=""
                      />
                    ) : (
                      <img className="img-fluid" src={course1} />
                    )}
                  </div>
                  <div className="dlab-info">
                    <div className="dlab-title d-flex justify-content-between">
                      <div>
                        <h4>
                          <Link to={`/single-induction-view/${data._id}`}>
                            {data.title}
                          </Link>
                        </h4>
                        <p className="m-0">
                          {data.subTitle}
                          <svg
                            className="ms-1"
                            width="4"
                            height="5"
                            viewBox="0 0 4 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="2" cy="2.5" r="2" fill="#DBDBDB" />
                          </svg>
                        </p>
                      </div>
                      <h4 className="text-primary">
                        <span></span>
                      </h4>
                    </div>
                    <div className="d-flex justify-content-between content align-items-center">
                      <span>
                        <svg
                          className="me-2"
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21.2 18.6C20.5 18.5 19.8 18.4 19 18.4C16.5 18.4 14.1 19.1 12 20.5C9.90004 19.2 7.50005 18.4 5.00005 18.4C4.30005 18.4 3.50005 18.5 2.80005 18.6C2.30005 18.7 1.90005 19.2 2.00005 19.8C2.10005 20.4 2.60005 20.7 3.20005 20.6C3.80005 20.5 4.40005 20.4 5.00005 20.4C7.30005 20.4 9.50004 21.1 11.4 22.5C11.7 22.8 12.2 22.8 12.6 22.5C15 20.8 18 20.1 20.8 20.6C21.3 20.7 21.9 20.3 22 19.8C22.1 19.2 21.7 18.7 21.2 18.6ZM21.2 2.59999C20.5 2.49999 19.8 2.39999 19 2.39999C16.5 2.39999 14.1 3.09999 12 4.49999C9.90004 3.09999 7.50005 2.39999 5.00005 2.39999C4.30005 2.39999 3.50005 2.49999 2.80005 2.59999C2.40005 2.59999 2.00005 3.09999 2.00005 3.49999V15.5C2.00005 16.1 2.40005 16.5 3.00005 16.5C3.10005 16.5 3.10005 16.5 3.20005 16.5C3.80005 16.4 4.40005 16.3 5.00005 16.3C7.30005 16.3 9.50004 17 11.4 18.4C11.7 18.7 12.2 18.7 12.6 18.4C15 16.7 18 16 20.8 16.5C21.3 16.6 21.9 16.2 22 15.7C22 15.6 22 15.6 22 15.5V3.49999C22 3.09999 21.6 2.59999 21.2 2.59999Z"
                            fill="#c7c7c7"
                          />
                        </svg>
                        {data.numOfSlides} Slides
                      </span>

                      {USER_ROLES.USER === userRole ? (
                        <Button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={(e) => confirmHandler(`${data._id}`)}
                        >
                          View
                        </Button>
                      ) : (
                        <Link
                          to={`/single-induction-view/${data._id}`}
                          className="btn btn-primary btn-sm"
                        >
                          View
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* <p>Key pressed is: {keyarr}</p>
  <input type="text" onKeyPress={(event) => handler(event)} /> */}

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
              to="/inductions"
              onClick={() =>
                activePag.current > 0 && onClick(activePag.current - 1)
              }
            >
              <i className="fa fa-angle-double-left" aria-hidden="true"></i>
            </Link>
            <span>
              {paggination.map((number, i) => (
                <Link
                  key={i}
                  to="/inductions"
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
              to="/inductions"
              onClick={() =>
                activePag.current + 1 < paggination.length &&
                onClick(activePag.current + 1)
              }
            >
              <i className="fa fa-angle-double-right" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
  // const contents = React.lazy(()=>{content})
  return <>{content}</>;
}
export default Inductions;
