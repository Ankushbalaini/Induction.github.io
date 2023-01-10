import React, { Fragment, useState, useRef } from "react";
//import Multistep from "react-multistep";
import { Stepper, Step } from 'react-form-stepper';

import StepOne from "./StepOne";
import StepTwo from "../Forms/Wizard/StepTwo";
import StepThree from "../Forms/Wizard/StepThree";
import StepFour from "../Forms/Wizard/StepFour";
import PageTitle from "../../layouts/PageTitle";
//"../../../layouts/PageTitle";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";
import JoditEditor from 'jodit-react';

const CreateInduction = () => {
	const navigate = useHistory();
  const [inductionTitle, setInductionTitle] = useState();
  const [inductionDept, setInductionDept] = useState();
  const [inductionDesc, setInductionDesc] = useState();
  const [formValues, setFormValues] = useState([{ slideTitle: "", slideContent : ""}]);
  const [inductionContent, setInductionContent] = useState();
  const editor = useRef(null);

	let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  }
    
  let addFormFields = () => {
    setFormValues([...formValues, { slideTitle: "", slideContent: "" }]);
  }
  
  let removeFormFields = (i) => {
      let newFormValues = [...formValues];
      newFormValues.splice(i, 1);
      setFormValues(newFormValues);
  }
  
  let handleSubmit = async (event) => {
      event.preventDefault();
      const inductionDetail = {
        induction_title: inductionTitle, 
        induction_department: inductionDept,
        induction_content: inductionDesc
        
      };
      const combinedFormValues = {
        'induction' : inductionDetail,
        'slides' : formValues
      };
      const response = await saveInduction(combinedFormValues);
      //alert(JSON.stringify(combinedFormValues));

      if ('status' in response && response.status == true) {
        return swal("Success", response.message, "success", {
            buttons: false,
            timer: 2000,
          })
          .then((value) => {
            // return <Navigate to="/inductions" />;
            navigate.push("/inductions");
          });
      }else{
        return swal("Failed", "Error message", "error");
      }

  }


  // api call
  async function saveInduction(formValues) {
    return fetch('http://localhost:8081/api/induction/store', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formValues)
    })
      .then(data => data.json())
  }




	return (
		<Fragment>
			<PageTitle activeMenu="Create Induction" motherMenu="Inductions" />
      
      <div className="col-xl-12 col-lg-12">
        <div className="card">
            <div className="card-header">
              <h4 className="card-title">Create Induction</h4>

              <div className="col-sm-6">
                  <button className="btn btn-success" type="submit">Submit</button>
              </div>

            </div>
            <div className="card-body">
              <div className="basic-form">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">Title</label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        onChange={(e)=>setInductionTitle(e.target.value)}
                        value={inductionTitle}
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">Department</label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        onChange={(e)=>setInductionDept(e.target.value)}
                        value={inductionDept}

                      />
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">About induction</label>
                    <div className="col-sm-9">
                      {/* <textarea
                        className="form-control"
                        placeholder=""
                        onChange={(e)=>setInductionDesc(e.target.value)}
                      >{inductionDesc}</textarea> */}


                  <JoditEditor
                    ref={editor}
                    value={inductionDesc}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={newContent => setInductionDesc(newContent)} // preferred to use only this option to update the content for performance reasons
                    onChange={newContent => {setInductionDesc(newContent)}}
                  />


                    </div>
                  </div>

                  




                  <div className="card-header">
                      <h4 className="card-title">Induction Slides</h4>
                  </div>

                  {formValues.map((element, index) => (
                    <div className="card-body" key={index} >
                      <div className="mb-3 row">
                          <label className="col-sm-3 col-form-label">Slide Title</label>
                          <div className="col-sm-9">
                              <input type="text"
                              className="form-control"
                              placeholder=""  onChange={e => handleChange(index, e)} name="slideTitle" value={element.slideTitle}/>
                          </div>
                      </div>
                      <div className="mb-3 row">
                        <label className="col-sm-3 col-form-label">Slide Content</label>
                        <div className="col-sm-9">
                        {/* <textarea
                            className="form-control"
                            placeholder=""
                            onChange={e => handleChange(index, e)} 
                            value={element.slideContent} 
                        name="slideContent"></textarea> */}

                        <JoditEditor
                          ref={editor}
                          value={element.slideContent}
                          tabIndex={1} // tabIndex of textarea
                          onBlur={e => handleChange(index, e)} // preferred to use only this option to update the content for performance reasons
                          onChange={e => handleChange(index, e)}
                        />


                        </div>
                      </div>
                      {
                        index ? 
                        <div className="mb-12 row">
                    <div className="col-sm-12"><button type="button" className="btn btn-primary remove" onClick={() => removeFormFields(index)}>Remove</button> </div></div>
                        : null
                      }
                    </div>
                  ))}
                  
                  <div className="mb-12 row">
                    <div className="col-sm-12">
                        <button className="btn btn-primary mx-3" type="button" onClick={() => addFormFields()}>Add New Slide</button>
                    
                        <button className="btn btn-success" type="submit">Submit</button>
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

export default CreateInduction;
