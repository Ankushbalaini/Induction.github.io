import React from "react";

const StepTwo = () => {
   return (
      <section>
         <div className="row">
            <div className="col-lg-6 mb-2">
               <div className="form-group mb-3">
                  <label className="text-label">Slide Title*</label>
                  <input
                     type="text"
                     name="firstName"
                     className="form-control"
                     required
                  />
               </div>
            </div>
            <div className="col-lg-6 mb-2">
               <div className="form-group mb-3">
                  <label className="text-label">Subtitle*</label>
                  <input
                     type="email"
                     className="form-control"
                     id="emial1"
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


            <div className="col-lg-12 mb-2">
               <div className="form-group mb-3">
                  <label className="text-label">Content*</label>
                  <textarea
                     rows="10" 
                     cols="50"
                     type="text"
                     name="phoneNumber"
                     className="form-control"
                     required
                  />
               </div>
            </div>

            
         </div>
      </section>
   );
};

export default StepTwo;
