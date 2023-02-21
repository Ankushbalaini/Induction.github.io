import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import PageTitle from "../../layouts/PageTitle";
import InductionDropdown from "./InductionDropdown";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";


// api call
async function addSlide(formValues, token) {
  return fetch("http://localhost:8081/api/slides/", {
    method: "POST",
    headers: {
      "x-access-token": token,
    },
    body: formValues,
  }).then((data) => data.json());
}

// Add Slide Component Start
const Add = () => {
  const navigate = useHistory();
  const token = useSelector((state) => state.auth.auth.token);
  const intialState = {
    inductionID: "",
    slideTitle: "",
    slideContent: "",
    order: "",
  };

  const [state, setState] = useState(intialState);
  const editor = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const response = await addSlide(formData, token);

    if ("status" in response && response.status == true) {
      return swal("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        navigate.push("/inductions");
      });
    } else {
      return swal("Failed",  response.message , "error");
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
                <div className="card-header">
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
                        name="slideInductionId"
                        value={state.inductionID}
                        onChange={(e) =>
                          setState({ ...state, inductionID: e.target.value })
                        }
                      >
                        <option>Select</option>
                        <InductionDropdown />
                      </select>
                    </div>
                  </div>
                </div>

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
                      />
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
                      />
                    </div>
                  </div>
                </div>

                <div class="text-end toolbar toolbar-bottom p-2">
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