import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import pic3 from "./../../../images/courses/pic3.jpg";
import pic2 from "./../../../images/courses/pic2.jpg";
import pic4 from "./../../../images/courses/pic4.jpg";
import { useSelector } from "react-redux";

const inductionTableData = [
  {
    image: pic3,
    title: "Induction for Fullstack",
    status: "On Progress",
    changeClass: "badge-warning",
  },
  {
    image: pic2,
    title: "MERN Stack",
    status: "No Progress",
    changeClass: "badge-primary",
  },
  {
    image: pic4,
    title: "PHP / Laravel ",
    status: "No Progress",
    changeClass: "badge-success",
  },
];

const Inductions = () => {
  const [data, setData] = useState(
    document.querySelectorAll("#student_wrapper tbody tr")
  );
  const sort = 3;
  const activePag = useRef(0);
  const [test, settest] = useState(0);
  const [user, setUser] = useState([]);
  const [inductionData, setInductionData] = useState(0);
  const token = useSelector((state) => state.auth.auth.token);

  // Active data
  const chageData = (frist, sec) => {
    for (var i = 0; i < data.length; ++i) {
      if (i >= frist && i < sec) {
        data[i].classList.remove("d-none");
      } else {
        data[i].classList.add("d-none");
      }
    }
  };

  window.removeEventListener('visibilitychange', ()=>{});

  // api call
  async function getAllInductions() {
    //const id =  '63a5b994d187fa1a5a210934';
    return fetch("http://localhost:8081/api/induction/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token" : token,
      },
    }).then((data) => data.json());
  }

  // use effect
  useEffect(() => {
    window.removeEventListener('visibilitychange', ()=>{});
    
    const handleGetInduction = async (e) => {
      const response = await getAllInductions();
      if ("status" in response && response.status == true) {
        const items = response.data.map((item, index) => (
          // Only do this if items have no stable IDs
          <tr key={index}>
            <td>
              <div className="d-flex align-items-center">
                <h4 className="mb-0 fs-16 font-w500">{item.title}</h4>
              </div>
            </td>
            <td>{item.description}</td>
            <td>{item.dept_id}</td>
            <td>
              <span className={`badge ${(item.status)?`badge-success`:`badge-danger`}`}>{(item.status)?'Active':'Inactive'}</span>
            </td>
            <td>
              <Link to={`/single-induction-view/${item._id}`}>Preview </Link>

              {/* <Link to={`/single-induction-view/${item._id}`}>Single Preview </Link> */}
            </td>
          </tr>
        ));
        setInductionData(items);
      }
    };
    handleGetInduction();

    
    
    setData(document.querySelectorAll("#student_wrapper tbody tr"));
    //chackboxFun();
  }, []);

  // paggination
  let paggination = Array(Math.ceil(data.length / sort))
    .fill()
    .map((_, i) => i + 1);

  // Active paggination & chage data
  const onClick = (i) => {
    activePag.current = i;
    chageData(activePag.current * sort, (activePag.current + 1) * sort);
    settest(i);
  };

  return (
    <>
      <div className="row">
        <div className="col-xl-12">
          <div className="card students-list">
            <div className="card-header border-0 flex-wrap pb-0">
              <h4>Induction List</h4>
              <div className="input-group search-area w-auto">
                <span className="input-group-text">
                  <Link to={"#"}>
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
                  </Link>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search here..."
                />
              </div>
            </div>
            <div className="card-body py-0">
              <div className="table-responsive">
                <div
                  id="student_wrapper"
                  className="dataTables_wrapper no-footer"
                >
                  <table
                    className="table display mb-4 dataTablesCard order-table card-table text-black application "
                    id="application-tbl1_next"
                  >
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Department ID</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>{inductionData}</tbody>
                  </table>
                  <div className="d-sm-flex text-center justify-content-between align-items-center mt-3 mb-3">
                    <div className="dataTables_info">
                      Showing {activePag.current * sort + 1} to{" "}
                      {data.length > (activePag.current + 1) * sort
                        ? (activePag.current + 1) * sort
                        : data.length}{" "}
                      of {data.length} entries
                    </div>
                    <div
                      className="dataTables_paginate paging_simple_numbers mb-0"
                      id="application-tbl1_paginate"
                    >
                      <Link
                        className="paginate_button previous "
                        to="/inductions"
                        onClick={() =>
                          activePag.current > 0 &&
                          onClick(activePag.current - 1)
                        }
                      >
                        <i
                          className="fa fa-angle-double-left"
                          aria-hidden="true"
                        ></i>
                      </Link>
                      <span>
                        {paggination.map((number, i) => (
                          <Link
                            key={i}
                            to="/inductions"
                            className={`paginate_button  ${
                              activePag.current === i ? "current" : ""
                            } `}
                            onClick={() => onClick(i)}
                          >
                            {number}
                          </Link>
                        ))}
                      </span>

                      <Link
                        className="paginate_button next"
                        to="/inductions"
                        onClick={() =>
                          activePag.current + 1 < paggination.length &&
                          onClick(activePag.current + 1)
                        }
                      >
                        <i
                          className="fa fa-angle-double-right"
                          aria-hidden="true"
                        ></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Inductions;
