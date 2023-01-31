import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import { Last } from "react-bootstrap/esm/PageItem";
import { useHistory } from "react-router-dom";


const UpdateMcq = ({isModalOpen, trackOnclick, mcqData}) => {
    const navigate = useHistory();

    const token = useSelector((state) => state.auth.auth.token);
    
    const [question, setQuestion] = useState(mcqData.question);
    const [option1, setOption1] = useState(mcqData.option1);
    const [option2, setOption2] = useState(mcqData.option2);
    const [option3, setOption3] = useState(mcqData.option3);
    const [option4, setOption4] = useState(mcqData.option4);
    const [answer, setAnswer] = useState(mcqData.answer);
    // const []


    const handleCallback = () => {
      trackOnclick(false);
    }

    


    return (
        <Modal className="modal fade" show={isModalOpen}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Mcq </h5>
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
              onSubmit={handleCallback}
              encType
            >
              <div className="row" >
                <div className="col-lg-12">
                  <div className="form-group mb-6">
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
                      disabled

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
                      disabled

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
                      disabled

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
                              disabled
        
                            />
                        </div>
                
                           
                           <div className="col-lg-12">
                             <div className="form-group mb-3">
                               <Button className="btn-primary" onClick={""}>
                                Update Quiz
                               </Button>
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
