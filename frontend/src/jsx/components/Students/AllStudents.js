import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import ActionDropDown from "./ActionDropDown";
import UpdateStudentModal from "./UpdateStudentModal";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const images = require.context("../../../../../images/profile/", true);

const AllStudents = () => {
  const navigate = useHistory();
  const token = useSelector((state) => state.auth.auth.token);

  const [data, setData] = useState(
    document.querySelectorAll("#student_wrapper tbody tr")
  );
  const sort = 5;
  const activePag = useRef(0);
  const [loading, setLoading] = useState(true);
  const [test, settest] = useState(0);
  const [students, setStudents] = useState(0);
  const [profileData, setProfileData] = useState({
    email:'',
    createdAt:'',
    profile:{ 
      first_name: '', 
      last_name: '', 
      profilePhoto:'dummy-user.png',
      aboutMe:'',
      address:''
    }});

  // model popup usestate
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserStatusChanged, setIsUserStatusChanged] = useState(false);
  
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

  const loadImage = (imageName) => {
		return images(`./${imageName}`);
	}	

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
            //navigate.push("/students");
          });
          
        } else {
          return swal("Failed", response.message, "error");
        }

      } else {
        swal("Your status is not changed!");
      }
    })


  }

    // callback function to opdate state
    const trackOnclick = (payload, pdata) => {
      if(pdata){
        setProfileData(pdata);
      } 
      setIsModalOpen(payload);
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

  const handlepageLoad = async (event) => {
     
    const response = await fetch("http://localhost:8081/api/students/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => data.json());


    if ("status" in response && response.status == true) {
      setStudents(response.data);
      setLoading(false);
      setIsUserStatusChanged(false);
      setData(document.querySelectorAll("#student_wrapper tbody tr"));
    } else {
      return swal("Failed", "Error message", "error");
    }
  };
  
  // use effect
  useEffect(() => {
    handlepageLoad();
    setData(document.querySelectorAll("#student_wrapper tbody tr"));
  }, [profileData,isModalOpen,isUserStatusChanged]);

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

   //css for button
   const buttonStyle = {
    margin: "auto",
    display: "flex",
  };

  return (
    <>
     { (loading) ? <h3>Loading</h3> : 
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
                        {/* <th>Company</th>
                        <th>Department</th> */}
                        <th>Join Date</th>
                        <th>Status</th>
                        <th Style="text-align: end">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    { 
                    students.map((row, index) => (
                        <tr key={index}>
                          <td>
                            <div className="d-flex align-items-center">
                              <img src={loadImage(row.profile.profilePhoto)} alt="" />
                              <h4 className="mb-0 fs-16 font-w500">
                              {row.profile?.first_name} {row.profile?.last_name} 
                              </h4>
                            </div>
                          </td>
                          <td>{row.email}</td>
                          {/* <td>{row.parentCompany}</td>
                          <td>{row.deptID}</td> */}
                          <td>{new Date(row.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric"})}</td>
                          <td>

                          <Link
                            className={`badge light ${(row.status)? 'badge-success': 'badge-danger'}`}
                            to="/students"
                            onClick={() => changeUserStatus(row._id, row.status) }
                            
                          >
                            { (row.status) ? 'Active' : 'Inactive'}
                          </Link>
                          

                            {/* <span className={`badge light ${(row.status)? 'badge-success': 'badge-danger'}`}>
                              <a onClick={ changeUserStatus(row._id) } >{ (row.status) ? 'Active' : 'Inactive'}</a>
                              
                              
                            </span> */}
                          </td>
                          <td>
                            <ActionDropDown trackOnclick={trackOnclick} profileData={row} trackDeleteClick={trackDeleteClick}/>
                          </td>
                        </tr>
                      ))
                    }
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
      }
      
      <UpdateStudentModal  isModalOpen={isModalOpen} trackOnclick={trackOnclick} profileData={profileData} />


    </>
  );
};
export default AllStudents;


// <Form.Group as={Col}controlId="formGridState" className="form-group mb-3 text-black font-w600">
// <Form.Label>Status</Form.Label>
// <Form.Select defaultValue="Choose...">
//   <option>Active</option>
//   <option>Inactive</option>
// </Form.Select>
// </Form.Group>
