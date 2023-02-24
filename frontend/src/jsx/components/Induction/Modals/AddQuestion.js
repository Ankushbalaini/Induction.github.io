import React, { Fragment, useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import swal from "sweetalert";

const AddQuestionAPI = async (token, data) => {
  return await fetch("http://localhost:8081/api/mcq/add", {
    method: "POST",
    headers: {
      "x-access-token": token,
    },
    body: data,
  }).then((ques) => ques.json());
};

const AddQuestion = ({
  isUpdate,
  inductionID,
  isShowAddQuestion,
  onClickHandler,
}) => {
  const navigate = useHistory();
  const token = useSelector((state) => state.auth.auth.token);
  const label = isUpdate ? "Update" : "Add";

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

  const onFormSubmit = async (e) => {
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
    }

    // if (
    //   formState.answer.trim() !== formState.option1.trim() ||
    //   formState.answer.trim() !== formState.option2.trim() ||
    //   formState.answer.trim() !== formState.option3.trim() ||
    //   formState.answer.trim() !== formState.option4.trim()
    // ) {
    //   errorObj1.answer =
    //     "Answer is not matched with any option! Please verify again! = "+ formState.answer.trim() + " " + formState.option1.trim()
    //   error = true;
    // }
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
        onClickHandler();
        navigate.push("/update-induction/" + inductionID);
      });
    } else {
      return swal("Failed", response.message, "error");
    }
  };

  useEffect(() => {
    setErrors(errorObj);
  }, [isShowAddQuestion]);


  return (
    <Modal className="modal fade" show={isShowAddQuestion}
    size="xl"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{label} Question !</h5>
          <Button
            variant=""
            type="button"
            className="btn-close"
            data-dismiss="modal"
            onClick={onClickHandler}
          ></Button>
        </div>
        <div className="modal-body">
          <form onSubmit={(e) => onFormSubmit(e)}>
            <div className="card-body">
              <div className="basic-form">
                <h4 className="mb-3">Enter Question</h4>
                <input type="hidden" name="inductionID" value={inductionID} />

                <div className="form-group ">
                  <textarea
                    className="form-control"
                    rows="3"
                    id="comment"
                    name="question"
                    placeholder="Enter question ...."
                    onChange={(e) => {
                      setFormState({ ...formState, question: e.target.value });
                    }}
                  >{formState.question}</textarea>
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
                  <h4 className="mb-3">Enter your Choices</h4>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      name="option1"
                      className="form-control input-rounded"
                      placeholder="Option 1"
                      onChange={(e) => {
                        setFormState({ ...formState, option1: e.target.value });
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
                  size="m"
                  style={{display:"flex",margin:"auto"}}
                  type="submit"
                >
                  {label}
                </Button>{" "}
              </div>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};
export default AddQuestion;
