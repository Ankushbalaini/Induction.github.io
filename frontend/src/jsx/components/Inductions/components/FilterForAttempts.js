import React from "react";
import { useSelector } from "react-redux";
import CompanyDropdown from "../../Companies/CompanyDropdown";
import InductionsByCompany from "./InductionsByCompany";


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
        {USER_ROLES.SUPER_ADMIN == role ? (
          <>
            
            <label htmlFor="company_filter"  style={{
              marginTop:30,
               fontSize: 15, 
               fontWeight: 600,
               minWidth: 50 }}>Select Company </label>
            <select
              name="company_filter"
              className="form-control11 btn border-light rounded"
              style={{margin:20, fontSize: 14 }}
              onChange={(e) => CompanyFilterHandle(e)}
            >
              <option value="All">All</option>
              <CompanyDropdown />
            </select>
            
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
        ) : null}

        {USER_ROLES.COMPANY === role ? (
          <div className="row d-flex justify-content-end">
            <div className="col-m-3">
              <label for="induction_filter" 
              style={{
                      fontWeight: "bold",
                            }}
              className="">Select Induction </label>
            </div>
            <div className="col-m-2">
              <select
                className="form-control"
                name="induction_filter"
                onChange={(e) => InductionFilterHandle(e)}
              >
                <option value="All">All</option>

                <InductionsByCompany parentCompany={loggedInID} />
              </select>
            </div>
          </div>
        ) : null}

        {USER_ROLES.INSTRUCTOR === role ? (
          <div className="row">
            <div className="col-xl-6">
              <label for="induction_filter">Select Induction: </label>
            </div>
            <div className="col-xl-6">
              <select
                className="form-control"
                name="induction_filter"
                onChange={(e) => InductionFilterHandle(e)}
              >
                <option value="All">All</option>

                <InductionsByCompany parentCompany={parentCompany} />
              </select>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
export default FiltersForAttempts;
