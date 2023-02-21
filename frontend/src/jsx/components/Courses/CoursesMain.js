import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "swiper/css";

//images
import course1 from "./../../../images/courses/course1.jpg";

import { useSelector } from "react-redux";
import CompanyDropdown from "../Companies/CompanyDropdown";

const images = require.context("../../../../../images/inductions/", true);

function CoursesMain() {
  const [source, setSource] = useState("list");
  const [filterCompany, setFilterCompany] = useState();
  const [courses, setCourses] = useState();
  const [loading, setloading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [totalRecords, setTotalRecords] = useState();
  const [showing, setShowing] = useState();

  const token = useSelector((state) => state.auth.auth.token);
  const role = useSelector((state) => state.auth.auth.role);

  // api call
  async function getAllInductions(page) {
    return fetch("http://localhost:8081/api/induction?page=" + page, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    }).then((data) => data.json());
  }

  async function filterInductions(page, companyID) {
    let filterInductionsApi =
      "http://localhost:8081/api/induction/filter/by/company?page=" +
      page +
      "&filterByCompany=" +
      companyID;
    if (companyID == "all") {
      filterInductionsApi = "http://localhost:8081/api/induction?page=" + page;
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
      setCourses(response.data);
      //return;
      setloading(false);
      setData(document.querySelectorAll("#student_wrapper .cardDiv"));
    }
  };

  const handleGetInduction = async (page) => {
    const response = await getAllInductions(page);
    if ("status" in response && response.status == true) {
      setCourses(response.data);
      setloading(false);
      setTotalRecords(response.pagination.totalRecords);
      setLimit(response.pagination.limit);

      setData(document.querySelectorAll("#student_wrapper .cardDiv"));
    }
  };

  // use effect
  useEffect(() => {
    if (source == "filter") {
      filterByCompany(filterCompany);
    } else {
      handleGetInduction(page);
    }
  }, [page, loading, totalRecords]);

  const [data, setData] = useState(
    document.querySelectorAll("#student_wrapper .cardDiv")
  );

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

  const content = loading ? (
    <h1>Loading</h1>
  ) : (
    <>

      { (role === 'super_admin') ?
      <div className="widget-heading d-flex justify-content-between align-items-center">
        <h3 className="m-0">All Inductions ({totalRecords})</h3>
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
        {/* <Link to={"./inductions"} className="btn btn-primary btn-sm">
          View all
        </Link> */}
      </div> : null }

      <div className="row dataTables_wrapper no-footer" id="student_wrapper">
        {courses.map((data, index) => (
          <div className="col-xl-4 col-md-6 cardDiv" key={index}>
            <div className="card all-crs-wid">
              <div className="card-body">
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
                          {/* <span>
                            5.0
                            <svg
                              width="16"
                              height="15"
                              viewBox="0 0 16 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8 0.5L9.79611 6.02786H15.6085L10.9062 9.44427L12.7023 14.9721L8 11.5557L3.29772 14.9721L5.09383 9.44427L0.391548 6.02786H6.20389L8 0.5Z"
                                fill="#FEC64F"
                              />
                            </svg>
                          </span> */}
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
                      <Link
                        to={`/single-induction-view/${data._id}`}
                        className="btn btn-primary btn-sm"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

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

  return <>{content}</>;
}
export default CoursesMain;
