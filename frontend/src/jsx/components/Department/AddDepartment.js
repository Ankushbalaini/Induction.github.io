import React, { Fragment, useState, useRef } from "react";
import PageTitle from "../../layouts/PageTitle";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

const AddDepartment =() =>{
    const navigate = useHistory();
    const [name,setName] = useState();
    const [status , setStatus] =useState();


 let handleSubmit = async (event)=>{
    event.preventDefault();
    const deparment ={
        name:name,
        status: status
     };

     const response = await AddDepartment(deparment);

     if ("status" in response && response.status == true){
        return swal("Success", response.message, "success", {
            buttons: false,
            timer: 2000,
          }).then((value) => {
            // return <Navigate to="/inductions" />;
            navigate.push("/departments");
          });
     }
     else {
        return swal ("Failed", "Error message", "error")
     }
 };


 // api call
 async function AddDepartment(formValues){
    //console.log(formValues); return;
    const name = formValues.name;
    if (name.trim() == '' || name == undefined) {
        return swal("Error", 'Name is required.', "error", {
            buttons: false,
            timer: 2000,
          });
    }
    const status = formValues.status;
    // if (status.trim() == '' || status == undefined) {
    //     return swal("Error", 'Status is required.', "error", {
    //         buttons: false,
    //         timer: 2000,
    //       });
    // }
     return fetch ("http://localhost:8081/api/department/add" ,{
         method : "POST",
         headers :{
             "Content-Type" : "application/json",
         },
         body: JSON.stringify(formValues),
     }). then ((data)=> data.json());
 }


 return (
     <Fragment>
         <PageTitle activeMenu= "Add Department" motherMenu= "Department"/>
         <div className="col-xl-12 col-lg-12">
             <div className="card">
                 <div className="card-header">
                     <h4 className="card-titlhandleSubmite">Add Department</h4>
                 </div>
                 <div className="card-body">
                     <div className="basic-form">
                         <form onSubmit={handleSubmit}>
 
                             <div className="mb-3 row">
                                 <label className="col-sm-3 col-form-label">
                                     Department Name
                                 </label>
                                 <div className="col-sm-9">
                                     <input 
                                       type="text"
                                       className="form-control"
                                       placeholder=""
                                       onChange={(e) =>setName(e.target.value)}
                                       value={name}
                                     />
                                 </div>
                             </div>
 
                             <div className="mb-3 row">
                                 <label className="col-sm-3 col-form-label">
                                     Department Status
                                 </label>
                                 <div className="col-sm-9">
                                 <select className="form-control" onChange={(e) =>setStatus(e.target.value)}>
                                    <option value="Active">Active</option>
                                    <option value="In active">Inactive</option>
                                    </select>
                                      {/* <input 
                                       type="text"
                                       className="form-control"
                                       placeholder=""
                                       onChange={(e) =>setStatus(e.target.value)}
                                       value={status}
                                       /> */}
                                 </div>
                             </div>
 
                             <div className="mb-12 row">
                                <div className="col-sm-12">
                                 <button className="btn btn-success" type="submit">
                                   Submit
                                 </button>
                               </div>
                             </div>      
                         </form>
                     </div>
                 </div>
             </div>
         </div>
     </Fragment>
  );
};

export default AddDepartment;