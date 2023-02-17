import React, { useRef, Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ActionDropDown from "../Inductions/ActionDropDown";
import swal from "sweetalert";
import { useParams } from "react-router";
// import UpdateMcq from "./UpdateMcq";

const QuizList = ({ inductionID }) => {
  const navigate = useHistory();

  // const { id } = useParams();
  const [question, setQuestion] = useState();
  const [mcqData, setMcqData] = useState({});
  const [tableData, setTableData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editID, setEditID] = useState();


  const trackOnclick = (payload, pdata) => {
    if (pdata) {
      setMcqData(pdata);
      //console.log(pdata);

    }
    setIsModalOpen(payload);
  }
 
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
  const changeStatus = () =>{}
  
  const actionHandler = (mcq) => {
    setIsModalOpen(true);
    //setModalData(mcq);
    setQuestion(mcq.question);
    //setEditID(mcq.inductionID);
  };

  const handlepageLoad = async (e) => {
    const response = await fetch("http://localhost:8081/api/mcq/" + inductionID, {
      method: "GET",
    }).then((user) => user.json());

    if ("status" in response && response.status === true) {
      const rows = response.data.map((row, index) => {
        return (
          <tr key={index}>
            <td> {index + 1} </td>
            <td> {row.question} </td>
            <td> {row.answer} </td>
            <td> {row.type} </td>
            <td> 
                <Link
                  className={`badge light ${
                    row.status ? "badge-success" : "badge-danger"
                  }`}
                  onClick={() => changeStatus(row._id, row.status)}
                >
                  {row.status ? "Active" : "Inactive"}
                </Link>
            </td>
            <td>
              <ActionDropDown trackOnclick={trackOnclick} mcqData={row} trackDeleteClick={trackDeleteClick}/>
            </td>
          </tr>
        );
      });

      setTableData(rows);
      setLoading(false);
    } else {
      return swal("Failed", response.message, "error");
    }
  };

  useEffect(() => {
    if (loading) {
      handlepageLoad();
    }
  }, [mcqData]);

  return (
    <>
      
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div className="row">
          <div className="col-xl-12">
            <div className="card students-list">
              
              <div className="card-body py-0">
                <div className="table-responsive">
                  <div className="dataTables_wrapper no-footer">
                    <table
                      className="table display mb-4 dataTablesCard order-table card-table text-black application "
                      id="application-tbl1_next"
                    >
                      <thead>
                        <tr>
                          <th>Sr. No</th>
                          <th>Questions</th>
                          <th>Answer</th>
                          <th>Question Type</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>{tableData}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <UpdateMcq
        isModalOpen={isModalOpen}
        trackOnclick={trackOnclick}
        trackDeleteClick={trackDeleteClick}
        mcqData={mcqData}
      /> */}
    </>
  );
};

export default QuizList;
