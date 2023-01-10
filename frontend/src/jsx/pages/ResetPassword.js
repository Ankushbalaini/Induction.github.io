import React, {useState, useEffect} from "react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import swal from 'sweetalert';
import { useParams, Link } from 'react-router-dom';
import logo from "../../images/homedelivery.svg";




// api call
async function Api_CreatePassword(values) {
    return fetch('http://localhost:8081/api/users/create-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'token' : values.resetPasswordToken,
        'password' : values.newPassword
      })
    })
      .then(data => data.json())
}


function ResetPassword(){
    const [resetPasswordToken, setResetPasswordToken] = useState(0);
    const [newPassword, setNewPassword] = useState();

    const { token } = useParams();

    useEffect(()=>{
      setResetPasswordToken(token);
    },[]);
    
    const handleFormSubmit = async (e) =>{
        e.preventDefault();
        
        // setResetPasswordToken(token);

        const response = await Api_CreatePassword({ resetPasswordToken, newPassword });
      
        if ('status' in response && response.status == true) {
          swal("Success", response.message , "success", {
            buttons: false,
            timer: 2000,
          })
          .then((value) => {
            window.location.href = "/login";
          });
    
        } else {
          swal("Failed", response.message , "error");
        }
    }

    return (
        <>
            <div className="authincation h-100 p-meddle">
              <div className="container h-100">
                {" "}
                <div className="row justify-content-center h-100 align-items-center">
                  <div className="col-md-6">
                    <div className="authincation-content">
                      <div className="row no-gutters">
                        <div className="col-xl-12">
                          <div className="auth-form">
                            <div className="text-center mb-3">
                              <Link to="/dashboard">
                                <img src={logo} alt="" />
                              </Link>
                            </div>
                            <h4 className="text-center mb-4 ">Reset Password</h4>
                            <form onSubmit={handleFormSubmit} method="post">
                              <div className="form-group  mb-4">
                                <label className="">
                                  <strong>Enter New Password</strong>
                                </label>
                                <input
                                  type="password"
                                  className="form-control"
                                  defaultValue=""
                                  onChange={(e)=>setNewPassword(e.target.value)}
                                />
                              </div>
                              <div className="form-group  mb-4">
                                <label className="">
                                  <strong>Confirm Password</strong>
                                </label>
                                <input
                                  type="password"
                                  className="form-control"
                                  defaultValue=""
                                  onChange={(e)=>setNewPassword(e.target.value)}
                                  required
                                />
                              </div>

                              <div className="text-center  mb-4">
                                <button
                                  type="submit"
                                  className="btn btn-primary btn-block"
                                >
                                  SUBMIT
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            


        </>
        
    );
}

export default ResetPassword;
