import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { getInduction } from "../APIs";
import PageTitle from "../../layouts/PageTitle";
import JoditEditor from "jodit-react";
import SlidesList from "./SlidesList";
import QuizList from "./QuizList";
import AddQuestion from "./Modals/AddQuestion";
import CompanyDropdown from "../Companies/CompanyDropdown";
import DepartmentByCompany from "../Department/DepartmentByCompany";
import swal from "sweetalert";
import { Link, useHistory } from "react-router-dom";
import { API_ROOT_URL } from "../../constants";
import LoadingSpinner from "../../pages/LoadingSpinner";

const USER_ROLES = {
  SUPER_ADMIN: "super_admin",
  COMPANY: "company",
  INSTRUCTOR: "instructor",
  USER: "user",
};

const UpdateInduction = () => {
  const navigate = useHistory();

  // get id from params {id}
  const { id } = useParams(); // this is induction id

  const editor = {};
  // redux store data
  const token = useSelector((state) => state.auth.auth.token);
  const userRole = useSelector((state) => state.auth.auth.role);

  // page states
  const [loading, setLoading] = useState(true);
  const [isShowAddQuestion, setIsShowAddQuestion] = useState(false);

  const [induction, setInduction] = useState();
  const [slides, setSlides] = useState();
  const [inductionStatus, setInductionStatus] = useState(false);

  // dropdowns
  const [parentCompany, setParentCompany] = useState();
  const [deptID, setDeptID] = useState();
  const [option, setOption] = useState();

  // inside async fuinction
  const callingAPI = async (inductionID, token) => {
    const response = await getInduction(inductionID, token);
    if ("status" in response && response.status == true) {
      setInduction(response.data);
      setParentCompany(response.data.parentCompany);
      setDeptID(response.data.deptID);
      setSlides(response.slides);
      setLoading(false);
    }
  };

  const handleFileChange = () => {
    // nature
  };

  const handleCompanyChange = async (e) => {
    // call api to fetch departments
    setParentCompany(e.target.value);
    const response = await fetch(
      `${API_ROOT_URL}/department/getDepartmentByComp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({ parentCompany: e.target.value }),
      }
    ).then((data) => data.json());

    if ("status" in response && response.status == true) {
      const rows = response.data.map((row, index) => (
        <option value={row._id}>{row.name}</option>
      ));
      setOption(rows);
    }
  };

  /**
   *
   * @param {*} e
   * Update Induction main submit function
   *
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateForm = {
      parentCompany: parentCompany,
      deptID: deptID,
      title: induction.title,
      subTitle: induction.subTitle,
      description: induction.description,
      thumbnail: induction.thumbnail,
      content: induction.content,
      passPercentage: induction.passPercentage,
      status: induction.status,
    };

    // call to API
    const response = await fetch(`${API_ROOT_URL}/induction/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify(updateForm),
    }).then((data) => data.json());

    if ("status" in response && response.status == true) {
      return swal("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        // return <Navigate to="/inductions" />;
        navigate.push("/inductions");
      });
    } else {
      return swal("Failed", response.message, "error");
    }
  };

  const changeSlideStatus = (id, status) => {
    swal({
      title: "Are you sure?",
      text: `Once status Changed, Slide will not show inside slide listing for Users`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willChange) => {
      if (willChange) {
        const response = await fetch(
          `${API_ROOT_URL}/slides/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": token,
            },
            body: JSON.stringify({ status: (status) ? false : true }),
          }
        ).then((data) => data.json());
        if ("status" in response && response.status == true) {
          swal("Poof! Your slide status has been updated!", {
            icon: "success",
          }).then(() => {
             setLoading(true);
            // navigate.push(`/update-induction/${inductionID}`);
          });
        } else {
          return swal("Failed", response.message, "error");
        }
      } else {
        swal("Your status is not changed!");
      }
    });
  };


  // Add question Modal POPUP
  const onClickHandler = () => {
    setIsShowAddQuestion(false);
    setLoading(true);
  };

  useEffect(() => {
    // get induction by id
    // i think we need to send this detail with props where we place edit button that time we will pass
    // for development , i am calling api this and later on will pass induction detail from edit button
    if (loading) {
      callingAPI(id, token);
    }

    console.log("rendering Update induction ");
  }, [loading, parentCompany, deptID]);

  const pageContent = loading ? (
    <LoadingSpinner />
  ) : (
    <>
      <PageTitle activeMenu="Update Induction" motherMenu="Induction" />

      <div className="col-xl-12 col-lg-12">
        <div className="card">
          <div className="card-body">
            <div className="basic-form">
              <div className="card-header">
                <h4 className="card-title">Update Induction</h4>
              </div>
              <form onSubmit={handleSubmit}>
                {USER_ROLES.SUPER_ADMIN === userRole ? (
                  <>
                    <div className="mb-3 row mt-3">
                      <label className="col-sm-3 col-form-label">
                        Parent Company
                      </label>
                      <div className="col-sm-9">
                        <select
                          name="parentCompany"
                          className="form-control"
                          onChange={(e) => {
                            handleCompanyChange(e);
                          }}
                          value={parentCompany}
                        >
                          <option value="">Select</option>
                          <CompanyDropdown prevSelected={parentCompany} />
                        </select>
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <label className="col-sm-3 col-form-label">
                        Department
                      </label>
                      <div className="col-sm-9">
                        <select
                          name="deptID"
                          className="form-control"
                          onChange={(e) => setDeptID(e.target.value)}
                          value={deptID}
                        >
                          <option>Select</option>
                          <DepartmentByCompany
                            parentCompany={parentCompany}
                            selectedDeptVal={deptID}
                          />
                        </select>
                      </div>
                    </div>
                  </>
                ) : null}

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">Title</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      onChange={(e) =>
                        setInduction({ ...induction, title: e.target.value })
                      }
                      value={induction.title}
                    />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">Sub Title</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="subTitle"
                      onChange={(e) =>
                        setInduction({ ...induction, subTitle: e.target.value })
                      }
                      value={induction.subTitle}
                    />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">Thumbnail</label>
                  <div className="col-sm-9">
                    <input
                      type="file"
                      className="form-control"
                      name="thumbnail"
                      onChange={handleFileChange}
                      accept="image/png,image/jpeg,image/jpg"
                    />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">
                    About Induction
                  </label>
                  <div className="col-sm-9">
                    <JoditEditor
                      name=""
                      ref={editor}
                      value={induction.description}
                      tabIndex={1} // tabIndex of textarea
                      onBlur={(newContent) =>
                        setInduction({ ...induction, description: newContent })
                      } // preferred to use only this option to update the content for performance reasons
                      onChange={(newContent) => {
                        setInduction({ ...induction, description: newContent });
                      }}
                    />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">
                    Pass Percentage
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      className="form-control"
                      name="passPercentage"
                      value={induction.passPercentage}
                      onChange={(e) =>
                        setInduction({
                          ...induction,
                          passPercentage: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div Style="text-align: end">
                  <button
                    name="update"
                    type="submit"
                    value="publish"
                    className="me-2 btn btn-success light"
                    onClick={(e) =>
                      setInduction({
                        ...induction,
                        status: true,
                      })
                    }
                  >
                    Update & Publish
                  </button>
                  <button
                    name="update"
                    type="submit"
                    value="draft"
                    className="me-2 btn btn-warning light"
                    onClick={(e) =>
                      setInduction({
                        ...induction,
                        status: false,
                      })
                    }
                  >
                    Save as Draft
                  </button>
                </div>
              </form>

              <div className="card-header">
                <h4 className="card-title"></h4>
              </div>

              <div className="card-header" id="slides">
                <h4 className="card-title">Slides</h4>

                <Link className="me-2 btn btn-info" to={`../add-slide/${id}`}>
                  <span className="btn-icon-start text-info">
                    <i className="fa fa-plus color-info"></i>
                  </span>
                  Add
                </Link>
                {/* <button type="button" className="me-2 btn btn-info">
                  <span className="btn-icon-start text-info">
                    <i className="fa fa-plus color-info"></i>
                  </span>
                  Add
                </button> */}

                {/* <button className="btn btn-danger">Add New Slide</button> */}
              </div>

              <SlidesList Slides={slides} inductionID={id} changeSlideStatus={changeSlideStatus}/>

              <div className="card-header">
                <h4 className="card-title">Quiz</h4>
                <button
                  type="button"
                  className="me-2 btn btn-info"
                  onClick={(e) => setIsShowAddQuestion(true)}
                >
                  <span className="btn-icon-start text-info">
                    <i className="fa fa-plus color-info"></i>
                  </span>
                  Add
                </button>
              </div>

              {/* Quiz list */}
              <QuizList inductionID={id} />

              {/* Add question popup */}
              <AddQuestion
                inductionID={id}
                isShowAddQuestion={isShowAddQuestion}
                onClickHandler={onClickHandler}
                isUpdate={false}
              />
            </div>

            {/* <div className="card-header">
              <h4 className="card-title">Action</h4>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );

  return <> {pageContent} </>;
};

export default UpdateInduction;
