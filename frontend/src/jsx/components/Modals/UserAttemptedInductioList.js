import React from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserAttemptedInductioList = ({
  isModalOpen,
  hidePopUp,
  userPopupData,
}) => {
  return (
    <Modal
      className="modal fade"
      show={isModalOpen}
      Style="width:80% !important"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title"> User Result </h5>
          <Button
            variant=""
            type="button"
            className="btn-close"
            data-dismiss="modal"
            onClick={hidePopUp}
          ></Button>
        </div>
        <div className="modal-body">
          <h4>
            User :{" "}
            {userPopupData.profile.first_name +
              " " +
              userPopupData.profile.last_name}{" "}
          </h4>
          <h4>Induction : {userPopupData.inductions.title} </h4>
          <h5>Attempts : {userPopupData.total} </h5>
          <br></br>

          <table
            className="table display mb-4 dataTablesCard order-table card-table text-black application "
            id="application-tbl1_next"
          >
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Correct Answers</th>
                <th>Wrong Answers</th>
                <th>Test Status</th>
                <th>Remark</th>
                <th Style="text-align: end">Test Date</th>
              </tr>
            </thead>
            <tbody>
              {userPopupData.result.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{row.correctAnswers}</td>
                  <td>{row.wrongAnswers}</td>
                  <td>
                    <Link
                      className={`badge light ${
                        row.testStatus === "Fail"
                          ? "badge-danger"
                          : "badge-success"
                      }`}
                      onClick={(e) => e.preventDefault()}
                    >
                      {row.testStatus}
                    </Link>
                  </td>
                  <td>{row.remark}</td>
                  <td>
                    {new Date(row.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
};

export default UserAttemptedInductioList;
