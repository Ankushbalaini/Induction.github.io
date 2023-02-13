import React, { Fragment, useState, useRef, useEffect } from "react";
import PageTitle from "../../layouts/PageTitle";
import swal from "sweetalert";
import Table from "./DataTable";
import { useSelector } from "react-redux";

const AllStudents =()=>{
    const [students,setStudents] = useState();
    const [loading, setLoading] = useState(true);

    const token = useSelector((state) => state.auth.auth.token);

    const actionHandler = () => {
        // setIsModalOpen(true);
        // setModalData(department);
        // setName(department.name);
        // setStatus(department.status);
        // setParentCompany(department.parentCompany);
        // setEditID(department._id);
    }
    
    const deleteClick = () => {
        // show delete confirmation msg
        swal({
          title: "Are you sure?",
          text:
            `Once deleted, you will not be able to recover company!`,
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            swal("Poof! Your company has been deleted!", {
              icon: "success",
            });
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
          //setIsUserStatusChanged(false);
          //setData(document.querySelectorAll("#student_wrapper tbody tr"));
        } else {
          return swal("Failed", "Error message", "error");
        }
    };

    useEffect(()=>{
        if(loading){
            handlepageLoad();
        }
        
    },[loading]);



  const buttonsty={
    margin:"auto",
    display:"flex"
  }
  return (
    <Fragment>
        <PageTitle activeMenu="All Users" motherMenu= "User" />

        { (loading) ? <h3>Loading</h3>: <Table data={students}  actionHandler={actionHandler} deleteClick={deleteClick}/>}

        {/* <div className="row">
            <div className="col-xl-12">
                <div className="card students-list">
                    <div className="card-header border-0 flex-wrap pb-0">
                        <h4>Student List</h4>
                    </div>
                    <div className="card-body py-0">
                        <div className="table-responsive">
                            <div
                             id="student_wrapper"
                             className="dataTables_wrapper no-footer"
                            >
                              
                              <Table data={students}  actionHandler={actionHandler} deleteClick={deleteClick}/>
                            </div> 
                        </div>
                     </div>
                </div>
            </div>
        </div> */}

    </Fragment>
  );
};

export default AllStudents;