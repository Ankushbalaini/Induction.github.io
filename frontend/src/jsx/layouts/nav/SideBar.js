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

import medal from "../../../images/medal.png";
//import state from "sweetalert/typings/modules/state";

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
  /// Active menu
  let deshBoard = ["", "instructor-dashboard", "profile"],
    department = ["departments", "add-department"],
    companies = ["companies", "add-company"],
    instructor = [
      "instructors",
      "add-instructor",
      "instructor-courses",
      "instructor-students",
    ],
    inductions = ["inductions", "create-induction", "single-induction-view", "courses"],
    students = ["students", "add-student"];

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
          <li className={`${deshBoard.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow" to="#">
              <i className="bi bi-grid"></i>
              <span className="nav-text">Dashboard</span>
            </Link>
            <ul>
                { (role =='instructor')  ?
                <li>
                  <Link
                    className={`${
                      path === "instructor-dashboard" ? "mm-active" : ""
                    }`}
                    to="/instructor-dashboard"
                  >
                    Dashboard
                  </Link>
                </li> : null 
                }
                { (role =='super_admin')  ?
                <li>
                  <Link
                    className={`${path === "dashboard" ? "mm-active" : ""}`}
                    to="/dashboard"
                  >
                    {" "}
                    Dashboard
                  </Link>
                </li> : null 
                }

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

            <li className={`${companies.includes(path) ? "mm-active" : ""}`}>
              <Link className="has-arrow" to="#">
                {" "}
                <i className="bi bi-people"></i>{" "}
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
          <li className={`${instructor.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow" to="#">
              {" "}
              <i className="bi bi-people"></i>{" "}
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


                  <li>
                    <Link
                      className={`${
                        path === "instructor-courses" ? "mm-active" : ""
                      }`}
                      to="/instructor-courses"
                    >
                      instructor courses
                    </Link>
                  </li>


                  


              
                  <li>
                    <Link
                      className={`${ path === "instructor-students" ? "mm-active" : ""
                      }`}
                      to="/instructor-students"
                    >
                      Users
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        path === "instructor-liveclass" ? "mm-active" : ""
                      }`}
                      to="/instructor-liveclass"
                    >
                      Live Class
                    </Link>
                  </li>{" "}
                
            </ul>
          </li>

            <li className={`${inductions.includes(path) ? "mm-active" : ""}`}>
              <Link className="has-arrow" to="#">
                <i className="bi bi-book"></i>
                <span className="nav-text">Inductions</span>
              </Link>
              <ul>
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
                    className={`${path === "inductions" ? "mm-active" : ""}`}
                    to="/inductions"
                  >
                    All Inductions{" "}
                  </Link>
                </li>


                <li>
                  <Link
                    className={`${
                      path === "courses" ? "mm-active" : ""
                    }`}
                    to="/courses"
                  >
                    Courses{" "}
                  </Link>
                </li>


               


              </ul>
            </li>


          <li className={`${students.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow" to="#">
              <i className="bi bi-book"></i>
              <span className="nav-text">Students</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${path === "students" ? "mm-active" : ""}`}
                  to="/students"
                >
                  All Students{" "}
                </Link>

                
                
              </li>
            </ul>
          </li>



        </MM>

        <div className="copyright">
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
