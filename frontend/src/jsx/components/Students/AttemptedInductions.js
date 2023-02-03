import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import ActionDropDown from "./ActionDropDown";
import UpdateProfile from "./UpdateStudentModal";
import { useSelector } from "react-redux";

const images = require.context("../../../../../images/profile/", true);

const AttemptedInductions = () => {
  const token = useSelector((state) => state.auth.auth.token);
  const [data, setData] = useState(
    document.querySelectorAll("#student_wrapper tbody tr")
  );
  const sort = 5;
  const activePag = useRef(0);
  const [loading, setLoading] = useState(true);
  const [test, settest] = useState(0);
  const [inductions, setInductions] = useState(0);
  const [profileData, setProfileData] = useState({
    email: "",
    createdAt: "",
    profile: {
      first_name: "",
      last_name: "",
      profilePhoto: "dummy-user.png",
      aboutMe: "",
      address: "",
    },
  });

  // model popup usestate
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState({ preview: "", data: "" });
  const [address, setAddress] = useState();
  const [aboutStudent, setAboutStudent] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState();

  // Active data
  const chageData = (frist, sec) => {
    for (var i = 0; i < data.length; ++i) {
      if (i >= frist && i < sec) {
        data[i].classList.remove("d-none");
      } else {
        data[i].classList.add("d-none");
      }
    }
  };

  const loadImage = (imageName) => {
    return images(`./${imageName}`);
  };

  // callback function to opdate state
  const trackOnclick = (payload, pdata) => {
    if (pdata) {
      setProfileData(pdata);
      console.log(pdata);
    }
    setIsModalOpen(payload);
  };

  // callback function to opdate state
  const trackDeleteClick = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this record!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your record has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your record is safe!");
      }
    });
  };

  const handlepageLoad = async (event) => {
    const response = await fetch("http://localhost:8081/api/users/inductions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    }).then((data) => data.json());

    if ("status" in response && response.status == true) {
      setInductions(response.data);
      setLoading(false);
      setData(document.querySelectorAll("#student_wrapper tbody tr"));
    } else {
      return swal("Failed", response.message, "error");
    }
  };

  // use effect
  useEffect(() => {
    handlepageLoad();
    setData(document.querySelectorAll("#student_wrapper tbody tr"));
  }, [profileData, isModalOpen, inductions]);

  // Active pagginarion
  activePag.current === 0 && chageData(0, sort);
  // paggination
  let paggination = Array(Math.ceil(data.length / sort))
    .fill()
    .map((_, i) => i + 1);

  // Active paggination & chage data
  const onClick = (i) => {
    activePag.current = i;
    chageData(activePag.current * sort, (activePag.current + 1) * sort);
    settest(i);
  };

  //css for button
  const buttonStyle = {
    margin: "auto",
    display: "flex",
  };

  return (
    <>
      {loading ? (
        <h3>Loading</h3>
      ) : (
        <div className="row">
          <div className="col-xl-12">
            <div className="card students-list">
              <div className="card-header border-0 flex-wrap pb-0">
                <h4>Attempted Inductions</h4>
              </div>
              <div className="card-body py-0">
                <div className="table-responsive">
                  <div
                    id="student_wrapper"
                    className="dataTables_wrapper no-footer"
                  >
                    <table
                      className="table display mb-4 dataTablesCard order-table card-table text-black application "
                      id="application-tbl1_next"
                    >
                      <thead>
                        <tr>
                          <th>Induction Title</th>
                          <th>Wrong Answers</th>
                          <th>Correct Answers</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inductions.map((row, index) => (
                          <tr key={index}>
                            <td>
                              <div className="d-flex align-items-center">
                                <img
                                  src=""
                                  alt=""
                                />
                                <h4 className="mb-0 fs-16 font-w500">
                                  {row.inductionID}{" "}
                                </h4>
                              </div>
                            </td>
                            <td>{row.wrongAnswers}</td>
                            <td>
                              {row.correctAnswers}
                            </td>
                            <td>
                              {row.testStatus}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="d-sm-flex text-center justify-content-between align-items-center mt-3 mb-3">
                      <div className="dataTables_info">
                        Showing {activePag.current * sort + 1} to{" "}
                        {data.length > (activePag.current + 1) * sort
                          ? (activePag.current + 1) * sort
                          : data.length}{" "}
                        of {data.length} entries
                      </div>
                      <div
                        className="dataTables_paginate paging_simple_numbers mb-0"
                        id="application-tbl1_paginate"
                      >
                        <Link
                          className="paginate_button previous "
                          to="/attempted-inductions"
                          onClick={() =>
                            activePag.current > 0 &&
                            onClick(activePag.current - 1)
                          }
                        >
                          <i
                            className="fa fa-angle-double-left"
                            aria-hidden="true"
                          ></i>
                        </Link>
                        <span>
                          {paggination.map((number, i) => (
                            <Link
                              key={i}
                              to="/attempted-inductions"
                              className={`paginate_button  ${
                                activePag.current === i ? "current" : ""
                              } `}
                              onClick={() => onClick(i)}
                            >
                              {number}
                            </Link>
                          ))}
                        </span>

                        <Link
                          className="paginate_button next"
                          to="/attempted-inductions"
                          onClick={() =>
                            activePag.current + 1 < paggination.length &&
                            onClick(activePag.current + 1)
                          }
                        >
                          <i
                            className="fa fa-angle-double-right"
                            aria-hidden="true"
                          ></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default AttemptedInductions;