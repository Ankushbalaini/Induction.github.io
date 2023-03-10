import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import ActionDropDown from "../Induction/components/ActionDropDownSlides";
import { API_ROOT_URL } from "../../constants";

const SlidesList = ({ Slides, inductionID ,changeSlideStatus  }) => {
  const navigate = useHistory();
  const token = useSelector((state) => state.auth.auth.token);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // this is induction id   


  const trackOnclick = (payload, data) => {
    // console.log(data, ' edit ------');
    return navigate.push(`../update-slide/${data._id}`);
  };

  const trackDeleteClick = (data,status) => {
    changeSlideStatus(data._id, status);
  };

  // const changeSlideStatus = (id, status) => {
  //   swal({
  //     title: "Are you sure?",
  //     text: `Once status Changed, Slide will not show inside slide listing for Users`,
  //     icon: "warning",
  //     buttons: true,
  //     dangerMode: true,
  //   }).then(async (willChange) => {
  //     if (willChange) {
  //       const response = await fetch(
  //         `${API_ROOT_URL}/slides/${id}`,
  //         {
  //           method: "PUT",
  //           headers: {
  //             "Content-Type": "application/json",
  //             "x-access-token": token,
  //           },
  //           body: JSON.stringify({ status: (status) ? false : true }),
  //         }
  //       ).then((data) => data.json());
  //       if ("status" in response && response.status == true) {
  //         swal("Poof! Your slide status has been updated!", {
  //           icon: "success",
  //         }).then(() => {
  //            setLoading(true);
  //           // navigate.push(`/update-induction/${inductionID}`);
  //         });
  //       } else {
  //         return swal("Failed", response.message, "error");
  //       }
  //     } else {
  //       swal("Your status is not changed!");
  //     }
  //   });
  // };
  
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
              {/* to={`/update-induction/${inductionID}`} */}
              <Link
                className={`badge light ${
                  row.status ? "badge-success" : "badge-danger"
                }`}
                
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
                //trackDeleteClick={trackDeleteClick}
                changeSlideStatus={changeSlideStatus}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SlidesList;
