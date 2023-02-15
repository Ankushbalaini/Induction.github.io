import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import ActionDropDown from "./ActionDropDown";
import UserPopup from "./UserPopup";

const images = require.context("../../../../../images/profile/", true);

function UsersTable({ filteredUsers , checkUserUpdated }) {
  const navigate = useHistory();
  const token = useSelector((state) => state.auth.auth.token);
  const role = useSelector((state) => state.auth.auth.role);
  const loggedInID = useSelector((state) => state.auth.auth.id);
  const parentCompany = useSelector((state) => state.auth.auth.parentCompany);

  // Edit User- Popup
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileData, setProfileData] = useState();

  const loadImage = (imageName) => {
    return images(`./${imageName}`);
  };

  const trackDeleteClick = () => {};

  // callback function to opdate state
  const trackOnclick = (payload, pdata) => {
    if (pdata) {
      setProfileData(pdata);
    }
    setIsModalOpen(payload);
    checkUserUpdated();
  };

  // change status
  const changeUserStatus = (userID, status) => {
    // user id
    swal({
      title: "Are you sure?",
      text: `Once status Changed, User will get or loss access to account`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willChange) => {
      if (willChange) {
        const response = await fetch(
          "http://localhost:8081/api/users/changeUserStatus",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": token,
            },
            body: JSON.stringify({ userID: userID, status: status }),
          }
        ).then((data) => data.json());

        if ("status" in response && response.status == true) {
          swal("Poof! Your record has been updated!", {
            icon: "success",
          }).then(() => {
            checkUserUpdated();
            navigate.push("/users");
          });
        } else {
          return swal("Failed", response.message, "error");
        }
      } else {
        swal("Your status is not changed!");
      }
    });
  };

  return (
    <>
      <table
        className="table display mb-4 dataTablesCard order-table card-table text-black application "
        id="application-tbl1_next"
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Join Date</th>
            <th>Status</th>
            <th Style="text-align: end">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index}>
              <td>
                <div className="d-flex align-items-center">
                  <img src={loadImage(user.profile.profilePhoto)} alt="" />
                  <h4 className="mb-0 fs-16 font-w500">
                    {user.profile?.first_name} {user.profile?.last_name}
                  </h4>
                </div>
              </td>
              <td>{user.email}</td>
              <td>
                {new Date(user.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </td>
              <td>
                <Link
                  className={`badge light ${
                    user.status ? "badge-success" : "badge-danger"
                  }`}
                  to="/users"
                  onClick={() => changeUserStatus(user._id, user.status)}
                >
                  {user.status ? "Active" : "Inactive"}
                </Link>
              </td>
              <td>
                <ActionDropDown
                  trackOnclick={trackOnclick}
                  profileData={user}
                  trackDeleteClick={trackDeleteClick}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen ? (
        <UserPopup
          isModalOpen={isModalOpen}
          trackOnclick={trackOnclick}
          profileData={profileData}
        />
      ) : null}
    </>
  );
}
export default UsersTable;
