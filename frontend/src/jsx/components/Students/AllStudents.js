import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import swal from "sweetalert";
import { Button, Dropdown, Modal } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import pic3 from "./../../../images/courses/pic3.jpg";
import pic2 from "./../../../images/courses/pic2.jpg";
import pic4 from "./../../../images/courses/pic4.jpg";

const AllStudents = () => {
  const [data, setData] = useState("");
  const sort = 8;
  const activePag = useRef(0);
  const [test, settest] = useState(0);
  const [students, setStudents] = useState(0);
  const [editHere, seteditHere] = useState(false);
  const [modelData, setModelData] = useState("");

  // model popup usestate
  const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] 	= useState('');
  const [email, setEmail] 		= useState('');
	const [password, setPassword] = useState('');
  const [image, setImage] = useState({ preview: "", data: "" });
  const [address, setAddress] = useState();
  const [aboutStudent, setAboutStudent] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState();

  const actionHandler = (students) => {
    setIsModalOpen(true);
    setModalData(students);
    setFirstName(students.name);
    setLastName(students.name);
    setEmail(students.email);
    setAddress(students.address);
    setAboutStudent(student.aboutStudent);
    // set values
  }

  // Edit company submit handler
  const onSubmitHandle = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', firstName);
    data.append('email', email);
    data.append('address', address);
    data.append('aboutStudent', aboutStudent);
    data.append('profile_previous', profile);
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

  const openModel = (rowData) => {
    //console.log("========================");
    console.log(rowData);
    setModelData(rowData);
    //console.log("========================");
    seteditHere(true);
  }
  // use effect
  useEffect(() => {
    const handlepageLoad = async (event) => {
      const response = await getStudents();

      if ("status" in response && response.status == true) {
        const rows = response.data.map((row, index) => (
          <tr key={index}>
            <td>
              <div className="d-flex align-items-center">
                <img src={pic2} alt="" />
                <h4 className="mb-0 fs-16 font-w500"></h4>
              </div>
            </td>
            <td>{row.firstName}</td>
            <td>{row.email}</td>
            <td> - </td>
            <td>January 2, 2020 </td>
            <td>
              <span className={`badge  light badge-success`}>{`Active`}</span>
            </td>
           <td>
            <Dropdown>
            <Dropdown.Toggle
            as="a"
            className="btn-link i-false btn sharp tp-btn-light btn-dark">
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
                <Dropdown.Item onClick={() => openModel(row)}>
                  Edit
                </Dropdown.Item>
                <Dropdown.Item >
                Delete
              </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            </td>
          </tr>
        ));
        setStudents(rows);
       
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

   //css for button
   const buttonStyle = {
    margin: "auto",
    display: "flex",
  };

  return (
    <div>
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
                        <th>Profile</th>
                        <th>Name</th>
                        <th>Student ID</th>
                        <th>Courses</th>
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
       {/* edit Modal */}
      
       <Modal className="modal fade" show={editHere} >
       <div className="modal-content" >
         <div className="modal-header">
           <h5 className="modal-title">Edit Student Details </h5>
           <Button variant="" type="button" className="btn-close" data-dismiss="modal" onClick={() => seteditHere(false)}>
             
           </Button>
         </div>
         <div className="modal-body">
         
           <form className="comment-form" onSubmit={(e) => { e.preventDefault(); seteditHere(false); }}>
             
           <div className="col-lg-12">
           <div className="form-group mb-3">
           <Form.Group controlId="formFile" className="mb-3">
           <label htmlFor="profile" className="text-black font-w600">Change Profile Picture</label>
           <Form.Control type="file" />
         </Form.Group>
           </div>
         </div>
             <div className="row">
               <div className="col-lg-6">
                 <div className="form-group mb-3">
                   <label htmlFor="name" className="text-black font-w600"> Name <span className="required"></span></label>
                   <input type="text" className="form-control" name="Name" placeholder="Name"  />
                 </div>
               </div>
               <div className="col-lg-6">
                 <div className="form-group mb-3">
                   <label htmlFor="email" className="text-black font-w600"> Student Email<span className="required"></span></label>
                   <input type="text" className="form-control" placeholder="Student email" name="studentemail" value=""/>
                 </div>
               </div>
 
                 <Form.Group as={Col} controlId="formGridState" className="form-group mb-3 text-black font-w600">
                 <Form.Label>Select Department</Form.Label>
                 <Form.Select>
                   <option>BJS-13</option>
                   <option>BJS</option>
                   <option>CSE</option>
                 </Form.Select>
               </Form.Group>

                 <div className="col-lg-12">
                   <div className="form-group mb-3">
                     <label htmlFor="about" className="text-black font-w600">About Student</label>
                     <textarea rows={3} className="form-control" name="aboutStudent" placeholder="Tell us something about you!" />
                   </div>
                 </div>

               
               <div className="col-lg-12">
                 <div className="form-group mb-3">
                   <Button type="submit" value="Submit" className="submit btn btn-primary" style={buttonStyle} >Submit</Button>
                   
                 </div>
               </div>
             </div>
           </form>
         </div>
       </div>
     </Modal>
    </div>
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
