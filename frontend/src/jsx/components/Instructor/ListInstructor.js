import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import DropDownBlog from "./../Dashboard/DropDownBlog";
import ActionDropDown from "./../Dashboard/ActionDropDown";
import UpdateProfile from "./UpdateProfile";

const images = require.context("../../../../../images/profile/", true);

const USER_ROLES = {
  SUPER_ADMIN: "super_admin",
  COMPANY: "company",
  INSTRUCTOR: "instructor",
  USER: "user",
};

// api call
async function getInstructorApi(role, companyID) {
    var getInstructorsApi = "http://localhost:8081/api/instructor/list";
    if (USER_ROLES.COMPANY === role) {
      var getInstructorsApi =
        "http://localhost:8081/api/instructor/listByCompany?role=company&parentCompany=" +
        companyID;
    }
    return fetch(getInstructorsApi, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => data.json());
}


const Instructors = () => {
    const role = useSelector((state) => state.auth.auth.role);
    const token = useSelector((state) => state.auth.auth.token);
    const parentCompany = useSelector((state) => state.auth.auth.id);

  const [data, setData] = useState(
    document.querySelectorAll("#student_wrapper tbody tr")
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sort = 5;
  const activePag = useRef(0);
  const [test, settest] = useState(0);
  const [students, setStudents] = useState(0);
  const [isUserStatusChanged, setIsUserStatusChanged] = useState(false);
  const [instructorData, setInstructorData] = useState({profile: {name:'', email:'',aboutMe:'',address:'',logo:'',_id:''} });


  // change status
  const changeUserStatus = (userID, status) =>{
    // user id
    swal({
      title: "Are you sure?",
      text:
        `Once status Changed, User will get or loss access to account`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willChange) => {
      if (willChange) {

        const response = await fetch("http://localhost:8081/api/users/changeUserStatus", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-access-token" : token,
          },
          body: JSON.stringify({ "userID" : userID, "status": status})
        }).then((data) => data.json());


        if ("status" in response && response.status == true) {
          swal("Poof! Your record has been updated!", {
            icon: "success",
          }).then(()=>{
            setIsUserStatusChanged(true);
          });
          
        } else {
          return swal("Failed", response.message, "error");
        }

      } else {
        swal("Your status is not changed!");
      }
    })
  }


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

  // callback function to opdate state
  const trackOnclick = (payload, userData) => {
    setIsModalOpen(payload);  
    if(payload){
      setInstructorData(userData);
    }
  }
    // callback function to opdate state
    const trackDeleteClick = () => {
      swal({
        title: "Are you sure?",
        text:
          "Once deleted, you will not be able to recover this record!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal("Poof! Your record has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your record is safe!");
        }
      })
    }


  const loadImage = (imageName) => {
		return images(`./${imageName}`);
	}	

  // use effect
  useEffect(() => {
    const handlepageLoad = async (event) => {
      const response = await getInstructorApi(role, parentCompany);

      if ("status" in response && response.status == true) {
        const rows = response.data.map((row, index) => (
          <tr key={index}>
            <td>
              <div className="d-flex align-items-center">
                <img src={loadImage(row.profile.profilePhoto)} alt="" />
                <h4 className="mb-0 fs-16 font-w500">
                  {row.profile?.name}
                </h4>
              </div>
            </td>
            <td>{row.email}</td>
            <td>{new Date(row.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric"})}</td>
            <td>
              {/* <span className={`badge  light badge-success`}>{`Active`}</span> */}
              <Link
                className={`badge light ${(row.status)? 'badge-success': 'badge-danger'}`}
                to="/instructors"
                onClick={() => changeUserStatus(row._id, row.status) }
                
              >
                { (row.status) ? 'Active' : 'Inactive'}
              </Link>
              
            </td>
            <td>
            <ActionDropDown trackOnclick={trackOnclick} userData={row} trackDeleteClick={trackDeleteClick}/>
              {/* <DropDownBlog /> */}
            </td>
          </tr>
        ));
        setStudents(rows);
        setIsUserStatusChanged(false);
        setData(document.querySelectorAll("#student_wrapper tbody tr"));
      } else {
        return swal("Failed", "Error message", "error");
      }
    };
    handlepageLoad();
  }, [isModalOpen, isUserStatusChanged]);

  // api call
  

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
              {/* <h4>Instructors</h4> */}
              
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
                        <th>Email ID</th>
                        <th>Join Date</th>
                        <th>Status</th>
                        <th>Action</th>
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
                        to="/instructors"
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
                            to="/instructors"
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
                        to="/instructors"
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

      <UpdateProfile isModalOpen={isModalOpen} trackOnclick={trackOnclick} instructorData={instructorData}></UpdateProfile>

    </>
  );
};
export default Instructors;
