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
      <div class="input-group">
        {USER_ROLES.SUPER_ADMIN == role ? (
          <>
            <label htmlFor="company_filter" style={{margin:20, fontSize: 16, minWidth: 100 }}>Select Company: </label>
            <select
              name="company_filter"
              className="form-control11"
              style={{margin:20, fontSize: 16 }}
              onChange={(e) => CompanyFilterHandle(e)}
            >
              <option value="All">All</option>
              <CompanyDropdown />
            </select>

            <label htmlFor="induction_filter" style={{margin:20, fontSize: 16, minWidth: 100 }}>Select Induction: </label>
            <select
              name="induction_filter"
              onChange={(e) => InductionFilterHandle(e)}
              style={{margin:20, fontSize: 16, minWidth: 100 }}
            >
              <option value="All">All</option>
              <InductionsByCompany parentCompany={companyFilter} />
            </select>
          </>
        ) : null}

        {USER_ROLES.COMPANY === role ? (
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
