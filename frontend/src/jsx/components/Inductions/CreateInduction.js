import React, { Fragment, useState, useRef, useEffect } from "react";
//import Multistep from "react-multistep";
import { Stepper, Step } from "react-form-stepper";

import StepOne from "./StepOne";
import StepTwo from "../Forms/Wizard/StepTwo";
import StepThree from "../Forms/Wizard/StepThree";
import StepFour from "../Forms/Wizard/StepFour";
import PageTitle from "../../layouts/PageTitle";
//"../../../layouts/PageTitle";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import JoditEditor from "jodit-react";
import { useSelector } from "react-redux";
import Select from "react-select";

import DepartmentDropdown from "../Department/DepartmentDropdown";

const CreateInduction = () => {
  const navigate = useHistory();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("Fullstack Developer");
  const [subTitle, setSubTitle] = useState("nodejs, mongo, react , express");
  const [deptID, setDeptID] = useState();
  const [inductionDesc, setInductionDesc] = useState(
    "<h1>Induction description</h1>"
  );
  const [formValues, setFormValues] = useState([
    { slideTitle: "", slideContent: "" },
  ]);

  const editor = useRef(null);
  const token = useSelector((state) => state.auth.auth.token);

  // validation messages
  let errorsObj = { title: "", subTitle: "", deptID: "" };
  const [errors, setErrors] = useState(errorsObj);

  const handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  const handleJoditEditorChange = (index, newContent) => {
    let newFormValues = [...formValues];
    newFormValues[index]["slideContent"] = newContent;
    setFormValues(newFormValues);
  };

  const addFormFields = () => {
    setFormValues([...formValues, { slideTitle: "", slideContent: "" }]);
  };

  const removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (title == "") {
      errorObj.title = "Title is Required";
      error = true;
    }
    if (subTitle == "") {
      errorObj.subTitle = "Sub title is Required";
      error = true;
    }

    if (deptID == "") {
      errorObj.deptID = "Department is Required";
      error = true;
    }

    setErrors(errorObj);
    if (error) return;

    const inductionDetail = {
      title: title,
      subTitle: subTitle,
      deptID: deptID,
      description: inductionDesc,
      content: "",
      thumbnail: "",
    };
    const combinedFormValues = {
      induction: inductionDetail,
      slides: formValues,
    };
    const response = await saveInduction(combinedFormValues);
    //alert(JSON.stringify(combinedFormValues));

    if ("status" in response && response.status == true) {
      return swal("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        // return <Navigate to="/inductions" />;
        navigate.push("/courses");
      });
    } else {
      return swal("Failed", "Error message", "error");
    }
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  // api call
  async function saveInduction(formValues) {
    return fetch("http://localhost:8081/api/induction/store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify(formValues),
    }).then((data) => data.json());
  }

  const buttonsty={
    float:"right"
  }

  const pageContent = loading ? (
    "loading"
  ) : (
    <Fragment>
      <PageTitle activeMenu="Create Induction" motherMenu="Inductions" />

      <div className="col-xl-12 col-lg-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Create Induction</h4>
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
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                    />
                    {errors.title && <div Style="color:red;font-weight:600;padding:5px;">{errors.title}</div>}
                  </div>
                  

                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">Sub Title</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      onChange={(e) => setSubTitle(e.target.value)}
                      value={subTitle}
                    />
                    {errors.subTitle && <div Style="color:red;font-weight:600;padding:5px;">{errors.subTitle}</div>}
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">Department</label>
                  <div className="col-sm-9">
                    <select
                      className="form-control"
                      onChange={(e) => setDeptID(e.target.value)}
                    >
                      <DepartmentDropdown />
                    </select>

                    {errors.deptID && <div Style="color:red;font-weight:600;padding:5px;">{errors.deptID}</div>}
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">
                    About induction
                  </label>
                  <div className="col-sm-9">
                    <JoditEditor
                      ref={editor}
                      value={inductionDesc}
                      tabIndex={1} // tabIndex of textarea
                      onBlur={(newContent) => setInductionDesc(newContent)} // preferred to use only this option to update the content for performance reasons
                      onChange={(newContent) => {
                        setInductionDesc(newContent);
                      }}
                    />
                  </div>
                </div>

                <div className="card-header">
                  <h4 className="card-title">Induction Slides</h4>
                </div>

                {formValues.map((element, index) => (
                  // console.log(element);

                  <div className="card-body" key={index}>
                    <div className="mb-3 row">
                      <label className="col-sm-3 col-form-label">
                        Slide Title
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          onChange={(newContent) =>
                            handleChange(index, newContent)
                          }
                          name="slideTitle"
                          value={element.slideTitle}
                        />
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label className="col-sm-3 col-form-label">
                        Slide Content
                      </label>
                      <div className="col-sm-9">
                        <JoditEditor
                          ref={editor}
                          value={element.slideContent}
                          tabIndex={2}
                          onBlur={(newContent) =>
                            handleJoditEditorChange(index, newContent)
                          }
                          onChange={(newContent) => {
                            handleJoditEditorChange(index, newContent);
                          }}
                          name="slideContent"
                        />
                      </div>
                    </div>
                    {index ? (
                      <div className="mb-12 row">
                        <div className="col-sm-12">
                          <button
                            type="button"
                            className="btn btn-primary remove"
                            onClick={() => removeFormFields(index)}
                          >
                            Remove
                          </button>{" "}
                        </div>
                      </div>
                    ) : null}
                  </div>
                ))}

                <div className="mb-12 row">
                  <div className="col-sm-12">
                  <button className="btn btn-success" type="submit" style={buttonsty}>
                  Submit
                </button>
                    <button
                      className="btn btn-primary mx-3"
                      type="button"
                      onClick={() => addFormFields()}
                      style={buttonsty}
                    >
                      Add New Slide
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

  return <Fragment>{pageContent}</Fragment>;
};

export default CreateInduction;
