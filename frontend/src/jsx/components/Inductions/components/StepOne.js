import React,{ useState, useRef } from "react";

import DepartmentDropdown from "../../Department/DepartmentDropdown";
import JoditEditor from "jodit-react";

const StepOne = (props) => {
    const editor = useRef(null);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("Fullstack Developer");
    const [subTitle, setSubTitle] = useState("nodejs, mongo, react , express");
    const [deptID, setDeptID] = useState();
    
    const [inductionDesc, setInductionDesc] = useState(
        "<h1>Induction description</h1>"
    );

   return (
      <section>
         <div className="row">
            <div className="col-lg-6 mb-2">
               <div className="form-group mb-3">
                  <label className="text-label">Title*</label>
                  <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                    />
               </div>
            </div>
            <div className="col-lg-6 mb-2">
               <div className="form-group mb-3">
                  <label className="text-label">Sub title*</label>
                  <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      onChange={(e) => setSubTitle(e.target.value)}
                      value={subTitle}
                    />
               </div>
            </div>
            <div className="col-lg-6 mb-2">
               <div className="form-group mb-3">
                  <label className="text-label">Department*</label>
                  <select
                      className="form-control"
                      onChange={(e) => setDeptID(e.target.value)}
                    >
                      <DepartmentDropdown />
                    </select>
               </div>
            </div>
            <div className="col-lg-12 mb-2">
               <div className="form-group mb-3">
                  <label className="text-label">Description*</label>
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
            
         </div>
      </section>
   );
};

export default StepOne;
