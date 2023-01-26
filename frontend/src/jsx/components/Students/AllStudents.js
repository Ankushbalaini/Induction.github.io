import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import swal from "sweetalert";

import DropDownBlog from "./../Dashboard/DropDownBlog";
//import StudentApexLineChart from './Instructor/StudentApexLineChart';
//import UserApexLineChart from './Instructor/UserApexLineChart';
//import StudentsActivityApex from './Instructor/StudentsActivityApex';

import pic3 from "./../../../images/courses/pic3.jpg";
import pic2 from "./../../../images/courses/pic2.jpg";
import pic4 from "./../../../images/courses/pic4.jpg";

// const studentTableBlog =[
// 	{image: pic3,
// 		title: 'Karen Hope',
// 		status:'On Progress',
// 		changeClass:'badge-warning'
// 	},
// 	{image: pic2 , title: 'Jordan Nico', status:'No Progress', changeClass:'badge-primary' },
// 	{image: pic4, title: 'Johnny Ahmad', status:'Completed', changeClass:'badge-success'},
// ];

const AllStudents = () => {
  const [data, setData] = useState(
    document.querySelectorAll("#student_wrapper tbody tr")
  );
  const sort = 3;
  const activePag = useRef(0);
  const [test, settest] = useState(0);
  const [students, setStudents] = useState(0);

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
  // use effect
  useEffect(() => {
    const handlepageLoad = async (event) => {
      const response = await getStudents();

      if ("status" in response && response.status == true) {
        const rows = response.data.map((row, index) => (
          <tr key={index}>
            <td>
              <div className="d-flex align-items-center">
                <img src={pic3} alt="" />
                <h4 className="mb-0 fs-16 font-w500">
                  {row.profile?.first_name}
                </h4>
              </div>
            </td>
            <td>{row.email}</td>
            <td> - </td>
            <td>January 2, 2020 </td>
            <td>
              <span className={`badge  light badge-success`}>{`Active`}</span>
            </td>
            <td>
              <DropDownBlog />
            </td>
          </tr>
        ));
        setStudents(rows);
        setData(document.querySelectorAll("#student_wrapper tbody tr"));
      } else {
        return swal("Failed", "Error message", "error");
      }
    };
    handlepageLoad();
  }, [test]);

  // api call
  async function getStudents() {
    return fetch("http://localhost:8081/api/students/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => data.json());
  }

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

  return (
    <>
      <div className="row">
        <div className="col-xl-12">
          <div className="card students-list">
            <div className="card-header border-0 flex-wrap pb-0">
              <h4>Students List</h4>
              
            </div>
            <div className="card-body py-0">
              <div className="table-responsive">
                <div
                  id="student_wrapper"
                  className="dataTables_wrapper no-footer"
                >
                  <table
                    className="table display mb-4 dataTablesCard order-table card-table text-black application "
                    id="application-tbl1_next"
                  >
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Student ID</th>
                        <th>Courses</th>
                        <th>Join Date</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {students}
                    </tbody>
                  </table>
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
                        to="/students"
                        onClick={() =>
                          activePag.current > 0 &&
                          onClick(activePag.current - 1)
                        }
                      >
                        <i
                          className="fa fa-angle-double-left"
                          aria-hidden="true"
                        ></i>
                      </Link>
                      <span>
                        {paggination.map((number, i) => (
                          <Link
                            key={i}
                            to="/students"
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
                        to="/students"
                        onClick={() =>
                          activePag.current + 1 < paggination.length &&
                          onClick(activePag.current + 1)
                        }
                      >
                        <i
                          className="fa fa-angle-double-right"
                          aria-hidden="true"
                        ></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AllStudents;
