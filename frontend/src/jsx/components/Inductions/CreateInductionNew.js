import React, { Fragment, useState, useRef, useEffect } from "react";

import PageTitle from "../../layouts/PageTitle";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import JoditEditor from "jodit-react";
import { useSelector } from "react-redux";
import DepartmentDropdown from "../Department/DepartmentDropdown";
import DepartmentByCompany from "../Department/DepartmentByCompany";
import CompanyDropdown from "../Companies/CompanyDropdown";
import { API_ROOT_URL } from "../../constants";

const CreateInduction = () => {
  const navigate = useHistory();
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.auth.token);

  const [image, setImage] = useState({ preview: "", data: "" });
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [deptID, setDeptID] = useState("");
  const [parentCompany, setParentCompany] = useState("");
  const [parentDepartment, setParentDepartment] = useState("");
  const [option, setOption] = useState();

  const [inductionDesc, setInductionDesc] = useState(
    "<h1>Induction description</h1>"
  );
  const [formValues, setFormValues] = useState([
    { slideTitle: "", slideContent: "" },
  ]);

  const editor = useRef(null);
 

  // validation messages
  let errorsObj = { title: "", subTitle: "", deptID: "" };
  const [errors, setErrors] = useState(errorsObj);

  const handleFileChange = async (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (title === "") {
      errorObj.title = "Title is Required";
      error = true;
    }
    if (subTitle === "") {
      errorObj.subTitle = "Sub title is Required";
      error = true;
    }

    if (deptID === "") {
      errorObj.deptID = "Department is Required";
      error = true;
    }
    if (parentCompany == "") {
      errorObj.parentCompany = "Parent Company is Required";
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
      parentCompany: parentCompany,
    };

    let formData = new FormData();
    formData.append("induction", JSON.stringify(inductionDetail));
    formData.append("thumbnail", image.data);
    // formData.append('slides', JSON.stringify(formValues));
    let slides_json = [];
    for (var i = 0; i < formValues.length; i++) {
      slides_json.push(formValues[i]);
    }
    formData.append("slides", JSON.stringify(slides_json));

    const response = await fetch(`${API_ROOT_URL}/induction/store`, {
      method: "POST",
      headers: {
        "x-access-token": token,
      },
      body: formData,
    }).then((data) => data.json());

    if ("status" in response && response.status == true) {
      return swal("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        // return <Navigate to="/inductions" />;
        navigate.push("/inductions");
      });
    } else {
      return swal("Failed", response.message, "error");
    }
  };

  const handleCompanyChange = async (e) => {
    // call api to fetch departments
    setParentCompany(e.target.value);
    setOption("");
    const response = await fetch(
      `${API_ROOT_URL}/department/getDepartmentByComp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({ parentCompany: e.target.value }),
      }
    ).then((data) => data.json());

    if ("status" in response && response.status == true) {
      const rows = response.data.map((row, index) => (
        <option value={row._id}>{row.name}</option>
      ));

      setDeptID("");
      setOption(rows);
    }
  };

  // on click validation remove function
  function handleKeyPress(e) {
    var key = e.key;
    if (key == key) {
      setErrors(errorsObj == false);
    }
  }

  const buttonStyle = {
    // margin : "auto",
    display: "flex",
    float: "right",
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  const pageContent = loading ? (
    <i className="fas fa-atom fa-spin"></i>
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
                      name="title"
                      placeholder="Fullstack Developer"
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                      onKeyPress={(e) => handleKeyPress(e)}
                    />
                    {errors.title && (
                      <div Style="color:red;font-weight:600;padding:5px;">
                        {errors.title}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">Sub Title</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="subTitle"
                      placeholder="nodejs, mongo, react , express...."
                      onChange={(e) => setSubTitle(e.target.value)}
                      value={subTitle}
                      onKeyPress={(e) => handleKeyPress(e)}
                    />
                    {errors.subTitle && (
                      <div Style="color:red;font-weight:600;padding:5px;">
                        {errors.subTitle}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">Thumbnail</label>
                  <div className="col-sm-9">
                    <input
                      type="file"
                      className="form-control"
                      name="thumbnail"
                      onChange={handleFileChange}
                      accept="image/png,image/jpeg,image/jpg"
                    />
                  </div>
                </div>

                <div className="form-group mb-3">
                  <div className="mb-4 row">
                    <label className="col-sm-3 col-form-label">
                      Select Company{" "}
                    </label>
                    <div className="col-sm-9">
                      <select
                        name="parentCompany"
                        className="form-control"
                        onChange={handleCompanyChange}
                        value={parentCompany}
                        onKeyPress={(e) => handleKeyPress(e)}
                      >
                        <option>Select</option>
                        <CompanyDropdown prevSelected={parentCompany} />
                      </select>
                      {errors.parentCompany && (
                        <div Style="color:red;font-weight:600;padding:5px;">
                          {errors.parentCompany}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mb-4 row">
                    <label className="col-sm-3 col-form-label">
                      Select Department
                    </label>
                    <div className="col-sm-9">
                      <select
                        name="deptID"
                        className="form-control"
                        onChange={(e) => setDeptID(e.target.value)}
                        value={deptID}
                        onKeyPress={(e) => handleKeyPress(e)}
                      >
                        <option>Select</option>
                        {option}
                      </select>
                      {errors.deptID && (
                        <div Style="color:red;font-weight:600;padding:5px;">
                          {errors.deptID}
                        </div>
                      )}
                    </div>
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
                      onKeyPress={(e) => handleKeyPress(e)}
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
                    <button
                      className="btn btn-success"
                      type="submit"
                      style={buttonStyle}
                    >
                      Submit
                    </button>
                    <button
                      style={buttonStyle}
                      className="btn btn-primary mx-3"
                      type="button"
                      onClick={() => addFormFields()}
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
