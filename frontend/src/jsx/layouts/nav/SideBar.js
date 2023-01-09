/// Menu
import Metismenu from "metismenujs";
import React, { Component, useContext, useEffect, useState } from "react";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
/// Link
import { Link } from "react-router-dom";

import {useScrollPosition} from "@n8tb1t/use-scroll-position";
import { ThemeContext } from "../../../context/ThemeContext";

import medal from "../../../images/medal.png";


class MM extends Component {
	componentDidMount() {
		this.$el = this.el;
		this.mm = new Metismenu(this.$el);
	}
  componentWillUnmount() {
  }
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
	const {
		iconHover,
		sidebarposition,
		headerposition,
		sidebarLayout,
	} = useContext(ThemeContext);
  useEffect(() => {
    var btn = document.querySelector(".nav-control");
    var aaa = document.querySelector("#main-wrapper");
    function toggleFunc() {
      return aaa.classList.toggle("menu-toggle");
    }
    btn.addEventListener("click", toggleFunc);
	
	//sidebar icon Heart blast
	var handleheartBlast = document.querySelector('.heart');
        function heartBlast() {
            return handleheartBlast.classList.toggle("heart-blast");
        }
        handleheartBlast.addEventListener('click', heartBlast);
	
  }, []);
 //For scroll
 const [hideOnScroll, setHideOnScroll] = useState(true)
	useScrollPosition(
		({ prevPos, currPos }) => {
		  const isShow = currPos.y > prevPos.y
		  if (isShow !== hideOnScroll) setHideOnScroll(isShow)
		},
		[hideOnScroll]
	)
  /// Path
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];
  /// Active menu
  let deshBoard = [
      "",
      "dashboard-dark",
      "schedule",
      "instructors",
      "message",
      "activity",
      "profile",
      "task",
    ],
	department = [
		"departments",
		"add-department"
	],

  inductions = [
		"inductions",
		"add-induction",
    "induction-detail",
    "create-induction",
    "single-induction-view"
	],


	courses = [
		"courses",
		"course-details-1",
		"course-details-2",
	],
	instructor=[
		"instructor-dashboard",
		"instructor-courses",
		"instructor-schedule",
		"instructor-students",
		"instructor-resources",
		"instructor-transactions",
		"instructor-liveclass",
	],
    app = [
      "app-profile",
      "post-details",
      "app-calender",
      "email-compose",
      "email-inbox",
      "email-read",
      "ecom-product-grid",
      "ecom-product-list",
      "ecom-product-order",
      "ecom-checkout",
      "ecom-invoice",
      "ecom-customers",
      "post-details",
      "ecom-product-detail",
    ],
    email = ["email-compose", "email-inbox", "email-read"],
    shop = [
      "ecom-product-grid",
      "ecom-product-list",
      "ecom-product-list",
      "ecom-product-order",
      "ecom-checkout",
      "ecom-invoice",
      "ecom-customers",
      "ecom-product-detail",
    ],
    charts = [
      "chart-rechart",
      "chart-flot",
      "chart-chartjs",
      "chart-chartist",
      "chart-sparkline",
      "chart-apexchart",
    ],
    bootstrap = [
      "ui-accordion",
      "ui-badge",
      "ui-alert",
      "ui-button",
      "ui-modal",
      "ui-button-group",
      "ui-list-group",
      "ui-card",
      "ui-carousel",
      "ui-dropdown",
      "ui-popover",
      "ui-progressbar",
      "ui-tab",
      "ui-typography",
      "ui-pagination",
      "ui-grid",
    ],
    plugins = [
      "uc-select2",
      "uc-nestable",
      "uc-sweetalert",
      "uc-toastr",
      "uc-noui-slider",
      "map-jqvmap",
      "uc-lightgallery",
    ],
	redux = [
       "redux-form",
	   "redux-wizard",    
       "todo",
    ],
    widget = ["widget-basic"],
    forms = [
      "form-element",
      "form-wizard",
      "form-editor-summernote",
      "form-pickers",
      "form-validation-jquery",
    ],
    table = ["table-bootstrap-basic", "table-datatable-basic"],
    pages = [
      "page-register",
      "page-login",
      "page-lock-screen",
      "page-error-400",
      "page-error-403",
      "page-error-404",
      "page-error-500",
      "page-error-503",
    ],
    error = [
      "page-error-400",
      "page-error-403",
      "page-error-404",
      "page-error-500",
      "page-error-503",
    ];
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
				<Link className="has-arrow" to="#" >
					<i className="bi bi-grid"></i>
					<span className="nav-text">Dashboard</span>
				</Link>
				<ul>
					<li><Link className={`${path === "dashboard" ? "mm-active" : ""}`} to="/dashboard"> Dashboard Light</Link></li>
					
					<li><Link className={`${path === "profile" ? "mm-active" : ""}`} to="/profile">Profile</Link></li>
						
				</ul>
			</li>


			<li className={`${department.includes(path) ? "mm-active" : ""}`}>
				<Link className="has-arrow" to="#" >
					<i className="bi bi-book"></i>
					<span className="nav-text">Department</span>
				</Link>
				<ul>
					<li><Link className={`${path === "department" ? "mm-active" : ""}`} to="/departments">Departments</Link></li>
					
					<li><Link className={`${path === "add-department" ? "mm-active" : ""}`} to="/add-department">Add Department </Link></li>
				</ul>
			</li>

			
			
			<li className={`${courses.includes(path) ? "mm-active" : ""}`}>
				<Link className="has-arrow" to="#" >
					<i className="bi bi-book"></i>
					<span className="nav-text">Inductions</span>
				</Link>
				<ul>

          {/* <li><Link className={`${path === "single-induction-view" ? "mm-active" : ""}`} to="/single-induction-view">Single Induction View</Link></li> */}


					{/* <li><Link className={`${path === "courses" ? "mm-active" : ""}`} to="/courses">Inductions</Link></li> */}
					
					<li><Link className={`${path === "create-induction" ? "mm-active" : ""}`} to="/create-induction">Create Induction </Link></li>


          <li><Link className={`${path === "inductions" ? "mm-active" : ""}`} to="/inductions">All Inductions </Link></li>

          {/* <li><Link className={`${path === "induction-detail" ? "mm-active" : ""}`} to="/course-details-2">Induction Detail</Link></li> */}
          
					{/* <li><Link className={`${path === "course-details-2" ? "mm-active" : ""}`} to="/course-details-2">Induction Details </Link></li> */}
				</ul>
			</li>
			<li className={`${instructor.includes(path) ? "mm-active" : ""}`}>
				<Link className="has-arrow" to="#"> <i className="bi bi-people"></i> <span className="nav-text">Company</span></Link>
				<ul>
					<li><Link className={`${path === "instructor-dashboard" ? "mm-active" : ""}`} to="/instructor-dashboard">Dashboard</Link></li>
					<li><Link className={`${path === "instructor-courses" ? "mm-active" : ""}`} to="/instructor-courses">Inductions</Link></li>
					<li><Link className={`${path === "instructor-schedule" ? "mm-active" : ""}`} to="/instructor-schedule">Schedule</Link></li>
					<li><Link className={`${path === "instructor-students" ? "mm-active" : ""}`} to="/instructor-students">Users</Link></li>
					<li><Link className={`${path === "instructor-resources" ? "mm-active" : ""}`} to="/instructor-resources">Resources</Link></li>
					<li><Link className={`${path === "instructor-transactions" ? "mm-active" : ""}`} to="/instructor-transactions">Transactions</Link></li>
					<li><Link className={`${path === "instructor-liveclass" ? "mm-active" : ""}`} to="/instructor-liveclass">Live Class</Link></li>
				</ul>
			</li>		



      <li className={`${forms.includes(path) ? "mm-active" : ""}`}>
				<Link className="has-arrow ai-icon" to="#" >
					<i className="bi bi-file-earmark-check"></i>
					<span className="nav-text forms">Forms</span>
				</Link>
				<ul >
					<li><Link className={`${path === "form-element" ? "mm-active" : ""}`} to="/form-element">Form Elements</Link></li>
					<li><Link className={`${path === "form-wizard" ? "mm-active" : ""}`} to="/form-wizard"> Wizard</Link></li>
					<li>
						<Link className={`${path === "form-editor-summernote" ? "mm-active" : ""}`}to="/form-editor-summernote">
							Summernote
						</Link>
					</li>
					<li><Link className={`${path === "form-pickers" ? "mm-active" : ""}`} to="/form-pickers">Pickers</Link></li>
					<li>
						<Link className={`${path === "form-validation-jquery" ? "mm-active" : ""}`} to="/form-validation-jquery">
							Form Validate
						</Link>
					</li>
				</ul>
			</li>	
			

        </MM>
			
			<div className="copyright">
				<p><strong>BJS Induction Admin</strong> © 2022 All Rights Reserved</p>
				<p className="fs-12">Made with <span className="heart"></span> by BJS</p>
			</div>
      </PerfectScrollbar>
    </div>
  );
};

export default SideBar;
