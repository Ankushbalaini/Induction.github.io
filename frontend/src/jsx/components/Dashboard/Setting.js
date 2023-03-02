import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import PageTitle from "../../layouts/PageTitle";
import swal from "sweetalert";
import { API_ROOT_URL } from "../../constants";

const Setting = (props) => {
  const userID = useSelector((state) => state.auth.auth._id);
  const token = useSelector((state) => state.auth.auth.token);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useHistory();

  const [loading, setLoading] = useState(true);
  
  let errorsObj = { currentPassword: '', newPassword: ''};
  const [errors, setErrors] = useState(errorsObj);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    let error = false;
    const errorObj = { ...errorsObj };

    if (currentPassword === '') {
        errorObj.currentPassword = 'Current Password is Required';
        error = true;
    }
    if (newPassword === '') {
        errorObj.newPassword = 'New Password is Required';
        error = true;
    }

    if (confirmPassword === '') {
        errorObj.confirmPassword = 'Confirm Password is Required';
        error = true;
    }

    if(newPassword !== confirmPassword){
      errorObj.confirmPassword = 'Confirm Password not matched!';
        error = true;
    }

    setErrors(errorObj);
    if (error) return;


    var data = new FormData(e.target);
    const response = await fetch(`${API_ROOT_URL}/users/setting`, {
        method: 'PUT',
        body: data,
        headers: {
          "x-access-token" : token
        },
      })
      .then((data) => data.json())

      if ("status" in response && response.status == true) {
        return swal("Success", response.message, "success", {
          buttons: false,
          timer: 2000,
        }).then((value) => {
            navigate.push("/profile");
        });

      }else{
        return swal("Failed", response.message , "error");
      }
      
    }

    
  useEffect(()=>{
    setLoading(false);

  },[props]);

    

  const pageContent = (loading) ? <h2>Loading</h2> :
    <>
      <PageTitle activeMenu="Setting" motherMenu="Dashbaord" />

        <div className="col-xl-12 col-lg-12">
        <div className="card">
            <div className="card-header">
            <h4 className="card-titlhandleSubmite">Change Password</h4>
            </div>
            <div className="card-body">
            <div className="basic-form">
            <form onSubmit={handleSubmit} >
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <label htmlFor="author" className="text-black font-w600">
                      {" "}
                      Current Password <span className="required">*</span>{" "}
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="currentPassword"
                      placeholder="Enter your current password"
                      value={currentPassword}
                      onChange={(e)=>setCurrentPassword(e.target.value)}
                    />

                    {errors.currentPassword && <div Style="color:red;font-weight:400">{errors.currentPassword}</div>}


                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <label htmlFor="last_name" className="text-black font-w600">
                      {" "}
                      New Password <span className="required">*</span>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="newPassword"
                      value={newPassword}
                      placeholder="Enter new password"
                      onChange={(e)=>setNewPassword(e.target.value)}

                    />

{errors.newPassword && <div Style="color:red;font-weight:400">{errors.newPassword}</div>}

                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <label htmlFor="last_name" className="text-black font-w600">
                      {" "}
                      Confirm New Password <span className="required">*</span>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="confirmPassword"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e)=>setConfirmPassword(e.target.value)}

                    />
                    {errors.confirmPassword && <div Style="color:red;font-weight:400">{errors.confirmPassword}</div>}

                  </div>
                </div>



                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <input
                      type="submit"
                      value="Update"
                      className="submit btn btn-primary"
                      name="submit"
                    />
                  </div>
                </div>
              </div>
            </form>
            </div>
          </div>
        </div>
        
      </div>
  </>;

  
  return (
    <>{pageContent}</>
    
  );

};
export default Setting;
