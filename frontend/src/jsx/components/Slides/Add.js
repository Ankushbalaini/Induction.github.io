import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import PageTitle from "../../layouts/PageTitle";
import InductionDropdown from "./InductionDropdown";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router";
import { API_ROOT_URL } from "../../constants";
// api call
async function addSlide(formValues, token) {
  return fetch(`${API_ROOT_URL}/slides/`, {
    method: "POST",
    headers: {
      "x-access-token": token,
    },
    body: formValues,
  }).then((data) => data.json());
}

// Add Slide Component Start
const Add = () => {
  const { id } = useParams(); // this is induction id
  const navigate = useHistory();
  const token = useSelector((state) => state.auth.auth.token);
  const intialState = {
    slideInductionId: id,
    slideTitle: "",
    slideContent: "",
    order: "",
  };

  const [state, setState] = useState(intialState);
  const editor = useRef(null);

  //Validation messages
  let errorsObj = { slideTitle: "", slideContent: "" };
  const [errors, setErrors] = useState(errorsObj);

  // on click validation remove function
  function handleKeyPress(e) {
    var key = e.key;
    if (key == key) {
      setErrors(errorsObj == false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (state.slideTitle === "") {
      errorObj.slideTitle = "Title is Required!";
      error = true;
    }
    if (state.slideContent === "") {
      errorObj.slideContent = "Slide Content is Required!";
      error = true;
    }

    setErrors(errorObj);
    if (error) return;

    const formData = new FormData(e.target);
    const response = await addSlide(formData, token);

    if ("status" in response && response.status == true) {
      return swal("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        navigate.push(`/update-induction/${state.slideInductionId}`);
      });
    } else {
      return swal("Failed", response.message, "error");
    }
  };

  return (
    <>
      <PageTitle activeMenu="Add Slides" motherMenu="Slides" />

      <div className="col-xl-12 col-lg-12">
        <div className="card">
          <div className="card-body">
            <div className="basic-form">
              <form onSubmit={handleSubmit}>
                {/* <div className="card-header">
                  <h4 className="card-title">Induction Detail</h4>
                </div>

                <div className="card-body">
                  <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">
                      Parent Induction
                    </label>
                    <div className="col-sm-9">
                      <select
                        className="form-control"
                        name="inductionID"
                        value={state.inductionID}
                        disabled
                      >
                        <option>Select</option>
                        <InductionDropdown />
                      </select>
                    </div>
                  </div>
                </div> */}

                <input
                  type="hidden"
                  name="slideInductionId"
                  value={state.slideInductionId}
                />

                <div className="card-header">
                  <h4 className="card-title">Slide Detail</h4>
                </div>

                <div className="card-body">
                  <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">
                      Slide Title
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        onChange={(e) =>
                          setState({ ...state, slideTitle: e.target.value })
                        }
                        name="slideTitle"
                        value={state.slideTitle}
                        onKeyPress={(e) => handleKeyPress(e)}
                      />
                      {errors.slideTitle && (
                        <div Style="color:red;font-weight:400">
                          {errors.slideTitle}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">
                      Slide Content
                    </label>
                    <div className="col-sm-9">
                      <JoditEditor
                        name="slideContent"
                        rows={10}
                        ref={editor}
                        value={state.slideContent}
                        tabIndex={2}
                        onBlur={(newContent) =>
                          setState({ ...state, slideContent: newContent })
                        }
                        onChange={(newContent) =>
                          setState({ ...state, slideContent: newContent })
                        }
                        onKeyPress={(e) => handleKeyPress(e)}
                      />
                      {errors.slideContent && (
                        <div Style="color:red;font-weight:400">
                          {errors.slideContent}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div class="text-end toolbar toolbar-bottom p-2">
                  <Link
                    class="btn btn-danger sw-btn-next m-3"
                    to={`/update-induction/${id}`}
                  >
                    Cancel
                  </Link>

                  <button class="btn btn-success sw-btn-next" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Add;
