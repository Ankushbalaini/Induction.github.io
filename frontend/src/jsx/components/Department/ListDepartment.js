import React, { Fragment, useState, useRef, useEffect } from "react";
import PageTitle from "../../layouts/PageTitle";
import swal from "sweetalert";
import { useHistory, Link } from "react-router-dom";
import Table from "./DataTable";
import DropDownBlog from "./../Dashboard/DropDownBlog";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";

// api call
async function getDepartments(token) {
  return fetch("http://localhost:8081/api/department/getall", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  }).then((data) => data.json());
}

const ListDepartments = () => {
  const navigate = useHistory();
  const [name, setName] = useState();
  const [status, setStatus] = useState();
  const [parentCompany, setParentCompany] = useState();
  const [departments, setDepartments] = useState();
  const [deptData, setdeptData] = useState([{ name: "noora" }]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ name: "" });
  const [editID, setEditID] = useState();
  const token = useSelector((state) => state.auth.auth.token);

  const actionHandler = (department) => {
    console.log(
      "here"
    );
    setIsModalOpen(true);
    setModalData(department);
    setName(department.name);
    setStatus(department.status);
    setParentCompany(department.parentCompany);
    setEditID(department._id);
  };

  const deleteClick = (comp_name) => {
    // show delete confirmation msg
    swal({
      title: "Are you sure?",
      text: `Once deleted, you will not be able to recover ${comp_name} company!`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your company has been deleted!", {
          icon: "success",
        });
      }
    });
  };


  //Edit Department submit handler
  const onSubmitHandle = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    //data.append("name", name);
    //data.append("status", status);
    // data.append('companyID', companyID)

    const response = await fetch(
      "http://localhost:8081/api/department/edit/" + editID,
      {
        method: "PUT",
        headers: {
          // "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify(data),
      }
    ).then((data) => data.json());

    if ("status" in response && response.status == true) {
      setIsModalOpen(false);
      return swal("Success", response.message, "success");
    } else {
      return swal("Failed", response.message, "error");
    }
  };

  

  const handlepageLoad = async (event) => {
    const response = await getDepartments(token);
    if ("status" in response && response.status == true) {
      setdeptData(response.data);
    } else {
      return swal("Failed", "Error message", "error");
    }
  };

  


  useEffect(() => {
    handlepageLoad();
  }, [isModalOpen ]);

  const buttonsty = {
    margin: "auto",
    display: "flex",
  };
  return (
    <Fragment>
      <PageTitle activeMenu="All Departments" motherMenu="Department" />
      <div className="row">
        <div className="col-xl-12">
          <div className="card students-list">
            <div className="card-header border-0 flex-wrap pb-0">
              <h4>Department List</h4>
            </div>
            <div className="card-body py-0">
              <div className="table-responsive">
                <div
                  id="student_wrapper"
                  className="dataTables_wrapper no-footer"
                >
                  <table
                    className="table display mb-4 dataTablesCard order-table card-table text-black application"
                    id="application-tbl1_next"
                  >
                    {/* <thead>
                                    <tr>
                                        <th>Name </th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead> */}
                    <tbody>{departments}</tbody>
                  </table>
                  <Table
                    data={deptData}
                    actionHandler={actionHandler}
                    deleteClick={deleteClick}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal className="modal fade" show={isModalOpen}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Department Details</h5>
            <Button
              variant=""
              type="button"
              className="btn-close"
              data-dismiss="modal"
              onClick={() => setIsModalOpen(false)}
            ></Button>
          </div>
          <div className="modal-body">
            <form className="company-form" onSubmit={(e) => onSubmitHandle(e)}>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <label htmlFor="name" className="text-black font-w600">
                      {" "}
                      Name {name}<span className="required"></span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <label htmlFor="author" className="text-black font-w600">
                      {" "}
                      Department Status = { status ? 'Active': 'Inactive' }<span className="required"></span>{" "}
                    </label>
                    <select
                      className="form-control"
                      name="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value={1}>Active</option>
                      <option value={0}>Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <Button
                      style={buttonsty}
                      type="submit"
                      value="Submit"
                      className="submit btn btn-primary"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default ListDepartments;
