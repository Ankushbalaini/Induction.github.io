import React from "react";
import { useSelector } from "react-redux";
import InductionsByCompany from "../../InductionsByCompany";


const USER_ROLES = {
    SUPER_ADMIN: "super_admin",
    COMPANY: "company",
    INSTRUCTOR: "instructor",
    USER: "user",
  };

  
function FiltersForAttempts({
  CompanyFilterHandle,
  InductionFilterHandle,
    companyFilter,
    inductionFilter

}) {
  const role = useSelector((state) => state.auth.auth.role);
  const loggedInID = useSelector((state) => state.auth.auth.id);
  const parentCompany = useSelector((state) => state.auth.auth.parentCompany);

  return (
    <>
      <div className="input-group d-flex justify-content-end">
      
          <>
            <label htmlFor="induction_filter" style={{marginTop:30,
               fontSize: 15, 
               fontWeight: 600,
               minWidth: 50 }}>Select Induction </label>
            <select
              name="induction_filter"
              className="form-control11 btn border-light rounded"
              onChange={(e) => InductionFilterHandle(e)}
              style={{margin:20,
                 fontSize: 14,
                  minWidth: 100 }}
            >
              <option value="All">All</option>
              <InductionsByCompany parentCompany={companyFilter} />
            </select>
           
          </>
      </div>
    </>
  );
}
export default FiltersForAttempts;
