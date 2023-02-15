import React, {useState, useRef} from "react";
import JoditEditor from "jodit-react";
import PageTitle from "../../layouts/PageTitle";
import InductionDropdown from "./InductionDropdown";

const Add = () => {

  const [image, setImage] = useState();
  const [formValues, setFormValues] = useState([
    { slideTitle: "", slideContent: "" },
  ]);

  const editor = useRef(null);

  

  const handleSubmit = () => {}


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


  return (
    <>
      <PageTitle activeMenu="Add Slides" motherMenu="Slides" />

      <div className="col-xl-12 col-lg-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Induction</h4>
          </div>
          <div className="card-body">
            <div className="basic-form">
              <form onSubmit={handleSubmit}>
                
                <div className="card-body">
                  <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">
                      Parent Induction
                    </label>
                    <div className="col-sm-9">
                      <select className="form-control" name="inductionID">
                        <option>Select</option>
                        <InductionDropdown />
                      </select>
                    </div>
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
                          rows={10}
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
                      className="btn btn-primary mx-3"
                      type="button"
                      onClick={() => addFormFields()}
                    >
                      Add New Slide
                    </button>

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
    </>
  );
};

export default Add;
