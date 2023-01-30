import React, { Fragment, useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import PageTitle from "../../layouts/PageTitle";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import { useParams } from "react-router";

const AddMcq = (props) => {
  const navigate = useHistory();
  const token = useSelector((state) => state.auth.auth.token);

  // inductionID
  const { inductionID } = useParams();

  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [answer, setAnswer] = useState("");

  // validation message
  let errorObj = {
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: ""
  };
  const [errors, setErrors] = useState(errorObj);

  const onCreate = async (e) => {
    e.preventDefault();
    
    let error = false;
    const errorObj1 = { ...errorObj }

    if (question === "") {
      errorObj1.question = "Question is required";
      error = true;
    }
    if (option1 === "") {
      errorObj1.option1 = "Option 1 is required";
      error = true;
    }
    if (option2 === "") {
      errorObj1.option2 = "Option 2 is required";
      error = true;
    }
    if (option3 === "") {
      errorObj1.option3 = "Option 3 is required";
      error = true;
    }
    if (option4 === "") {
      errorObj1.option4 = "Option 4 is required";
      error = true;
    }
    if (answer === "" ) {
      errorObj1.answer = "Answer is required";
      error = true;
    }
    setErrors(errorObj1);

    if (error) return ;
    
    // get Form data directly from form
    const data = new FormData(e.target);
    
    //api call
    const response = await fetch("http://localhost:8081/api/mcq/add", {
      method: "POST",
      headers: {
        "x-access-token": token,
      },
      body: data,
    }).then((user) => user.json());

    // checking api response
    if ("status" in response && response.status == true) {
      return swal("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        navigate.push("/single-induction-view/63d6bc15163abe901a4758e1");
      });
    } else {
      return swal("Failed", response.message, "error");
    }

  };

  useEffect(() => {}, [errors]);

  const formstyle = {
    float: "right",
  };

  return (
    <Fragment>
      <PageTitle activeMenu="Add MCQ's" motherMenu="Inductions" />

      <ol className="breadcrumb">
        <li className="breadcrumb-item active">
          <Link className="d-flex align-self-center" to={`../single-induction-view/${inductionID}`}>
            <svg
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.99981 12C8.99905 11.8684 9.02428 11.7379 9.07404 11.6161C9.12381 11.4942 9.19713 11.3834 9.28981 11.29L13.2898 7.28999C13.4781 7.10168 13.7335 6.9959 13.9998 6.9959C14.2661 6.9959 14.5215 7.10168 14.7098 7.28999C14.8981 7.47829 15.0039 7.73369 15.0039 7.99999C15.0039 8.26629 14.8981 8.52168 14.7098 8.70999L11.4098 12L14.6998 15.29C14.8636 15.4813 14.9492 15.7274 14.9395 15.979C14.9298 16.2307 14.8255 16.4695 14.6474 16.6475C14.4693 16.8256 14.2305 16.93 13.9789 16.9397C13.7272 16.9494 13.4811 16.8638 13.2898 16.7L9.28981 12.7C9.10507 12.5137 9.00092 12.2623 8.99981 12Z"
                fill="#374557"
              />
            </svg>
            Back
          </Link>
        </li>
      </ol>

      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Create a Quiz</h4>
            </div>

            <form onSubmit={(e) => onCreate(e)}>
              <div className="card-body">
                <div className="basic-form">
                  <h4 className="card-title m-auto">Enter Question</h4>
                  <input type="hidden" name="inductionID" value={inductionID} />

                  <div className="form-group ">
                    <textarea
                      className="form-control"
                      rows="3"
                      id="comment"
                      name="question"
                      placeholder="Enter question ...."
                      onChange={(e) => setQuestion(e.target.value)}
                    ></textarea>
                    {errors.question && (
                      <div Style="color:red;font-weight:600">
                        {errors.question}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="basic-form">
                  <div className="form-group ">
                    <h4 className="card-title mb-3">Enter your Choices</h4>
                    <div className="form-group mb-3">
                      <input
                        type="text"
                        name="option1"
                        className="form-control input-rounded"
                        placeholder="Option 1"
                        onChange={(e) => setOption1(e.target.value)}
                      />
                      {errors.option1 && (
                        <div Style="color:red;font-weight:600">
                          {errors.option1}
                        </div>
                      )}
                    </div>
                    <div className="form-group mb-3">
                      <input
                        type="text"
                        name="option2"
                        className="form-control input-rounded"
                        placeholder="Option 2"
                        onChange={(e) => setOption2(e.target.value)}
                      />
                      {errors.option2 && (
                        <div Style="color:red;font-weight:600">
                          {errors.option2}
                        </div>
                      )}
                    </div>
                    <div className="form-group mb-3">
                      <input
                        type="text"
                        name="option3"
                        className="form-control input-rounded"
                        placeholder="Option 3"
                        onChange={(e) => setOption3(e.target.value)}
                      />
                      {errors.option3 && (
                        <div Style="color:red;font-weight:600">
                          {errors.option3}
                        </div>
                      )}
                    </div>
                    <div className="form-group mb-3">
                      <input
                        type="text"
                        name="option4"
                        className="form-control input-rounded"
                        placeholder="Option 4"
                        onChange={(e) => setOption4(e.target.value)}
                      />
                      {errors.option4 && (
                        <div Style="color:red;font-weight:600">
                          {errors.option4}
                        </div>
                      )}
                    </div>
                    <div className="form-group mb-3">
                      <input
                        type="text"
                        name="answer"
                        className="form-control input-rounded"
                        placeholder="Correct Answer"
                        onChange={(e) => setAnswer(e.target.value)}
                      />
                      {errors.answer && (
                        <div Style="color:red;font-weight:600">
                          {errors.answer}
                        </div>
                      )}
                     
                    </div>
                  </div>
                  <Button
                    className="btn btn-success mb-3"
                    variant="primary"
                    size="lg"
                    style={formstyle}
                    type="submit"
                  >
                    Create
                  </Button>{" "}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default AddMcq;

// display: flex;
// flex-direction: column;
// align-items:
