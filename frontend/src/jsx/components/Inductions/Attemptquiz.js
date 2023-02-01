import React,{useState} from 'react';
import swal from 'sweetalert';
import PageTitle from '../../layouts/PageTitle';
import {nanoid} from 'nanoid';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Editable from './Editable';



const { Fragment } = require("react");
const tableList = [
	{
		id:"1", name:'Noora Sarao ', department:'BJS HR',gender:'Female', 
		education:'M.COM., M.B.A', mobile:'12345 67890', email:'hello@noora.com'
	},
	{	
		id:"2", name:'bjs PVT LTD', department:' BJS DT',gender:'Male', 
		education:'BTech, MTech', mobile:'09876 54321', email:'	bjs@homedelivery.com'
	},
	
]; 

const AttemptQuiz = ()=>{
    const [contents, setContents] = useState(tableList);

    // delete data  
    const handleDeleteClick = (contentId) => {
        const newContents = [...contents];    
        const index = contents.findIndex((content)=> content.id === contentId);
        newContents.splice(index, 1);
        setContents(newContents);
    }

    //Modal box
	   const [addCard, setAddCard] = useState(false);
	   //Add data 
    const [addFormData, setAddFormData ] = useState({
        name:'',
        department:'',
        gender:'',
	      	email:'',
        }); 

    // Add contact function
    const handleAddFormChange = (event) => {
      event.preventDefault();    
       const fieldName = event.target.getAttribute('name');
       const fieldValue = event.target.value;
       const newFormData = {...addFormData};
       newFormData[fieldName] = fieldValue;
       setAddFormData(newFormData);
      };
      
    //Add Submit data
    const handleAddFormSubmit = (event)=> {
        event.preventDefault();
        var error = false;
	      	var errorMsg = '';
        if(addFormData.name === ""){
            error = true;
			     errorMsg = 'Please fill  name';
        }else if(addFormData.department === ""){
            error = true;
			     errorMsg = 'Please fill department.';
        }else if(addFormData.gender === ""){
			     error = true;
		     	errorMsg = "please fill gender";
		      }
        if(!error){
            const newContent = {
                id: nanoid(),
                name: addFormData.name,
                department:  addFormData.department,
                gender:  addFormData.gender,
                email:  addFormData.email,
			         };
            
        const newContents = [...contents, newContent];
          setContents(newContents);
          setAddCard(false);
          swal('Good job!', 'Successfully Added', "success");
          addFormData.name  = addFormData.department = addFormData.gender =  addFormData.email = '';         
            
        }else{
			      swal('Oops', errorMsg, "error");
	      	}   
     };

    	// Edit function editable page loop
     const [editContentId, setEditContentId] = useState(null);
   
     // Edit function button click to edit
     const handleEditClick = ( event, content) => {
            event.preventDefault();
            setEditContentId(content.id);
            const formValues = {
                name: content.name,
                department: content.department,  
                gender: content.gender,   
                email: content.email,  	
             }
            setEditFormData(formValues);
            //setEditModal(true);
        };
       
        // edit  data  
        const [editFormData, setEditFormData] = useState({
            name:'',
            department:'',
            gender:'',
            email:'',
        })
        
        //update data function
        const handleEditFormChange = (event) => {
        event.preventDefault();   
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
        const newFormData = {...editFormData};
        newFormData[fieldName] = fieldValue;
        setEditFormData(newFormData);
      };

       // edit form data submit
      const handleEditFormSubmit = (event) => {
        event.preventDefault();
         const editedContent = {
          id: editContentId,
          name: editFormData.name,
          department: editFormData.department,
          gender: editFormData.gender,
          email: editFormData.email,
          }
         const newContents = [...contents];
         const index = contents.findIndex((content)=> content.id === editContentId);
         newContents[index] = editedContent;
         setContents(newContents);
         setEditContentId(null);
      // setEditModal(false);
     }

	    //Cencel button to same data
     const handleCancelClick = () => {
        setEditContentId(null);    
     };


    return(
        <Fragment>
            <PageTitle
            activeMenu="Attempted Quiz"
            motherMenu="Quiz"
            pageContent="Attempted Quiz"
          />
              <div className="row">
               <div className="col-xl-4 col-lg-4 col-xxl-4 col-sm-4">
                 <div className="widget-stat card bg-primary">
                  <div className="card-body  p-4">
                    <div className="media">
                      <span className="me-3">
                        <i className="la la-users"></i>
                      </span>
                      <div className="media-body text-white">
                        <p className="mb-1">Total Students</p>
                        <h3 className="text-white">3280</h3>
                        <div className="progress mb-2 bg-secondary">
                          <div
                            className="progress-bar progress-animated bg-light"
                            style={{ width: "80%" }}
                          ></div>
                        </div>
                        <small>80% Increase in 20 Days</small>
                      </div>
                    </div>
                  </div>
                 </div>
                </div>
              
                <div className="col-xl-4 col-lg-4 col-xxl-4 col-sm-4">
                 <div className="widget-stat card bg-secondary">
                   <div className="card-body p-4">
                     <div className="media">
                       <span className="me-3">
                         <i className="la la-graduation-cap"></i>
                       </span>
                       <div className="media-body text-white">
                         <p className="mb-1">Total Course</p>
                         <h3 className="text-white">28</h3>
                         <div className="progress mb-2 bg-primary">
                           <div
                             className="progress-bar progress-animated bg-light"
                             style={{ width: "76%" }}
                           ></div>
                         </div>
                         <small>76% Increase in 20 Days</small>
                       </div>
                     </div>
                   </div>
                 </div>
                </div>

                <div className="col-xl-4 col-lg-4 col-xxl-4 col-sm-4">
                 <div className="widget-stat card bg-danger">
                   <div className="card-body p-4">
                     <div className="media">
                       <span className="me-3">
                         <i className="bi bi-award-fill"></i>
                       </span>
                       <div className="media-body text-white">
                         <p className="mb-1">Student Passed</p>
                         <h3 className="text-white">4/10</h3>
                         <div className="progress mb-2 bg-primary">
                           <div
                             className="progress-bar progress-animated bg-light"
                             style={{ width: "76%" }}
                           ></div>
                         </div>
                         <small>76% Increase in 20 Days</small>
                       </div>
                     </div>
                   </div>
                 </div>
                </div>
               </div>

            {/* <PageTitle activeMenu="Student Table" motherMenu="Quiz" />  */}
            <div className="col-12">
              <Modal className="modal fade"  show={addCard} onHide={setAddCard}>
                <div className="" role="document">
                  <div className="">
                    <form>
                      <div className="modal-header">
                        <h4 className="modal-title fs-20"> Add Student</h4>
                        <button type="button" className="btn-close" onClick={()=> setAddCard(false)} data-dismiss="modal"><span></span></button>
                      </div>
                       <div className="modal-body">
                         <i className="flaticon-cancel-12 close" data-dismiss="modal"></i>
                         <div className="add-contact-content">
                           <div className="form-group mb-3">
                             <label className="text-black font-w500" >Name</label>
                             <div className="contact-name">
                               <input type="text" className="form-control"  autoComplete="off"
												                   		name="name" required="required"
												                   		onChange={handleAddFormChange}
												                   		placeholder="name"
												                   	/>
                               	<span className="validation-text"></span>
                             </div>
                           </div>
                           <div className="form-group mb-3">
										                 	<label className="text-black font-w500">Department</label>
										                 	  <div className="contact-name">
										                 	  	 <input type="text"  className="form-control"  autoComplete="off"
										                 	  	 	name="department" required="required"
										                 	  	 	onChange={handleAddFormChange}
										                 	  	 	placeholder="department"
										                 	  	 />
										                 	  	 <span className="validation-text"></span>
										                 	  </div>
										                 </div>
                           <div className="form-group mb-3">
										                   <label className="text-black font-w500">Gender</label>
										                   <div className="contact-name">
										                   	 <input type="text"  className="form-control"  autoComplete="off"
										                   	 	name="gender" required="required"
										                   	 	onChange={handleAddFormChange}
										                   	 	placeholder="gender"
										                   	 />
										                   	 <span className="validation-text"></span>
										                   </div>
										                  </div>
                            <div className="form-group mb-3">
										                   	<label className="text-black font-w500">Email</label>
										                   	 <div className="contact-name">
										                   	 	 <input type="text"  className="form-control"  autoComplete="off"
										                   	 	 	name="email" required="required"
										                   	 	 	onChange={handleAddFormChange}
										                   	 	 	placeholder="email"
										                   	 	 />
										                   	 	 <span className="validation-text"></span>
										                   	 </div>
									                   </div>
                         </div>
                        </div>
                        <div className="modal-footer">
                         <button type="submit" className="btn btn-primary" onClick={handleAddFormSubmit}>Add</button>   
						                   <button type="button" onClick={()=> setAddCard(false)} className="btn btn-danger"> <i className="flaticon-delete-1"></i> Discard</button> 
                        </div>
                       </form>
                      </div>
                   </div>
                </Modal>
                
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Student Details</h4>
                  </div>
                  <div className="card-body">
                    <div className="w-100 table-responsive">
                      <div id="example_wrapper" className="dataTables_wrapper">
                        <form onSubmit={handleEditFormSubmit}>
                          <table id="example" className="display w-100 dataTable">
                            <thead>
                             <tr>
                               <th>Name</th>
                               <th>Department</th>
                               <th>Gender</th>
                               <th>Email</th>
                               <th>Action</th>
                             </tr>
                            </thead>
                            <tbody>
                              {contents.map((content,index)=>(
                                <tr key={index}>
                                  {editContentId === content.id ? 
                                  (
                                    <Editable editFormData={editFormData} 
													                       handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick}/> 
                                  ):
                                  (
                                   <>
                                    <td>{content.name}</td>
                                    <td>{content.department}</td>
                                    <td>{content.gender}</td>
                                    <td>{content.email}</td>
                                    <td>
														                       	<div className="d-flex">
														 	                     	<Link className="btn btn-primary shadow btn-xs sharp me-2"
														 	                     		onClick={()=> setAddCard(true)}
														 	                     	>
														 	                     		<i className="fa fa-plus"></i>
														 	                     	</Link>
														 	                     	<Link  className="btn btn-secondary	 shadow btn-xs sharp me-2"
														 	                     		onClick={(event) => handleEditClick(event, content)}
														 	                     	>
														 	                     		<i className="fas fa-pen"></i>
														 	                     	</Link>
														 	                     	<Link  className="btn btn-danger shadow btn-xs sharp" 
														 	                     		onClick={()=>handleDeleteClick(content.id)}
														 	                     	> 
														 	                     		<i className="fa fa-trash"></i>
														 	                     	</Link>
														 	                     		
														 	                     </div>												
														                      </td>
                                   </>
                                   )
                                   }
                                </tr>
                              ))}
                             </tbody>
                           </table>
                          </form>
                         </div>
                       </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
};
 
export default AttemptQuiz;
