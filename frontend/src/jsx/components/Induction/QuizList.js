import React, { useRef, Fragment, useEffect, useState } from "react";
import ActionDropDown from "../Inductions/ActionDropDown";
import swal from "sweetalert";
import UpdateMcq from "../Inductions/UpdateMcq";

const QuizList = ({ inductionID, updateQuesHandler }) => {
  const [questions, setQuestions] = useState();
  const [mcqData, setMcqData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const trackOnclick = (payload, pdata) => {
    if (pdata) {
      setMcqData(pdata);
    }
    setIsModalOpen(payload);
  };

  // callback function to opdate state
  const trackDeleteClick = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this record!",
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
    });
  };

  const handlepageLoad = async (e) => {
    const response = await fetch(
      "http://localhost:8081/api/mcq/" + inductionID,
      {
        method: "GET",
      }
    ).then((user) => user.json());

    if ("status" in response && response.status === true) {
      setQuestions(response.data);
      setLoading(false);
    } else {
      return swal("Failed", response.message, "error");
    }
  };

  useEffect(() => {
    handlepageLoad();
  }, [isModalOpen]);

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
                          <th Style="max-width: 20%">Sr. No</th>
                          <th Style="max-width: 20%">Questions</th>
                          <th Style="max-width: 20%">Answer</th>
                          {/* <th>Question Type</th> */}
                          {/* <th Style="max-width: 20%">Status</th> */}
                          <th Style="text-align: end">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {questions.map((row, index) => (
                          <tr key={index}>
                            <td> {index + 1} </td>
                            <td> {row.question} </td>
                            <td> {row.answer} </td>
                            {/* <td> {row.type} </td> */}
                            {/* <td>
                                  <Link
                                    to={''}
                                    className={`badge light ${
                                      row.status ? "badge-success" : "badge-danger"
                                    }`}
                                    onClick={() => changeStatus(row._id, row.status)}
                                  >
                                    {row.status ? "Active" : "Inactive"}
                                  </Link>
                                </td> */}
                            <td>
                              <ActionDropDown
                                trackOnclick={trackOnclick}
                                mcqData={row}
                                trackDeleteClick={trackDeleteClick}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalOpen ? (
        <UpdateMcq
          isModalOpen={isModalOpen}
          trackOnclick={trackOnclick}
          trackDeleteClick={trackDeleteClick}
          mcqData={mcqData}
        />
      ) : null}

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
