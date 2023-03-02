import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import PageTitle from "../../layouts/PageTitle";
import JoditEditor from "jodit-react";
import swal from "sweetalert";
import { Link, useHistory } from "react-router-dom";
import { API_ROOT_URL } from "../../constants";

const getSlideData = async (id, token) => {
  return await fetch(`${API_ROOT_URL}/slides/getbyslideid/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  }).then((data) => data.json());
};

// const updateSlide = async (id, token, data) => {
//   return await fetch("${API_ROOT_URL}/slides/getbyslideid/" + id, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       "x-access-token": token,
//     },
//   }).then((data) => data.json());
// };

const UpdateSlide = () => {
  const navigate = useHistory();
  const { id } = useParams(); // this is question id
  const editor = useRef(null);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.auth.token);
  const userRole = useSelector((state) => state.auth.auth.role);

  // intial states
  const intialState = {
    _id: "",
    slideInductionId: "",
    slideTitle: "",
    slideContent: "",
  };
  const [state, setState] = useState(intialState);

  // on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_ROOT_URL}/slides/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify(state),
    }).then((data) => data.json());

    if ("status" in response && response.status == true) {
      return swal("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        return navigate.push(`/update-induction/${state.slideInductionId}`);
      });
    } else {
      return swal("Failed", response.message, "error");
    }
  };

  // get slide data by id
  const callGetApi = async (id, token) => {
    const response = await getSlideData(id, token);
    if ("status" in response && response.status == true) {
      setState(response.data);
      setLoading(false);
    }
  };

  // hook
  useEffect(() => {
    if (loading) {
      callGetApi(id, token);
    }
  }, [loading, id]);

  return (
    <>
      {loading ? (
        <h3>Loading</h3>
      ) : (
        <>
          <PageTitle activeMenu="Update Slides" motherMenu="Slides" />

          <div className="col-xl-12 col-lg-12">
            <div className="card">
              <div className="card-body">
                <div className="basic-form">
                  <form onSubmit={handleSubmit}>
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
                      <Link
                        class="btn btn-danger sw-btn-next m-3"
                        to={`/update-induction/${state.slideInductionId}`}
                      >
                        Cancel
                      </Link>
                      <button class="btn btn-success sw-btn-next" type="submit">
                        Update Slide
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default UpdateSlide;
