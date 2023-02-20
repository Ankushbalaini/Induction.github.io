import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { getInduction } from "../APIs";
import PageTitle from "../../layouts/PageTitle";
import JoditEditor from "jodit-react";
import SlidesList from "./SlidesList";
import QuizList from "./QuizList";
import AddQuestion from "./Modals/AddQuestion";

const UpdateInduction = () => {
  // get id from params {id}
  const { id } = useParams(); // this is induction id

  const editor = {};
  // redux store data
  const token = useSelector((state) => state.auth.auth.token);

  // page states
  const [loading, setLoading] = useState(true);
  const [isShowAddQuestion, setIsShowAddQuestion] = useState(false);

  const [induction, setInduction] = useState();
  const [slides, setSlides] = useState();

  //   const intialValues = {
  //     title: induction.title,
  //     subTitle: induction.subTitle,
  //     description: induction.description,
  //   };

  // const [state, setState] = useState(intialValues);

  // inside async fuinction
  const callingAPI = async (inductionID, token) => {
    const response = await getInduction(inductionID, token);
    if ("status" in response && response.status == true) {
      setInduction(response.data);
      setSlides(response.slides);
      setLoading(false);
    }
  };

  const handleFileChange = () => {
    // nature
  };

  const handleSubmit = (e) => {
e.preventDefault();
  };

  useEffect(() => {
    // get induction by id
    // i think we need to send this detail with props where we place edit button that time we will pass
    // for development , i am calling api this and later on will pass induction detail from edit button
    if (loading) {
      callingAPI(id, token);
    }
  }, [loading]);

  // Add question Modal POPUP
  const onClickHandler = () => {
    setIsShowAddQuestion(false);
  };

  const pageContent = loading ? (
    <h1>Loading</h1>
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
                  <button type="button" className="me-2 btn btn-success light">
                    Update & Publish
                  </button>
                  <button type="button" className="me-2 btn btn-warning light">
                    Save as Draft
                  </button>
                </div>
              </form>

              <div className="card-header">
                <h4 className="card-title"></h4>
              </div>

              <div className="card-header">
                <h4 className="card-title">Slides</h4>
                <button type="button" className="me-2 btn btn-info">
                  <span className="btn-icon-start text-info">
                    <i className="fa fa-plus color-info"></i>
                  </span>
                  Add
                </button>

                {/* <button className="btn btn-danger">Add New Slide</button> */}
              </div>

              <SlidesList Slides={slides} inductionID={id} />

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
                isUpdate={true}
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
