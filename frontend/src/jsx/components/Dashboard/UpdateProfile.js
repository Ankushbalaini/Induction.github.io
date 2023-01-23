import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown, Modal } from "react-bootstrap";

const UpdateProfile = ({isModalOpen, trackOnclick, profileData}) => {

    const [name, setName] = useState(profileData.name);
    const [email, setEmail] = useState(profileData.email);
    // const [aboutMe, setAboutMe] = useState(profileData.email);

    const handleCallback = () => {
      trackOnclick(false);
    }

    // On Form Submit
    const handleSubmit = (e) =>{
      e.preventDefault();
      console.log();
    }


    return (
        <Modal className="modal fade" show={isModalOpen}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Profile</h5>
            <Button
              variant=""
              type="button"
              className="btn-close"
              data-dismiss="modal"
              onClick={handleCallback}
            ></Button>
          </div>
          <div className="modal-body">
            <form
              className="update-form"
              onSubmit={(e) => handleSubmit}
            >
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group mb-3">
                    <label htmlFor="author" className="text-black font-w600">
                      {" "}
                      Name <span className="required">*</span>{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={name}
                      name="Author"
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group mb-3">
                    <label htmlFor="email" className="text-black font-w600">
                      {" "}
                      Email <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={email}
                      placeholder="Email"
                      name="Email"
                    />
                  </div>
                </div>

				
                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <label htmlFor="aboutMe" className="text-black font-w600">
                      About me
                    </label>
                    <textarea
                      rows={8}
                      className="form-control"
                      name="aboutMe"
                      placeholder=""
                      defaultValue={""}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <input
                      type="submit"
                      value="Update Profile"
                      className="submit btn btn-primary"
                      name="submit"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>

    )
}

export default UpdateProfile;
