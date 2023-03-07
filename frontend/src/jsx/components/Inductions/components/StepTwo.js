import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";

const StepTwo = () => {
    const editor = useRef(null);    
    const [formValues, setFormValues] = useState([
        { slideTitle: "", slideContent: "" },
      ]);
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
      <section>
         <div className="row">

         {formValues.map((element, index) => (
         <>
            <div className="col-lg-6 mb-2">
               <div className="form-group mb-3">
                  <label className="text-label">Slide Title*</label>
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

            <div className="col-lg-6 mb-2">
               <div className="form-group mb-3">
                  <label className="text-label">Slide Content*</label>
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
            </>
            
            ))}

            <div className="col-lg-6 mb-2">
               <div className="form-group mb-3">
                    <button
                      className="btn btn-primary mx-3"
                      type="button"
                      onClick={() => addFormFields()}
                    >
                      Add New Slide
                    </button>
               </div>
            </div>
         </div>
      </section>
   );
};

export default StepTwo;
