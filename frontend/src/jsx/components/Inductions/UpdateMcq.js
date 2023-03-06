import React, { useEffect, useState } from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import {API_ROOT_URL} from "../../constants";

const UpdateMcq = ({isModalOpen, trackOnclick, mcqData}) => {
    console.log(mcqData,"mcqData...");
    const navigate = useHistory();
    const id = useSelector((state) => state.auth.auth.id);
    const token = useSelector((state) => state.auth.auth.token);
    const [question, setQuestion] = useState(mcqData.question);
    const [option1, setOption1] = useState(mcqData.option1);
    const [option2, setOption2] = useState(mcqData.option2);
    const [option3, setOption3] = useState(mcqData.option3);
    const [option4, setOption4] = useState(mcqData.option4);
    const [answer, setAnswer] = useState(mcqData.answer);
   const [userID, setUserID] = useState(mcqData._id);
    //console.log(mcqData,"mcqData...userid")
    const handleCallback = () => {
      trackOnclick(false);
    }
  useEffect(()=>{
    setQuestion(mcqData.question)
    setOption1(mcqData.option1)
    setOption2(mcqData.option2)
    setOption3(mcqData.option3)
    setOption4(mcqData.option4)
    setAnswer(mcqData.answer)
  },[isModalOpen])
    // const []
    //console.log(mcqData, "mcq data")
    const handleSubmit = async (e) =>{
      e.preventDefault();
      // validate data
      // if(question.trim() === '' || answer.trim() ==='') {
      //   return swal("Failed", "All fields are required!", "error");
      //   //return false;
      // }
    const data = new FormData();
    data.append('question', question);
    data.append('option1', option1);
    data.append('option2', option2);
    data.append('option3', option3);
    data.append('option4', option4);
    data.append('answer', answer);
    const response = await fetch(
      `${API_ROOT_URL}/mcq/edit/${userID}`,
      {
        method: "PUT",
        body: data,
        headers: {
          "x-access-token": token,
        },
      }
    ).then((data) => data.json());
    if ("status" in response && response.status == true) {
      return swal("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        handleCallback();
        //profile
        //navigate.push("/viewmcq");
      });
    } else {
      return swal("Failed", response.message, "error");
    }
    }
    return (
        <Modal className="modal fade" show={isModalOpen}
        size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
        
        >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update MCQ</h5>
            <Button
              variant=""
              type="button"
              className="btn-close"
              data-dismiss="modal"
              onClick={handleCallback}
            ></Button>
          </div>
          <div className="modal-body">
           <form
              className="update-form"
              onSubmit={handleSubmit}>
              <div className="row" >
                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <label htmlFor="question" className="text-black font-w600">
                      {" "}
                      Question  <span className="required">*</span>{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue=''
                      name="question"
                      placeholder=""
                      value={question}
                      onChange={(e)=>setQuestion(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="form-group mb-3">
                    <label htmlFor="option1" className="text-black font-w600">
                      {" "}
                      Option 1 <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="option1"
                      value={option1}
                      onChange={(e)=>setOption1(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <label htmlFor="option2" className="text-black font-w600">
                      {" "}
                      Option 2 <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="option2"
                      value={option2}
                      onChange={(e)=>setOption2(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <label htmlFor="option3" className="text-black font-w600">
                      {" "}
                      Option 3 <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="option3"
                      value={option3}
                      onChange={(e)=>setOption3(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <label htmlFor="option4" className="text-black font-w600">
                      {" "}
                      Option 4 <span className="required"></span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="option4"
                      value={option4}
                      onChange={(e)=>setOption4(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                   <div className="form-group mb-3">
                     <label htmlFor="answer" className="text-black font-w600">
                       {" "}
                       Correct Answer <span className="required">*</span>
                     </label>
                     <input
                       type="text"
                       className="form-control"
                       name="answer"
                       value={answer}
                       onChange={(e)=>setAnswer(e.target.value)}
                     />
                 </div>
                    <div className="col-lg-12">
                      <div className="form-group mb-3 d-flex justify-content-center">
                        <input
                        type="submit"
                        value="Update MCQ"
                        className="submit btn btn-primary"
                        name="submit"
                        />
                      </div>
                    </div>
                </div>
             </div>
            </form>
          </div>
        </div>
      </Modal>
    )
}
export default UpdateMcq;