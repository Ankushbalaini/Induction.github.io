import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import { Last } from "react-bootstrap/esm/PageItem";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";

// api call 









const UpdateMcq = ({ isModalOpen, trackOnclick, mcqData }) => {
  //console.log(mcqData, "mcqData...");

  const navigate = useHistory();
  const token = useSelector((state) => state.auth.auth.token);
  const [formState, setFormState] = useState(mcqData);

  useEffect(() => {

    setFormState(mcqData);

  }, [mcqData]);

  // const []
  // close POPUP
  const handleCallback = () => {
    trackOnclick(false);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    //"63f33ce82e06c5b033753a9c"
    const response = await fetch(
      "http://localhost:8081/api/mcq/" + formState._id,
      {
        method: "PUT",
        headers: {
          "x-access-token": token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formState),
      }
    ).then((data) => data.json());

    if ("status" in response && response.status == true) {
      return swal("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        handleCallback();
        //profile
        //navigate.push("/update-induction/63ef91f59c145e113579da4b");
      });
    } else {
      return swal("Failed", response.message, "error");
    }


  };

  return (
    <Modal className="modal fade" show={isModalOpen}>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Update Question </h5>
          <Button
            variant=""
            type="button"
            className="btn-close"
            data-dismiss="modal"
            onClick={handleCallback}
          ></Button>
        </div>
        <div className="modal-body">
          <form className="update-form" onSubmit={handleUpdateSubmit}>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group mb-6">
                  <label htmlFor="question" className="text-black font-w600">
                    {" "}
                    Question <span className="required">*</span>{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="question"
                    value={formState.question}
                    onChange={(e) =>
                      setFormState({ ...formState, question: e.target.value })
                    }
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
                    value={formState.option1}
                    onChange={(e) =>
                      setFormState({ ...formState, option1: e.target.value })
                    }
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
                    value={formState.option2}
                    onChange={(e) =>
                      setFormState({ ...formState, option2: e.target.value })
                    }
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
                    value={formState.option3}
                    onChange={(e) =>
                      setFormState({ ...formState, option3: e.target.value })
                    }
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
                    value={formState.option4}
                    onChange={(e) =>
                      setFormState({ ...formState, option4: e.target.value })
                    }
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
                    value={formState.answer}
                    onChange={(e) =>
                      setFormState({ ...formState, answer: e.target.value })
                    }
                  />
                </div>

                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <Button className="btn-primary" type="submit">
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
  );
};

export default UpdateMcq;
