import React, { useRef, Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ActionDropDown from "./ActionDropDown";
import swal from "sweetalert";
import { useParams } from "react-router";
import PageTitle from "../../layouts/PageTitle";

import UpdateMcq from "./UpdateMcq";

import Table from './DataTable';

const ViewMcq = () => {
  const navigate = useHistory();
  const [test, settest] = useState(0);
  
  const [data, setData] = useState(
    document.querySelectorAll("#student_wrapper tbody tr")
  );

  const sort = 3;
  const activePag = useRef(0);

  const { id } = useParams();
  const [question, setQuestion] = useState();
  
  const [mcqData, setMcqData] = useState({
    question: "",
    option1:"",
    option2:"",
    option3:"",
    option4:"",
    answer:"",
    
  });

  const [tableData, setTableData] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editID, setEditID] = useState();

  //  // Active data
  //  const chageData = (frist, sec) => {
  //   for (var i = 0; i < data.length; ++i) {
  //     if (i >= frist && i < sec) {
  //       data[i].classList.remove("d-none");
  //     } else {
  //       data[i].classList.add("d-none");
  //     }
  //   }
  // };

 
    // callback function to update state
    const trackOnclick = (payload, userData) => {
     
      setIsModalOpen(payload);
      if (userData) {
        setMcqData(userData);
      } 
      
    };
    
 
  // callback function to opdate state
  const trackDeleteClick = () => {
    swal({
      title: "Are you sure?",
      text:
        "Once deleted, you will not be able to recover this record!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your record has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your record is safe!");
      }
    })
  }
  

  // api call
async function getMcq(formValues) {
  return fetch("http://localhost:8081/api/mcq/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formValues),
  }).then((data) => data.json());
}



  
  // on List mcq page first render
  const handlepageLoad = async (event) => {
    const response = await getMcq();
    if ("status" in response && response.status == true) {
      setTableData(response.data);
      setLoading(false);
    } else {
      return swal("Failed", "Error message", "error");
    }
  };

  useEffect(() => {
    // setLoading(false);
      handlepageLoad();
     setData(document.querySelectorAll("#student_wrapper tbody tr"));
  }, [loading,isModalOpen]);


  // console.log(tableData, "tabledata")
    const pageContent = (loading) ? <h1>loading</h1>: 
    <Fragment>
    <PageTitle activeMenu="View Quiz" motherMenu="Inductions" />

      <ol className="breadcrumb">
        <li className="breadcrumb-item active">
          <Link
            className="d-flex align-self-center"
            to={`/single-induction-view/${id}`}
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.99981 12C8.99905 11.8684 9.02428 11.7379 9.07404 11.6161C9.12381 11.4942 9.19713 11.3834 9.28981 11.29L13.2898 7.28999C13.4781 7.10168 13.7335 6.9959 13.9998 6.9959C14.2661 6.9959 14.5215 7.10168 14.7098 7.28999C14.8981 7.47829 15.0039 7.73369 15.0039 7.99999C15.0039 8.26629 14.8981 8.52168 14.7098 8.70999L11.4098 12L14.6998 15.29C14.8636 15.4813 14.9492 15.7274 14.9395 15.979C14.9298 16.2307 14.8255 16.4695 14.6474 16.6475C14.4693 16.8256 14.2305 16.93 13.9789 16.9397C13.7272 16.9494 13.4811 16.8638 13.2898 16.7L9.28981 12.7C9.10507 12.5137 9.00092 12.2623 8.99981 12Z"
                fill="#374557"
              />
            </svg>
            Back
          </Link>
        </li>
      </ol>
     
        <div className="row">
          <div className="col-xl-12">
            <div className="card students-list">
              <div className="card-header border-0 flex-wrap pb-0">
                <h2 className="mb-3">MCQ LIST</h2>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <div className="dataTables_wrapper ">

                  </div>
                  <Table data={tableData} trackOnclick={trackOnclick} trackDeleteClick={trackDeleteClick} />

                </div>
              </div>
            </div>
          </div>
        </div>
      
      <UpdateMcq
        isModalOpen={isModalOpen}
        trackOnclick={trackOnclick}
        trackDeleteClick={trackDeleteClick}
        mcqData={mcqData}

      />

    </Fragment>
    return (
      <div>{pageContent}</div>
    );
};

export default ViewMcq;

// const rows = response.data.map((row, index) => {
//   return (
//     <tr key={index}>
//       <td>{index + 1}</td>
//       <td>{row.question}</td>
//       <td>
      
//         <ActionDropDown trackOnclick={trackOnclick} mcqData={row} trackDeleteClick={trackDeleteClick}/>
//       </td>
      
//     </tr>
    
//   );
// });




// <table
//                       className="table display mb-4 dataTablesCard order-table card-table text-black application "
//                       id="student_wrapper"
//                     >
//                       <thead>
//                         <tr>
//                           <th>Sr. No</th>
//                           <th>Questions</th>
//                           <th style={{textAlign: "right"}}
//                           >Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody>{tableData}</tbody>

                     

//                     </table>







// <div className="d-sm-flex text-center justify-content-between align-items-center mt-3 mb-3">
// <div className="dataTables_info">
//   Showing {activePag.current * sort + 1} to{" "}
//   {data.length > (activePag.current + 1) * sort
//     ? (activePag.current + 1) * sort
//     : data.length}{" "}
//   of {data.length} entries
// </div>
// <div
//   className="dataTables_paginate paging_simple_numbers mb-0"
//   id="application-tbl1_paginate"
// >
//   <Link
//     className="paginate_button previous "
//     to="/viewmcq/${id}"
//     onClick={() =>
//       activePag.current > 0 &&
//       onClick(activePag.current - 1)
//     }
//   >
//     <i
//       className="fa fa-angle-double-left"
//       aria-hidden="true"
//     ></i>
//   </Link>
//   <span>
//     {paggination.map((number, i) => (
//       <Link
//         key={i}
//         to="/viewmcq/:id"
//         className={`paginate_button  ${
//           activePag.current === i ? "current" : ""
//         } `}
//         onClick={() => onClick(i)}
//       >
//         {number}
//       </Link>
//     ))}
//   </span>

//   <Link
//     className="paginate_button next"
//     to="/viewmcq/:id"
//     onClick={() =>
//       activePag.current + 1 < paggination.length &&
//       onClick(activePag.current + 1)
//     }
//   >
//     <i
//       className="fa fa-angle-double-right"
//       aria-hidden="true"
//     ></i>
//   </Link>


// </div>
// </div>
