import React from "react";

const StepOne = () => {
   return (
      <section>
         <div className="row">
            <div className="col-lg-6 mb-2">
               <div className="form-group mb-3">
                  <label className="text-label">Title*</label>
                  <input
                     type="text"
                     name="title"
                     className="form-control"
                     required
                  />
               </div>
            </div>
            <div className="col-lg-6 mb-2">
               <div className="form-group mb-3">
                  <label className="text-label">Sub Title*</label>
                  <input
                     type="text"
                     name="subTitle"
                     className="form-control"
                     required
                  />
               </div>
            </div>
            <div className="col-lg-6 mb-2">
               <div className="form-group mb-3">
                  <label className="text-label">Thumbnail*</label>
                  <input
                     type="file"
                     className="form-control"
                     required
                  />
               </div>
            </div>
            <div className="col-lg-6 mb-2">
               <div className="form-group mb-3">
                  <label className="text-label">Passing Percentage*</label>
                  <input
                     type="number"
                     name="passingPercentage"
                     className="form-control"
                     placeholder="33%"
                     required
                  />
               </div>
            </div>
            <div className="col-lg-12 mb-3">
               <div className="form-group mb-3">
                  <label className="text-label">About Induction*</label>
                  <textarea
                     name="aboutInduction"
                     className="form-control"
                     required
                  >
                  </textarea>
               </div>
            </div>
         </div>
      </section>
   );
};

export default StepOne;
