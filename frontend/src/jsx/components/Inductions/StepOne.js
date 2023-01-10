import React from "react";
import { useState } from "react";

const StepOne = () => {
    const [inductionTitle, setInductionTitle] = useState();

   return (
      <section>
         <div className="row">
            <div className="col-lg-6 mb-4">
               <div className="form-group mb-3">
                  <label className="text-label">Induction Title*</label>
                  <input
                     type="text"
                     name="inductionTitle"
                     className="form-control"
                     placeholder=""
                     required
                     onChange={(e)=>setInductionTitle(e.target.value)}
                  />
               </div>
            </div>
            <div className="col-lg-6 mb-4">
               <div className="form-group mb-3">
                  <label className="text-label">Induction Description*</label>
                  <textarea name="inductionDesc"
                     className="form-control"
                     placeholder=""
                     required>

                  </textarea>
                  
               </div>
            </div>
            <div className="col-lg-6 mb-4">
               <div className="form-group mb-3">
                  <label className="text-label">Induction Department*</label>
                  <input
                     type="text"
                     className="form-control"
                     id="inputGroupPrepend2"
                     aria-describedby="inputGroupPrepend2"
                     placeholder=""
                     required
                  />
               </div>
            </div>
            
         </div>
      </section>
   );
};

export default StepOne;
