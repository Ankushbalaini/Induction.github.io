import React, { Fragment, useState, useRef, useEffect } from "react";
import PageTitle from "../../layouts/PageTitle";
import swal from "sweetalert";
import { useHistory, Link } from "react-router-dom";
import Table from "./DataTable";


const ListDepartments =()=>{
    const navigate = useHistory();
    const [name,setName] = useState();
    const [status , setStatus] =useState();
    const [departments,setDepartments] =useState();
    const [deptData, setdeptData] = useState([{name:'noora'}]);


        const actionHandler = (company) => {
        //setName(company.name);
        
        // set values
      }
    
      const deleteClick = (comp_name) => {
        // show delete confirmation msg
        swal({
          title: "Are you sure?",
          text:
            `Once deleted, you will not be able to recover ${comp_name} company!`,
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

    useEffect(()=>{
        const handlepageLoad = async (event) =>{
            
           const response = await getDepartments();
            const a =1;
           if ("status" in response && response.status == true){
            

            //const rows = <h1>Here</h1>
            const rows = response.data.map((row,index)=>{
                return <tr key ={index}>
                     <td>
                         <div className="d-flex align-items-center">
                             <h4 className="mb-0 fs-16 font-w500">
                                {row.name}
                             </h4>
                         </div>
                     </td>
                     
                     <td>
                         <span classname ={`badge  light badge-success`}>{row.status}</span>
                     </td>
                     <td>
                         <Link to ={`/department-detail/${row._id}`}>View</Link>
                     </td>
                 </tr>
             });
            
            setDepartments(rows);
            setdeptData(response.data);

           }else{
            return swal ("Failed","Error message","error");
           }
        };
        handlepageLoad();
    },[]);

  // api call
  async function getDepartments(formValues){
    return fetch ("http://localhost:8081/api/department/getall",{
        method: "GET",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
    }).then ((data)=>data.json());
  }

  return (
    <Fragment>
        <PageTitle activeMenu="All Departments" motherMenu= "Department" />
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
                                <thead>
                                    <tr>
                                        <th>Name </th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {departments}
                                </tbody>

                                
                              </table>

                              <Table data={deptData}  actionHandler={actionHandler} deleteClick={deleteClick}/>

                            </div> 
                        </div>
                     </div>
                </div>
            </div>
        </div>
    </Fragment>
  );
};

export default ListDepartments;