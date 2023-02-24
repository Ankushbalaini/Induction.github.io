import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import ActionDropDown from "../Students/ActionDropDown";

const SlidesList = ({ Slides, inductionID }) => {
  const navigate = useHistory();

  const changeStatus = () => {};

  const trackOnclick = (payload, data) => {
    console.log(data, ' edit ------');
    return navigate.push(`../update-slide/${data._id}`);
  };

  const trackDeleteClick = () => {};

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

          {/* <th>Status</th> */}
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
            {/* <td>
              <Link
                className={`badge light ${
                  row.status ? "badge-success" : "badge-danger"
                }`}
                to={`/update-induction/${inductionID}`}
                onClick={() => changeStatus(row._id, row.status)}
              >
                {row.status ? "Active" : "Inactive"}
              </Link>
            </td> */}

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
