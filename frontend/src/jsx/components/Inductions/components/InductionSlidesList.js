import React, { useEffect, useState } from "react";
import { Tab, Nav, Accordion, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { TiTick } from "react-icons/ti";

const USER_ROLES = {
  SUPER_ADMIN: "super_admin",
  COMPANY: "company",
  INSTRUCTOR: "instructor",
  USER: "user",
};

const accordionBlog = [{ id: 1, title: "Courses Slides" }];

function InductionSlidesList({ setCurrentSlideContent, ...props }) {
  const inductionID = props.inductionID;
  const role = useSelector((state) => state.auth.auth.role);
  const [passMarksModel, setPassMarksModal] = useState(false);
  const [passingMarks, setPassingMarks] = useState("");
  const token = useSelector((state) => state.auth.auth.token);
  const [startButton, setStartButton] = useState(false);
  //stepper
  const steps = [];
  const [currentStep, setCurrentStep] = useState(1);
  const [totalVisted, setTotalVisted ] = useState(1);

  const [complete, setComplete] = useState(false);
  // const [steps, setSteps] = useState([]);
  const [active, setActive] = useState(0);

  const handleClick = (slideData, i ) => {
    const totalSlides = props.slides.length;

    // console.log(" clicked on slide no :"+ i ); // 
    // console.log(" current clicked slide no :"+ currentStep ); // active slide 
    // console.log(" total slide nos :"+ totalSlides ); // 10


    if(i <= currentStep){
      setActive(i+1);
      setCurrentStep(i+1);
      setCurrentSlideContent(slideData);
    }else{
      // sweet alerts
      console.log("do not skip inductions");
    }
    
    // console.log(currentStep);

    //currentStep === props.slides.length
    //   ? setComplete(true)
    //   : setCurrentStep((prev) => prev + 1);
  };

  return (
    <div className="custome-accordion">
      {USER_ROLES.COMPANY === role || USER_ROLES.INSTRUCTOR === role ? (
        <div>
          <div className="accordion accordion">
            {/* <div class="card accordion-item">
              <Link
                className="btn btn-primary"
                to={`../attemptquiz/${inductionID}`}
                activeClassName="active"
              >
                Attempted Quiz
              </Link>
            </div> */}
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

          <div className="accordion accordion">
            {/* <div class="card accordion-item">
              <Link
                className="btn btn-success"
                to={`../mcq/${inductionID}`}
                name=" Create Qioz"
              >
                Activity
              </Link>
            </div> */}
          </div>
        </div>
      ) : null}

      <div className="custome-accordion">
        <Accordion className="accordion" defaultActiveKey="0">
          {accordionBlog.map((data, i) => (
            <Accordion.Item className="card" key={i} eventKey={`${i}`}>
              <Accordion.Header as="h2" className="accordion-header border-0">
                <span className="acc-heading">{data.title}</span>
                {data.id === 1 ? (
                  <span className="ms-auto">
                    ({active + 1}/{props.slides.length})
                  </span>
                ) : null}
              </Accordion.Header>

              {data.id === 1 ? (
                <Accordion.Collapse eventKey={`${i}`} id="collapseOne">
                  <div className="accordion-body card-body pt-0">
                    {props.slides.map((slide, j) => {
                      return (
                        <div
                          key={j}
                          className={`acc-courses ${
                            currentStep === j + 1 ? "active" : ""
                          }`}
                          onClick={() => handleClick(slide, j)}
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                              <div class="d-flex justify-content-between align-items-center">
                                <span className="acc-icon">
                                  {j + 1 < currentStep || complete ? (
                                    <TiTick size={30} />
                                  ) : (
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M11.3337 6V4.66666C11.3337 2.79999 9.86699 1.33333 8.00033 1.33333C6.13366 1.33333 4.66699 2.79999 4.66699 4.66666V6C3.53366 6 2.66699 6.86666 2.66699 8V12.6667C2.66699 13.8 3.53366 14.6667 4.66699 14.6667H11.3337C12.467 14.6667 13.3337 13.8 13.3337 12.6667V8C13.3337 6.86666 12.467 6 11.3337 6ZM6.00033 4.66666C6.00033 3.53333 6.86699 2.66666 8.00033 2.66666C9.13366 2.66666 10.0003 3.53333 10.0003 4.66666V6H6.00033V4.66666ZM8.66699 11.3333C8.66699 11.7333 8.40033 12 8.00033 12C7.60033 12 7.33366 11.7333 7.33366 11.3333V9.33333C7.33366 8.93333 7.60033 8.66666 8.00033 8.66666C8.40033 8.66666 8.66699 8.93333 8.66699 9.33333V11.3333Z"
                                        fill="#374557"
                                      />
                                    </svg>
                                  )}
                                </span>
                                <h4 className="m-0">{slide.slideTitle}</h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    <div>
                      <div>
                        {steps?.map((step, i) => (
                          <div
                            key={i}
                            className={`step-item ${
                              currentStep === i + 1 && "active"
                            } ${
                              (i + 1 < currentStep || complete) && "complete"
                            } `}
                          >
                            <div className="step">
                              {i + 1 < currentStep || complete ? (
                                <TiTick size={40} />
                              ) : (
                                i + 1
                              )}
                            </div>
                            <p className="text-black-500">{step}</p>
                          </div>
                        ))}
                      </div>
                      {!complete && (
                        <Button
                          className="btn btn-group mb-3 mt-3"
                          style={{ display: "flex", float: "right" }}
                          onClick={() => {
                            currentStep === props.slides.length
                              ? setComplete(true)
                              : setCurrentStep((prev) => prev + 1);
                          }}
                        >
                          {currentStep === props.slides.length ? "Finish" : ">"}
                        </Button>
                      )}
                    </div>
                  </div>
                </Accordion.Collapse>
              ) : null}
            </Accordion.Item>
          ))}

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
                  {/* <Button className="btn btn-primary"> Start Test New</Button> */}
                </div>
              </div>
            </div>
          ) : null}
        </Accordion>
      </div>
    </div>
  );
}

export default InductionSlidesList;
