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
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [option3, setOption3] = useState("");
    const [option4, setOption4] = useState("");
    const [answer, setAnswer] = useState("");


    const handleCallback = () => {
      trackOnclick(false);
    }

    


    return (
        <Modal className="modal fade" show={isModalOpen}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Profile</h5>
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
              onSubmit={handleSubmit}
              encType
            >
              <div className="row">
                <div className="col-lg-6">
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
                      value={firstName}
                      onChange={(e)=>setQuestion(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group mb-3">
                    <label htmlFor="last_name" className="text-black font-w600">
                      {" "}
                      Option1 <span className="required">*</span>
                    </label>
                    <inputLastName
                      type="text"
                      className="form-control"
                      name="last_name"
                      value={option1}
                      onChange={(e)=>setOption1(e.target.value)}

                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <label htmlFor="email" className="text-black font-w600">
                      {" "}
                      Profile Pic <span className="required">*</span>
                    </label>
                    <div className="instructors-media">
                    <img src={ loadImage(preview).default } Style="max-height:100px; max-width:100px; padding:10px; border-radius:10px"></img>
                    </div> 
                    <input type="hidden" value={preview} name="profilePhoto" />
                    <input
                      type="file"
                      className="form-control"
                      name="image"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>




                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <label htmlFor="email" className="text-black font-w600">
                      {" "}
                      Email <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                      disabled

                    />
                  </div>
                </div>

				
                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <label htmlFor="aboutMe" className="text-black font-w600">
                      About me
                    </label>
                    <textarea
                      rows={3}
                      className="form-control"
                      name="aboutMe"
                      placeholder=""
                      defaultValue={""}
                      value={aboutMe}
                      onChange={(e)=>setAboutMe(e.target.value)}

                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <input
                      type="submit"
                      value="Update Profile"
                      className="submit btn btn-primary"
                      name="submit"
                    />
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
