import React, { useState, useContext } from "react";

// React router dom
import { Switch, Route, withRouter } from "react-router-dom";

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
import Setting from "./components/Dashboard/Setting";

//Courses----
// import CoursesMain from "./components/Courses/CoursesMain";
// import CourseDetail1 from "./components/Courses/CourseDetail1";
// import CourseDetail2 from "./components/Courses/CourseDetail2";
import Inductions from "./components/Induction/Inductions";

//Company----
// import ListCompanies from "./components/Companies/ListCompanies";
import ListCompanies from "./components/Companies/Companies";
import AddCompany from "./components/Companies/AddCompany";
import CompanyProfile from "./components/Companies/CompanyProfile";
import CompanyDashboard from "./components/Companies/CompanyDashboard";

//Department----
import AllDepartments from "./components/Department/ListDepartment";
import AddDepartment from "./components/Department/AddDepartment";

//Inductions----
// import Inductions from "./components/Inductions/Inductions";
// import InductionDetail from "./components/Inductions/InductionDetail";
// import CreateInduction from "./components/Inductions/CreateInduction";
import CreateInductionNew from "./components/Inductions/CreateInductionNew";
import SingleInductionView from "./components/Inductions/SingleInductionView";
import StarTest from './components/Inductions/test/StartTest';

// for User v2
import ViewInduction from "./components/Users/ViewInduction";


// v2 versions
import Add from './components/Induction/Add';
import AddSlide from "./components/Slides/Add";
import UpdateSlide from "./components/Induction/UpdateSlide";
import UpdateInduction from "./components/Induction/UpdateInduction";
//add-induction

//Instructors
//import Instructors from "./components/Dashboard/Instructors";
import Instructors from "./components/Instructor/ListInstructor";
import AddInstructor from "./components/Instructor/AddInstructor";
import InstructorProfile from "./components/Instructor/InstructorProfile";

import InstructorDashboard from "./components/Instructor/InstructorDashboard";
import InstructorCourses from "./components/Instructor/InstructorCourses";
import InstructorStudents from "./components/Instructor/InstructorStudents";

// Students
// import AllStudents from "./components/Students/AllStudents";
import Users from "./components/Users/Users";

// import UnassignedUsers from "./components/Students/UnassignedUsers";
import UnassignedUsers from "./components/Users/UnassignedUsers";


// App
// import AppProfile from "./components/AppsMenu-123/AppProfile/AppProfile";
// import FilteringTable from "./components/table/FilteringTable/FilteringTable";

import Mcq from "./components/Inductions/Mcq";
import { ThemeContext } from "../context/ThemeContext";
import { store } from "../../src/store/store";
import ViewMcq from "./components/Inductions/Viewquiz";
import AttemptQuiz from "./components/Inductions/Attemptquiz";
import AttemptedInductions from "./components/Inductions/AttemptedInduction";
import UserAttemptedInductions from "./components/Users/AttemptedInductions";


const Markup = () => {
  var newState = store.getState();

  const [role, setRole] = useState(newState.auth.auth.role);
  const { menuToggle } = useContext(ThemeContext);
  var routes = [
    /// Dashboard
    { url: "", component: Home },
    { url: "dashboard", component: Home },
    { url: "profile", component: Profile },
    { url: "company-profile", component: CompanyProfile},
    { url: "instructor-profile", component: InstructorProfile},
    { url: "setting", component: Setting },
    { url: "company-dashboard", component: CompanyDashboard},

    // Inductions ----
    { url: "inductions", component: Inductions },
    // { url: "course-details-1", component: CourseDetail1 },
    // { url: "course-details-2", component: CourseDetail2 },

    // Companies ----
    { url: "companies", component: ListCompanies },
    { url: "add-company", component: AddCompany },

    // Department----
    { url: "departments", component: AllDepartments },
    { url: "add-department", component: AddDepartment },

    // Inductions ----
    // { url: "induction/:id", component: InductionDetail },
    { url: "create-induction", component: CreateInductionNew },
    { url: "add-induction", component: Add },
    { url: "add-slide/:id", component: AddSlide }, // induction id passed
    { url: "update-slide/:id", component: UpdateSlide }, // slide id passed
    { url: "update-induction/:id", component: UpdateInduction },
    { url: "single-induction-view/:id", component: SingleInductionView  },
    { url: "mcq/:inductionID", component: Mcq },
    { url : "viewmcq/:id", component :ViewMcq},
    { url : "attemptquiz/:id",component:AttemptQuiz},
    
  
    // full screen URLs
    { url: "start-test/:id", component: StarTest },
    { url: 'view-induction/:id', component: ViewInduction },

    // Instructors  Pages path
    { url: "instructors", component: Instructors },
    { url: "add-instructor", component: AddInstructor },
    { url: "instructor-dashboard", component: InstructorDashboard },

    { url: "instructor-courses", component: InstructorCourses },
    { url: "instructor-students", component: InstructorStudents },
    
    //{ url: "users", component: AllStudents },
    { url: "users", component: Users },
    { url : "user-inductions", component : UserAttemptedInductions},
    { url : "attempted-inductions", component : AttemptedInductions},
    { url: 'unassigned-users', component: UnassignedUsers },

    // Apps
    // { url: "app-profile", component: AppProfile },
    // { url: "table-filtering", component: FilteringTable}
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
