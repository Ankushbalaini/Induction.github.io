import React, { useRef, Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import PageTitle from "../../layouts/PageTitle";
import { useSelector } from "react-redux";
//import ActionDropDown from "./ActionDropDown";
import swal from "sweetalert";
import DropDownBlog from "../Dashboard/DropDownBlog";
import ActionDropDown from "../Dashboard/ActionDropDown";
import { useParams } from "react-router";

const ViewMcq = () => {

  const navigate = useHistory();

  const {id} = useParams();
  const [question, setQuestion] = useState();
  const [mcqData, setMcqData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editID, setEditID] = useState();

  const actionHandler = (mcq) => {
    setIsModalOpen(true);
    //setModalData(mcq);
    setQuestion(mcq.question);
    //setEditID(mcq.inductionID);

  }
  
  const handlepageLoad = async (e) => {
    const response = await fetch("http://localhost:8081/api/mcq/"+id, {
      method: "GET"
    }).then((user) => user.json());

    

    if ("status" in response && response.status === true) {
      const rows = response.data.map((row, index) => {
        return <tr key={index}>
                    <td> {index+1} </td>
                    <td> {row.question} </td>
                    <td></td>
                </tr>
      });
      
      setMcqData(rows);
      setLoading(false);

    } else {
      return swal("Failed", response.message, "error");
    }
  };

  useEffect(() => {
    if(loading) {
      handlepageLoad();
    }
    
  }, [mcqData]);



  return (
    <>
    { (loading) ? <h1>Loading</h1> : 
      <div className="row">
        <div className="col-xl-12">
          <div className="card students-list">
            <div className="card-header border-0 flex-wrap pb-0">
              <h4>Mcq List</h4>
            </div>
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
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mcqData}
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div> 
                    }
                    </>
    
  );
};

export default ViewMcq;
