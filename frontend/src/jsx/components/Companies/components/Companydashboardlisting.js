import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import FiltersForAttempts from "../../Inductions/components/FilterForAttempts";

const USER_ROLES = {
  SUPER_ADMIN: "super_admin",
  COMPANY: "company",
  INSTRUCTOR: "instructor",
  USER: "user",
};

const Companydashboardlisting = () => {
  const token = useSelector((state) => state.auth.auth.token);
  const role = useSelector((state) => state.auth.auth.role);
  const loginUser = useSelector((state) => state.auth.auth.id);
  const parentCompany = useSelector((state) => state.auth.auth.parentCompany);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]); // main listing data
  const [companyFilter, setCompanyFilter] = useState();
  const [inductionFilter, setInductionFilter] = useState();

  const handlepageLoad = async (e) => {
    // query string

    var queryStr = "";

    queryStr = companyFilter
      ? `?company=${companyFilter}`
      : USER_ROLES.COMPANY === role
      ? `?company=${loginUser}`
      : USER_ROLES.INSTRUCTOR === role
      ? `?company=${parentCompany}`
      : "";
    queryStr += inductionFilter ? `&induction=${inductionFilter}` : "";

    const response = await fetch(
      "http://localhost:8081/api/induction/users" + queryStr,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      }
    ).then((data) => data.json());
    if ("status" in response && response.status == true) {
      setUsers(response.data);
      //   setUniqueTitle(response.data);
      setLoading(false);
    } else {
      return swal("Failed", response.message, "error");
    }
    console.log(users, "inductions-attempts in new........");
    // console.log(uniqueTitle, "unique title attemted")
  };

  // use effect
  useEffect(() => {
    handlepageLoad();
  }, [companyFilter, inductionFilter]);

  const InductionFilterHandle = (e) => {
    setInductionFilter(e.target.value);
  };

  const dataset1 = [];
  const dataset2 = [];

  const allTitles = users.map((i) => dataset1.push(i.inductions.title));
  //   const totalAttempts = users.map(i=>dataset2.push(i.total,i.inductions._id,i.inductions.title))

  const totalAttempts = users.reduce((acc, user) => {
    const { _id, title } = user.inductions;
    const index = acc.findIndex((entry) => entry._id === _id);
    if (index !== -1) {
      acc[index].total += user.total;
    } else {
      acc.push({ _id, title, total: user.total });
    }
    return acc;
  }, []);
  console.log(totalAttempts, "function call.......");

  console.log(totalAttempts, "totalAttempt");
  console.log(dataset2, "total dataset2");

  function removeDuplicates() {
    let unique = [];
    dataset1.forEach((element) => {
      if (!unique.includes(element)) {
        unique.push(element);
      }
    });
    return unique;
  }
  console.log(removeDuplicates(dataset1));

  const uniqueTitles = removeDuplicates(dataset1);

  return (
    <div>
       <div className="row">
      <div className="col-xl-12">
        <div className="card">
          <div className="card-header border-0 flex-wrap pb-0">
            <h2>Test Attempts</h2>
            <FiltersForAttempts
              InductionFilterHandle={InductionFilterHandle}
              inductionFilter={inductionFilter}
            />
          
          </div>

          <div className="card-body">
            <table
              className="table display mb-4 dataTablesCard order-table card-table text-black application "
              id="application-tbl1_next"
            >
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>Induction Title</th>
                  <th>Total Attempts</th>
                </tr>
              </thead>
              <tbody>
                {totalAttempts.map((user, index) => (
                  <tr key={user}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <h4 className="mb-0 fs-16 font-w500">{user.title}</h4>
                      </div>
                    </td>
                    <td>{user.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Companydashboardlisting;
