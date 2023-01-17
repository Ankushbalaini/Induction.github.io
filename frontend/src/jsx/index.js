import React, { useContext } from "react";

// React router dom
import { Switch, Route } from "react-router-dom";

// Css
import "./index.css";
import "./chart.css";
import "./step.css";

// Layout
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";
import ScrollToTop from "./layouts/ScrollToTop";
// Dashboard
import Home from "./components/Dashboard/Home";
import Profile from "./components/Dashboard/Profile";

//Courses----
import CoursesMain from "./components/Courses/CoursesMain";
import CourseDetail1 from "./components/Courses/CourseDetail1";
import CourseDetail2 from "./components/Courses/CourseDetail2";

//Company----
import AllCompanies from "./components/Companies/ListCompanies";
import AddCompany from "./components/Companies/AddCompany";

//Inductions----
import Inductions from "./components/Inductions/Inductions";
import InductionDetail from "./components/Inductions/InductionDetail";
import CreateInduction from "./components/Inductions/CreateInduction";
import SingleInductionView from "./components/Inductions/SingleInductionView";

//Instructors
import Instructors from "./components/Dashboard/Instructors";
import AddInstructor from "./components/Instructor/AddInstructor";
import InstructorDashboard from "./components/Instructor/InstructorDashboard";
import InstructorCourses from "./components/Instructor/InstructorCourses";
import InstructorStudents from "./components/Instructor/InstructorStudents";

// Students
import AllStudents from "./components/Students/AllStudents";

// App
import AppProfile from "./components/AppsMenu/AppProfile/AppProfile";
import { ThemeContext } from "../context/ThemeContext";

const Markup = () => {
  const { menuToggle } = useContext(ThemeContext);



  
  const routes = [
    /// Dashboard
    { url: "", component: Home },
    { url: "dashboard", component: Home },
    { url: "profile", component: Profile },

    // Courses ----
    { url: "courses", component: CoursesMain },
    { url: "course-details-1", component: CourseDetail1 },
    { url: "course-details-2", component: CourseDetail2 },

    // Companies ----
    { url: "companies", component: AllCompanies },
    { url: "add-company", component: AddCompany },

    // Inductions ----
    { url: "inductions", component: Inductions },
    { url: "induction/:id", component: InductionDetail },
    { url: "create-induction", component: CreateInduction },
    { url: "single-induction-view/:id", component: SingleInductionView },

    // Instructors  Pages path
    { url: "instructors", component: Instructors },
    { url: "add-instructor", component: AddInstructor },
    { url: "instructor-dashboard", component: InstructorDashboard },
    { url: "instructor-courses", component: InstructorCourses },
    { url: "instructor-students", component: InstructorStudents },

    { url: "students", component: AllStudents },

    // Apps
    { url: "app-profile", component: AppProfile },
  ];

  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  let pagePath = path.split("-").includes("page");
  return (
    <>
      <div
        id={`${!pagePath ? "main-wrapper" : ""}`}
        className={`${!pagePath ? "show" : "mh100vh"}  ${
          menuToggle ? "menu-toggle" : ""
        }`}
      >
        {!pagePath && <Nav />}

        <div
          className={`${!pagePath ? "content-body" : ""}`}
          style={{ minHeight: window.screen.height - 45 }}
        >
          <div className={`${!pagePath ? "container-fluid" : ""}`}>
            <Switch>
              {routes.map((data, i) => (
                <Route
                  key={i}
                  exact
                  path={`/${data.url}`}
                  component={data.component}
                />
              ))}
            </Switch>
          </div>
        </div>
        {!pagePath && <Footer />}
      </div>
      <ScrollToTop />
    </>
  );
};

export default Markup;
