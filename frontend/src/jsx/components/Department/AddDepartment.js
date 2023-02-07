import React, { Fragment, useState, useRef } from "react";
import PageTitle from "../../layouts/PageTitle";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import CompanyDropdown from "../Companies/CompanyDropdown";
import { useSelector } from "react-redux";

const AddDepartment =() =>{
    const navigate = useHistory();
    const [name,setName] = useState();
    const [status , setStatus] = useState(1);
    const loggedrole = useSelector((state) => state.auth.auth.role);
    const [parentCompany, setParentCompany] = useState('');
    const token = useSelector((state) => state.auth.auth.token);


// validation messages
let errorsObj = { name: "", status: "",  parentCompany:"" };
const [errors, setErrors] = useState(errorsObj);

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
        return swal ("Failed", response.message, "error")
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
             "x-access-token" : token,
         },
         body: JSON.stringify(formValues),
     }). then ((data)=> data.json());
 }

   //css for button
   const buttonStyle = {
    margin: "auto",
    display: "flex",
    float: 'right'
  };


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
                               {errors.name && <div Style="color:red;font-weight:600;padding:5px;">{errors.name}</div>}

                                 </div>
                             </div>
                             {/* { (loggedrole == 'company') ?
                                <div className="mb-3 row">
                                  <label className="col-sm-3 col-form-label">Parent Company</label>
                                  <div className="col-sm-9">
                
                                     
                                  
                                     <select name="parentCompany" className="form-control" onChange={ (e) => setParentCompany(e.target.value) }>
                                     <option value="">Select</option>
                                       <CompanyDropdown />
                                    </select> 
                
                                    {errors.parentCompany && <div Style="color:red;font-weight:600;padding:5px;">{errors.parentCompany}</div>}
                
                                  </div>
                                </div>
                                : 
                                <input
                                  name="parentCompany"
                                  type="hidden"
                                  className="form-control"
                                  value={parentCompany}
                                />
                                } */}
 
                             <div className="mb-3 row">
                                 <label className="col-sm-3 col-form-label">
                                     Department Status
                                 </label>
                                 <div className="col-sm-9">
                                 <select className="form-control" onChange={(e) =>setStatus(e.target.value)}>
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                    </select>
                                    {errors.status && <div Style="color:red;font-weight:600;padding:5px;">{errors.status}</div>}

                                 </div>
                             </div>
 
                             <div className="mb-12 row">
                                <div className="col-sm-12">
                                 <button className="btn btn-success" type="submit" style={buttonStyle} >
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