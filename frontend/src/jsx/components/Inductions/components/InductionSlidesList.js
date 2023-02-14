import React, { useEffect, useState } from "react";
import { Tab, Nav, Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const USER_ROLES = {
  SUPER_ADMIN: "super_admin",
  COMPANY: "company",
  INSTRUCTOR: "instructor",
  USER: "user",
};
function InductionSlidesList({ setCurrentSlideContent, ...props }) {
  const inductionID = props.inductionID;
  const role = useSelector((state) => state.auth.auth.role);
  const handleClick = (slideData) => {
    setCurrentSlideContent(slideData);
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
        </div>
        
      ) : null}
      
      <div className="custome-accordion">
      <Accordion className="accordion" defaultActiveKey="0">
        <Accordion.Item className="card">
          <Accordion.Header as="h2" className="accordion-header border-0">
            <span className="acc-heading">Courses Slides</span>
            <span className="ms-auto">(1/2)</span>
          </Accordion.Header>
          <Accordion.Collapse id="collapseOne">
            <div className="accordion-body card-body pt-0">
              {props.slides.map((slide, i) => {
                return (
                  <div
                    className="acc-courses "
                    onClick={() => handleClick(slide)}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
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
                );
              })}
            </div>
          </Accordion.Collapse>
        </Accordion.Item>
      </Accordion>
    </div>
    </div>
  );
}
export default InductionSlidesList;