import React from "react";
import { useSelector } from "react-redux";
import CompanyDropdown from "../Companies/CompanyDropdown";
import DepartmentByCompany from "../Department/DepartmentByCompany";

function Filters({
  searchFilter,
  CompanyFilterHandle,
  DepartmentFilterHandle,
  companyFilter,
}) {
  const role = useSelector((state) => state.auth.auth.role);
  const loggedInID = useSelector((state) => state.auth.auth.id);
  const parentCompany = useSelector((state) => state.auth.auth.parentCompany);

  return (
    <>
      <div class="input-group search-area w-auto">
        <span class="input-group-text">
          <a href="/react/demo/instructor-students">
            <svg
              width="24"
              height="24"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M27.414 24.586L22.337 19.509C23.386 17.928 24 16.035 24 14C24 8.486 19.514 4 14 4C8.486 4 4 8.486 4 14C4 19.514 8.486 24 14 24C16.035 24 17.928 23.386 19.509 22.337L24.586 27.414C25.366 28.195 26.634 28.195 27.414 27.414C28.195 26.633 28.195 25.367 27.414 24.586ZM7 14C7 10.14 10.14 7 14 7C17.86 7 21 10.14 21 14C21 17.86 17.86 21 14 21C10.14 21 7 17.86 7 14Z"
                fill="var(--primary)"
              ></path>
            </svg>
          </a>
        </span>
        <input
          type="text"
          name="search"
          id="search"
          class="form-control"
          placeholder="Search here..."
          onChange={(e) => searchFilter(e)}
        />
      </div>

      <div class="input-group">
        {role === "super_admin" ? (
          <>
            <label for="company_filter" style={{margin:20, 
              fontSize: 16, 
              minWidth: 100 }}>
                Select Company: </label>
            <select
              name="company_filter"
              className="form-control11"
              style={{margin:20, fontSize: 16 }}
              onChange={(e) => CompanyFilterHandle(e)}
            >
              <option value="All">All</option>
              <CompanyDropdown />
            </select>

            <label for="dept_filter" style={{margin:20, fontSize: 16, minWidth: 100 }}>Select Department: </label>
            <select
              name="dept_filter"
              onChange={(e) => DepartmentFilterHandle(e)}
              style={{margin:20, fontSize: 16, minWidth: 100 }}
            >
              <option value="All">All</option>
              <DepartmentByCompany parentCompany={companyFilter} />
            </select>
          </>
        ) : null}

        {role === "company" ? (
          <div className="row">
            <div className="col-xl-6">
              <label for="dept_filter">Select Department: </label>
            </div>
            <div className="col-xl-6">
              <select
                className="form-control"
                name="dept_filter"
                onChange={(e) => DepartmentFilterHandle(e)}
              >
                <option value="All">All</option>

                <DepartmentByCompany parentCompany={loggedInID} />
              </select>
            </div>
          </div>
        ) : null}

        {role === "instructor" ? (
          <div className="row">
            <div className="col-xl-6">
              <label for="dept_filter">Select Department: </label>
            </div>
            <div className="col-xl-6">
              <select
                className="form-control"
                name="dept_filter"
                onChange={(e) => DepartmentFilterHandle(e)}
              >
                <option value="All">All</option>

                <DepartmentByCompany parentCompany={parentCompany} />
              </select>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
export default Filters;
