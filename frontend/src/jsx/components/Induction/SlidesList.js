import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import ActionDropDown from "../Students/ActionDropDown";
import { SLIDE_APIS } from "../API_URLs";

const SlidesList = ({ Slides, inductionID }) => {
  const navigate = useHistory();
  const token = "";

  // slide status
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
          SLIDE_APIS.CHANGE_STATUS.URL + id,
          {
            method: SLIDE_APIS.CHANGE_STATUS.METHOD,
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
            navigate.push(`/update-induction/${inductionID}`);
            // setIsUserStatusChanged(!isUserStatusChanged);
          });
        } else {
          return swal("Failed", response.message, "error");
        }
      } else {
        swal("Your status is not changed!");
      }
    });
  };


  const trackOnclick = (payload, data) => {
    // console.log(data, ' edit ------');
    return navigate.push(`../update-slide/${data._id}`);
  };

  const trackDeleteClick = () => {};

  useEffect(()=>{
    console.log("rendering slide listing ...")
  },[]);
  

  return (
    <table
      className="table display mb-4 dataTablesCard order-table card-table text-black application "
      id="application-tbl1_next"
    >
      
      <thead>
        <tr>
          <th>Sr. No.</th>
          <th>Slide Title</th>
          {/* <th>Slide Order</th> */}

          <th>Status</th>
          <th>Created On</th>
          <th Style="text-align: end">Action</th>
        </tr>
      </thead>
      <tbody>
        {Slides.map((row, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
              <div className="d-flex align-items-center">
                {/* <img src={loadImage(user.profile.profilePhoto)} alt="" /> */}
                <h4 className="mb-0 fs-16 font-w500">{row.slideTitle}</h4>
              </div>
            </td>
            {/* <td>{row.slideOrder}</td> */}
            <td>
              <Link
                className={`badge light ${
                  row.status ? "badge-success" : "badge-danger"
                }`}
                to={`/update-induction/${inductionID}`}
                onClick={() => changeSlideStatus(row._id, row.status)}
              >
                {row.status ? "Active" : "Inactive"}
              </Link>
            </td>

            <td>
              {new Date(row.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </td>

            <td Style="text-align: end">
              <ActionDropDown
                trackOnclick={trackOnclick}
                profileData={row}
                trackDeleteClick={trackDeleteClick}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SlidesList;
