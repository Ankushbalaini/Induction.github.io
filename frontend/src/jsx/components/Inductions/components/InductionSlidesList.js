import React, { useEffect, useState } from "react";

import { Tab, Nav, Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Dropdown, Modal } from "react-bootstrap";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

const USER_ROLES = {
  SUPER_ADMIN: "super_admin",
  COMPANY: "company",
  INSTRUCTOR: "instructor",
  USER: "user",
};

const accordionBlog = [
	{title: 'Courses Slides' },
	// {title: 'Audio' },
	// {title: 'Module' },
	{title: 'Quiz' },
];


function InductionSlidesList({ setCurrentSlideContent, ...props }) {
  const navigate = useHistory();
  const inductionID = props.inductionID;
  const role = useSelector((state) => state.auth.auth.role);
  const [passMarksModel, setPassMarksModal] = useState(false);
  const [passingMarks, setPassingMarks] = useState("");
  const token = useSelector((state) => state.auth.auth.token);

  const [active, setActive] = useState(0);

  const handleClick = (slideData, i) => {
    setCurrentSlideContent(slideData);
    setActive(i);
  };


  return (
    <div className="custome-accordion">
      {USER_ROLES.USER === role ? (
        <div>
          <div className="accordion accordion">
            <div class="card accordion-item">
              <Link
                className="btn btn-primary"
                to={`/start-test/${inductionID}`}
              >
                Start Test
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      {USER_ROLES.COMPANY === role || USER_ROLES.INSTRUCTOR === role ? (
        <div>
          <div className="accordion accordion">
            <div class="card accordion-item">
              <Link
                className="btn btn-primary"
                to={`../attemptquiz/${inductionID}`}
                activeClassName="active"
              >
                Attempted Quiz
              </Link>
            </div>
          </div>

          <div className="accordion accordion">
            <div class="card accordion-item">
              <Link
                className="btn btn-primary"
                to={`../viewmcq/${inductionID}`}
                activeClassName="active"
              >
                View Quiz
              </Link>
            </div>
          </div>

          <div className="accordion accordion">
            <div class="card accordion-item">
              <Link
                className="btn btn-primary"
                to={`../mcq/${inductionID}`}
                name=" Create Qioz"
              >
                Create Quiz
              </Link>
            </div>
          </div>

          {/* <div className="accordion accordion">
            <div class="card accordion-item">
              <Link
                className="btn btn-primary"
                to=''
                name="Set Passing Marks"
                onClick={showPassingMarksModel}
              >
                Set Passing percentage
              </Link>
            </div>
          </div> */}

          <div className="accordion accordion">
            <div class="card accordion-item">
              <Link
                className="btn btn-success"
                to={`../mcq/${inductionID}`}
                name=" Create Qioz"
              >
                Activity
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      <div className="custome-accordion">
        <Accordion className="accordion" defaultActiveKey="0">
        { accordionBlog.map((data,i)=>(
        
        <Accordion.Item className="card" key={i} eventKey={`${i}`}>
          {/* <Accordion.Item className="card"> */}
            <Accordion.Header as="h2" className="accordion-header border-0">
              <span className="acc-heading">Courses Slides</span>
              <span className="ms-auto">({active+1}/{ props.slides.length })</span>

             
            </Accordion.Header>
            
            {/* <Accordion.Collapse eventKey={`${active}`} id="collapseOne"> */}
            <Accordion.Collapse eventKey={`${i}`} id="collapseOne" >
              <div className="accordion-body card-body pt-0">
                {props.slides.map((slide, j) => {
                  
                  
                  // <div class="acc-courses active">
                  //   <div class="d-flex justify-content-between align-items-center">
                  //     <div class="d-flex align-items-center">
                  //       <span class="acc-icon">
                  //         <svg
                  //           width="16"
                  //           height="16"
                  //           viewBox="0 0 16 16"
                  //           fill="none"
                  //           xmlns="http://www.w3.org/2000/svg"
                  //         >
                  //           <path
                  //             d="M4 13C3.817 13 3.635 12.95 3.474 12.851C3.32918 12.7611 3.20965 12.6358 3.12671 12.4869C3.04378 12.338 3.00016 12.1704 3 12V4C3 3.653 3.18 3.331 3.474 3.149C3.61914 3.05976 3.7846 3.00891 3.95481 3.00121C4.12502 2.99351 4.29439 3.02923 4.447 3.105L12.447 7.105C12.6131 7.1882 12.7528 7.31599 12.8504 7.47405C12.948 7.63212 12.9997 7.81423 12.9997 8C12.9997 8.18578 12.948 8.36789 12.8504 8.52595C12.7528 8.68402 12.6131 8.8118 12.447 8.895L4.447 12.895C4.307 12.965 4.152 13 4 13Z"
                  //             fill="var(--primary)"
                  //           ></path>
                  //         </svg>
                  //       </span>
                  //       <h4 class="m-0">Introduction</h4>
                  //     </div>
                  //     <span>1:00</span>
                  //   </div>
                  // </div>;

                  return (
                    <div
                      key={j}
                      className={`acc-courses ${(j === active) ? 'active': ''}`}
                      onClick={() => handleClick(slide, j)}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div class="d-flex justify-content-between align-items-center">
                            <span className="acc-icon">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4 13C3.817 13 3.635 12.95 3.474 12.851C3.32918 12.7611 3.20965 12.6358 3.12671 12.4869C3.04378 12.338 3.00016 12.1704 3 12V4C3 3.653 3.18 3.331 3.474 3.149C3.61914 3.05976 3.7846 3.00891 3.95481 3.00121C4.12502 2.99351 4.29439 3.02923 4.447 3.105L12.447 7.105C12.6131 7.1882 12.7528 7.31599 12.8504 7.47405C12.948 7.63212 12.9997 7.81423 12.9997 8C12.9997 8.18578 12.948 8.36789 12.8504 8.52595C12.7528 8.68402 12.6131 8.8118 12.447 8.895L4.447 12.895C4.307 12.965 4.152 13 4 13Z"
                                  fill="var(--primary)"
                                />
                              </svg>
                            </span>
                            <h4 className="m-0">{slide.slideTitle}</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Accordion.Collapse>
          </Accordion.Item> 
          ))}

        </Accordion>
        {/* <Modal className="modal fade" show={passMarksModel}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Pass Marks</h5>
            <Button
              variant=""
              type="button"
              className="btn-close"
              data-dismiss="modal"
              // onClick={setPassMarksModal(false)}
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
      </Modal> */}
      </div>
    </div>
  );
}

export default InductionSlidesList;
