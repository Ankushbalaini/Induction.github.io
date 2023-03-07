/// Menu
import Metismenu from "metismenujs";
import React, { Component, useContext, useEffect, useState } from "react";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
/// Link
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { ThemeContext } from "../../../context/ThemeContext";

const USER_ROLES = {
  SUPER_ADMIN: "super_admin",
  COMPANY: "company",
  INSTRUCTOR: "instructor",
  USER: "user",
};

class MM extends Component {
  componentDidMount() {
    this.$el = this.el;
    this.mm = new Metismenu(this.$el);
  }
  componentWillUnmount() {}
  render() {
    return (
      <div className="mm-wrapper">
        <ul className="metismenu" ref={(el) => (this.el = el)}>
          {this.props.children}
        </ul>
      </div>
    );
  }
}

const SideBar = () => {
  const role = useSelector((state) => state.auth.auth.role);

  const { iconHover, sidebarposition, headerposition, sidebarLayout } =
    useContext(ThemeContext);
  useEffect(() => {
    var btn = document.querySelector(".nav-control");
    var aaa = document.querySelector("#main-wrapper");
    function toggleFunc() {
      return aaa.classList.toggle("menu-toggle");
    }
    btn.addEventListener("click", toggleFunc);

    //sidebar icon Heart blast
    var handleheartBlast = document.querySelector(".heart");
    function heartBlast() {
      return handleheartBlast.classList.toggle("heart-blast");
    }
    handleheartBlast.addEventListener("click", heartBlast);
  }, []);
  //For scroll
  const [hideOnScroll, setHideOnScroll] = useState(true);
  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y;
      if (isShow !== hideOnScroll) setHideOnScroll(isShow);
    },
    [hideOnScroll]
  );
  /// Path
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  // super-admin

  let deshBoard = [
      "dashboard",
      "instructor-dashboard",
      "company-dashboard",
      "profile",
      "company-profile",
    ],
    department = ["departments", "add-department"],
    companies = ["companies", "add-company"],
    instructor = [
      "instructors",
      "add-instructor",
      "instructor-courses",
      "instructor-students",
    ],
    inductions = [
      "inductions",
      "create-induction",
      //"create-induction-new",
      "single-induction-view",
      //"courses",
      "start-test",
      "add-induction",
      "add-slide",
      "update-induction",
      "attempted-inductions",
      "user-inductions",
    ],
    students = ["students", "add-student", "unassigned-users", "users"];

  return (
    <div
      className={`dlabnav ${iconHover} ${
        sidebarposition.value === "fixed" &&
        sidebarLayout.value === "horizontal" &&
        headerposition.value === "static"
          ? hideOnScroll > 120
            ? "fixed"
            : ""
          : ""
      }`}
    >
      <PerfectScrollbar className="dlabnav-scroll">
        <MM className="metismenu" id="menu">
          {/* Dashboards - Super Admin */}
          {USER_ROLES.SUPER_ADMIN == role ? (
            <>
              <li className={`${deshBoard.includes(path) ? "mm-active" : ""}`}>
                <Link className="" to="/dashboard">
                  <i className="bi bi-grid"></i>
                  <span className="nav-text">Dashboard</span>
                </Link>
                <ul>
                  <li>
                    <Link
                      className={`${path === "dashboard" ? "mm-active" : ""}`}
                      to="/dashboard"
                    >
                      Dashboard
                    </Link>
                  </li>
                </ul>
              </li>
            </>
          ) : null}

          {/* Dashboards - Instructor */}
          {USER_ROLES.INSTRUCTOR === role ? (
            <>
              <li className={`${deshBoard.includes(path) ? "mm-active" : ""}`}>
                <Link className="" to="/instructor-dashboard">
                  <i className="bi bi-grid"></i>
                  <span className="nav-text">Dashboard</span>
                </Link>
                <ul>
                  <li>
                    <Link
                      className={`${
                        path === "instructor-dashboard" ? "mm-active" : ""
                      }`}
                      to="/instructor-dashboard"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        path === "instructor-profile" ? "mm-active" : ""
                      }`}
                      to="/instructor-profile"
                    >
                      Profile
                    </Link>
                  </li>
                </ul>
              </li>
            </>
          ) : null}

          {/* Dashboards - Company */}
          {USER_ROLES.COMPANY === role ? (
            <li className={`${deshBoard.includes(path) ? "mm-active" : ""}`}>
              <Link className="" to="/company-dashboard">
                <i className="bi bi-grid"></i>
                <span className="nav-text">Dashboard</span>
              </Link>
              <ul>
                <li>
                  <Link
                    className={`${
                      path === "company-dashboard" ? "mm-active" : ""
                    }`}
                    to="/company-dashboard"
                  >
                    {" "}
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${
                      path === "company-profile" ? "mm-active" : ""
                    }`}
                    to="/company-profile"
                  >
                    Profile
                  </Link>
                </li>
              </ul>
            </li>
          ) : null}

          {/* Dashboards - Super Admin */}
          {USER_ROLES.USER == role ? (
            <>
              <li className={`${deshBoard.includes(path) ? "mm-active" : ""}`}>
                <Link className="" to="#">
                  <i className="bi bi-grid"></i>
                  <span className="nav-text">Dashboard</span>
                </Link>
                <ul>
                  <li>
                    <Link
                      className={`${path === "profile" ? "mm-active" : ""}`}
                      to="/profile"
                    >
                      Profile
                    </Link>
                  </li>
                </ul>
              </li>
            </>
          ) : null}

          {/*  Company Module - Visible to Only Super Admin*/}

          {USER_ROLES.SUPER_ADMIN === role ? (
            <li className={`${companies.includes(path) ? "mm-active" : ""}`}>
              <Link className="has-arrow" to="#">
                {" "}
                <i class="bi bi-building"></i>{" "}
                <span className="nav-text">Company</span>
              </Link>
              <ul>
                <li>
                  <Link
                    className={`${path === "companies" ? "mm-active" : ""}`}
                    to="/companies"
                  >
                    Companies
                  </Link>
                </li>

                <li>
                  <Link
                    className={`${path === "add-company" ? "mm-active" : ""}`}
                    to="/add-company"
                  >
                    Add Company{" "}
                  </Link>
                </li>
              </ul>
            </li>
          ) : null}

          {/* Department - Visible for Super Admin and Company Only */}
          {role === "company" ? (
            <li className={`${department.includes(path) ? "mm-active" : ""}`}>
              <Link className="has-arrow" to="#">
                <i className="bi bi-book"></i>
                <span className="nav-text">Department</span>
              </Link>
              <ul>
                <li>
                  <Link
                    className={`${path === "department" ? "mm-active" : ""}`}
                    to="/departments"
                  >
                    Departments
                  </Link>
                </li>

                <li>
                  <Link
                    className={`${
                      path === "add-department" ? "mm-active" : ""
                    }`}
                    to="/add-department"
                  >
                    Add Department{" "}
                  </Link>
                </li>
              </ul>
            </li>
          ) : null}

          {role === "super_admin" || role === "company" ? (
            <li className={`${instructor.includes(path) ? "mm-active" : ""}`}>
              <Link className="has-arrow" to="#">
                {" "}
                <i className="bi bi-heart"></i>{" "}
                <span className="nav-text">Instructor</span>
              </Link>
              <ul>
                <li>
                  <Link
                    className={`${path === "instructors" ? "mm-active" : ""}`}
                    to="/instructors"
                  >
                    Instructors
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${
                      path === "add-instructor" ? "mm-active" : ""
                    }`}
                    to="/add-instructor"
                  >
                    Add Instructor
                  </Link>
                </li>
              </ul>
            </li>
          ) : null}

          <li className={`${inductions.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow" to="inductions">
              <i className="bi bi-book"></i>
              <span className="nav-text">Inductions</span>
            </Link>
            <ul>
              {USER_ROLES.SUPER_ADMIN === role ||
              USER_ROLES.COMPANY === role ||
              USER_ROLES.INSTRUCTOR === role ? (
                <>
                  {/* <li>
                    <Link
                      className={`${
                        path === "create-induction" ? "mm-active" : ""
                      }`}
                      to="/create-induction"
                    >
                      Create Induction{" "}
                    </Link>
                  </li> */}
                  <li>
                    <Link
                      className={`${
                        path === "create-induction" ? "mm-active" : ""
                      }`}
                      to="/create-induction"
                    >
                      Create Induction{" "}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        path === "import-induction" ? "mm-active" : ""
                      }`}
                      to="/import-induction"
                    >
                      Import Induction{" "}
                    </Link>
                  </li>

                  {/* <li>
                    <Link
                      className={`${
                        path === "add-induction" ? "mm-active" : ""
                      }`}
                      to="/add-induction"
                    >
                      Add Induction{" "}
                    </Link>
                  </li> */}

                  {/* <li>
                    <Link
                      className={`${
                        path === "add-induction" ? "mm-active" : ""
                      }`}
                      to="/add-slide"
                    >
                      Add Slide{" "}
                    </Link>
                  </li> */}

                  {/* <li>
                    <Link
                      className={`${
                        path === "update-induction" ? "mm-active" : ""
                      }`}
                      to="/update-induction/63ef91f59c145e113579da4b"
                    >
                      Update Induction{" "}
                    </Link>
                  </li> */}
                  <li>
                    <Link
                      className={`${
                        path === "attempted-inductions" ? "mm-active" : ""
                      }`}
                      to="/attempted-inductions"
                    >
                      Attempted Induction{" "}
                    </Link>
                  </li>
                </>
              ) : null}

              <li>
                <Link
                  className={`${path === "inductions" ? "mm-active" : ""}`}
                  to="/inductions"
                >
                  Inductions{" "}
                </Link>
              </li>

              {USER_ROLES.USER === role ? (
                <>
                

                <li>
                <Link
                  className={`${
                    path === "user-inductions" ? "mm-active" : ""
                  }`}
                  to="/user-inductions"
                >
                  Inductions Attempts{" "}
                </Link>
                </li>
                </>

              ) : null}
            </ul>
          </li>

          {USER_ROLES.USER !== role ? (
            <li className={`${students.includes(path) ? "mm-active" : ""}`}>
              <Link className="has-arrow" to="#">
                <i className="bi bi-people"></i>
                <span className="nav-text">Users</span>
              </Link>
              <ul>
                <li>
                  <Link
                    className={`${path === "users" ? "mm-active" : ""}`}
                    to="/users"
                  >
                    Assigned Users{" "}
                  </Link>
                </li>

                <li>
                  <Link
                    className={`${
                      path === "unassigned-users" ? "mm-active" : ""
                    }`}
                    to="/unassigned-users"
                  >
                    Unassigned Users{" "}
                  </Link>
                </li>
              </ul>
            </li>
          ) : null}
        </MM>

        <div className="copyright" Style="position: absolute;bottom: 0px;">
          <p></p>
          <p className="fs-12">
            Made with <span className="heart"></span> by BJS
          </p>
        </div>
      </PerfectScrollbar>
    </div>
  );
};

export default SideBar;
