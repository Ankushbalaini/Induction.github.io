import React, { Fragment, useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import { API_ROOT_URL } from "../../../constants";

const AddQuestionAPI = async (token, data) => {
  return await fetch(`${API_ROOT_URL}/mcq/add`, {
    method: "POST",
    headers: {
      "x-access-token": token,
    },
    body: data,
  }).then((ques) => ques.json());
};

const UpdateQuestion = ({
  questionID,
  inductionID,
  isShowAddQuestion,
  onClickHandler,
}) => {
  const navigate = useHistory();
  const token = useSelector((state) => state.auth.auth.token);

  const intialState = {
    question_type: "",
    question: "",
    answer: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  };
  const [formState, setFormState] = useState(intialState);
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
    var errorObj1 = { ...errorObj };

    if (formState.question.trim() === "") {
      errorObj1.question = "Question is required!";
      error = true;
    }
    if (formState.option1.trim() === "") {
      errorObj1.option1 = "Option 1 is required";
      error = true;
    }
    if (formState.option2.trim() === "") {
      errorObj1.option2 = "Option 2 is required";
      error = true;
    }
    if (formState.option3.trim() === "") {
      errorObj1.option3 = "Option 3 is required";
      error = true;
    }
    if (formState.option4.trim() === "") {
      errorObj1.option4 = "Option 4 is required";
      error = true;
    }
    if (formState.answer.trim() === "") {
      errorObj1.answer = "Answer is required";
      error = true;
    } else {
      if (
        formState.answer.trim() !== formState.option1.trim() ||
        formState.answer.trim() !== formState.option2.trim() ||
        formState.answer.trim() !== formState.option3.trim() ||
        formState.answer.trim() !== formState.option4.trim()
      ) {
        // not matched
        errorObj1.answer =
          "Answer is not matched with any option! Please verify again!";
        error = true;
      }
    }

    setErrors(errorObj1);

    if (error) return;

    // get Form data directly from form
    const data = new FormData(e.target);
    //api call
    const response = await AddQuestionAPI(token, data);

    // checking api response
    if ("status" in response && response.status == true) {
      return swal("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        navigate.push("/viewmcq/");
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
    <Modal className="modal fade" show={isShowAddQuestion}>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Update Question!</h5>
          <Button
            type="button"
            className="btn-close"
            data-dismiss="modal"
            onClick={onClickHandler}
          ></Button>
        </div>
        <div className="modal-body">
          <form onSubmit={(e) => onCreate(e)}>
            <div className="card-body">
              <div className="basic-form">
                <h4 className="card-title m-auto">Enter Question</h4>
                <input type="hidden" name="inductionID" />

                <div className="form-group ">
                  <textarea
                    className="form-control"
                    rows="3"
                    id="comment"
                    name="question"
                    placeholder="Enter question ...."
                    onChange={(e) => {
                      setFormState({ ...formState, question: e.target.value });
                      if (e.target.value.trim() !== "") {
                        setErrors({ ...errors, question: "" });
                      }
                    }}
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
                      onChange={(e) => {
                        setFormState({ ...formState, option1: e.target.value });
                        if (e.target.value.trim() !== "") {
                          setErrors({ ...errors, option1: "" });
                        }
                      }}
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
                      onChange={(e) =>
                        setFormState({ ...formState, option2: e.target.value })
                      }
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
                      onChange={(e) =>
                        setFormState({ ...formState, option3: e.target.value })
                      }
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
                      onChange={(e) =>
                        setFormState({ ...formState, option4: e.target.value })
                      }
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
                      onChange={(e) =>
                        setFormState({ ...formState, answer: e.target.value })
                      }
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
                  size="sm"
                  style={formstyle}
                  type="submit"
                >
                  Update
                </Button>{" "}
              </div>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};
export default UpdateQuestion;
