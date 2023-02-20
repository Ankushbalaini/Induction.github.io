import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import { Last } from "react-bootstrap/esm/PageItem";
import { useHistory } from "react-router-dom";
const images = require.context("../../../../../images/profile", true);

const UpdateCompanyProfile = ({ isModalOpen, trackOnclick, companyData }) => {
  const navigate = useHistory();
  const token = useSelector((state) => state.auth.auth.token);
  //const userID = useSelector((state) => state.auth.auth.id);

  //const [isModalOpen, setIsModalOpen] = useState(isModalOpen);

  const [name, setName] = useState(companyData.profile.name);
  const [email, setEmail] = useState(companyData.profile.email);
  const [aboutCompany, setAboutCompany] = useState(companyData.profile.aboutCompany);
  const [address, setAddress] = useState(companyData.profile.address);
  const [image, setImage] = useState({ preview: '', data: '' });
  const [logo, setLogo] = useState(companyData.profile.logo);
  const [preview, setPreview] = useState(companyData.profile.logo);

  const [userID, setUserID] = useState(companyData.profile._id);
  
  const handleCallback = () => {
    trackOnclick(false);
  };

  const loadImage = (imageName) => {
    return images(`./${imageName}`);
  }

  const handleFileChange = async (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)
  }

  const handleSubmit = async (e) =>{

    e.preventDefault();
    // validate data
    if(name.trim() === '' || email.trim() === '' || address.trim() === '' || aboutCompany ==='') {
      return swal("Failed", "All fields are required!", "error");
      //return false;
    }

    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('logo', image.data);
    data.append('address', address);
    data.append('aboutCompany', aboutCompany);
    data.append('logo_previous', logo);

    
    // const userID = "63cea890edb762dfb4abb220";

    const response = await fetch(
      "http://localhost:8081/api/company/edit/" + userID,
      {
        method: "PUT",
        body: data,
      }
    ).then((data) => data.json());

    if ("status" in response && response.status == true) {
      return swal("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        handleCallback();
        //profile
        // navigate.push("/company-profile");
      });
      
    } else {
      return swal("Failed", response.message, "error");
    }
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
          <form className="update-form"
           onSubmit={handleSubmit}>


          <div className="row">
                <div className="col-lg-6">
                  <div className="form-group mb-3">
                    <label htmlFor="name" className="text-black font-w600">
                      {" "}
                      Company Name <span className="required">*</span>{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue=''
                      name="name"
                      placeholder=""
                      value={name}
                      onChange={(e)=>setName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group mb-3">
                    <label htmlFor="email" className="text-black font-w600">
                      {" "}
                      Email <span className="required">*</span>{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue=''
                      name="email"
                      placeholder=""
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                      readOnly
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <label htmlFor="image" className="text-black font-w600">
                      {" "}
                      Company Logo <span className="required">*</span>
                    </label>
                    <div className="instructors-media">



                    {/* <img src={ loadImage(preview) } Style="max-height:100px; max-width:100px; padding:10px; border-radius:10px"></img> */}


                    </div> 
                    <input type="hidden" value={preview} name="logo" />
                    <input
                      type="file"
                      className="form-control"
                      name="image"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <label htmlFor="last_name" className="text-black font-w600">
                      {" "}
                      About Company <span className="required">*</span>
                    </label>
                    
                     <textarea
                      rows={2}
                      className="form-control"
                      name="aboutCompany"
                      placeholder=""
                      defaultValue={""}
                      value={aboutCompany}
                      onChange={(e)=>setAboutCompany(e.target.value)}
                      />
                  </div>
                </div>


                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <label htmlFor="last_name" className="text-black font-w600">
                      {" "}
                      Address <span className="required">*</span>
                    </label>
                    
                     <textarea
                      rows={2}
                      className="form-control"
                      name="address"
                      placeholder=""
                      defaultValue={""}
                      value={address}
                      onChange={(e)=>setAddress(e.target.value)}
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
  );
};

export default UpdateCompanyProfile;
