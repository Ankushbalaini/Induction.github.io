import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Dropdown, Modal } from "react-bootstrap";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

function UpdatePassPercentage(props) {

  const navigate = useHistory();
  const inductionID = props.inductionID;
  const role = useSelector((state) => state.auth.auth.role);
  const [passingMarks, setPassingMarks] = useState(props.passPercentage);
  const token = useSelector((state) => state.auth.auth.token);


  const hidePopUp = () => {
      props.hidePopUp();
  }

  // update induction passing marks api
  const updatePassMarks = async (e) =>{
    e.preventDefault();

    const response = await fetch("http://localhost:8081/api/induction/updatePassingMarks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token" : token,
      },
      body: JSON.stringify({ "inductionID" : inductionID, "passPercentage": passingMarks })
    }).then((data) => data.json());

    if ("status" in response && response.status == true) {
      return swal("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        hidePopUp();
        navigate.push("/single-induction-view/"+inductionID);
      });

    }else{
      
      return swal("Failed", response.message, "error");
    }
  }
  

  return (
    <Modal className="modal fade" show={props.show}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Pass Marks</h5>
            <Button
              variant=""
              type="button"
              className="btn-close"
              data-dismiss="modal"
              onClick={hidePopUp}
            ></Button>
          </div>
          <div className="modal-body">
                <form onSubmit={e => updatePassMarks(e) }>

                <div className="col-lg-6">
                  <div className="form-group mb-3">
                    <label htmlFor="question" className="text-black font-w600">
                      {" "}
                      Passing marks  <span className="required">*</span>{" "}
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue=''
                      name="passPercentage"
                      placeholder=""
                      value={passingMarks} 
                      onChange={(e)=>setPassingMarks(e.target.value)}
                    />
                  </div>
                </div>


                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <input
                      type="submit"
                      value="Update "
                      className="submit btn btn-primary"
                      name="Update"
                    />
                  </div>
                </div>


                </form>
          </div>
        </div>
      </Modal>
  );
  }
  export default UpdatePassPercentage;