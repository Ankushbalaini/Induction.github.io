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
  const [answer, setAnswer] = useState();

  // validation message
  let errorObj = {
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
  };
  const [errors, setErrors] = useState(errorObj);

  const onCreate = async (e) => {
    e.preventDefault();
    
    let error = false;
    const errorObj1 = { ...errorObj }

    if (question === "") {
      errorObj1.question = "question is required";
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
    if (answer === "") {
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
                    className="btn btn-success"
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
