import React, { useState }from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch } from 'react-redux';
import {
  loadingToggleAction,
  forgotAction,
} from "../../store/actions/AuthActions";
// image

import swal from 'sweetalert';
import BJSLogo from "../../images/BJSLogo.png";
import loginbg from "../../images/bg-1.jpg";

import { API_ROOT_URL } from "../constants";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState();

  let errorsObj = {  email: '' };
  const [errors, setErrors] = useState(errorsObj);
  const dispatch = useDispatch();
  
  function onForgot(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };

    if (email === "") {
        errorObj.email = 'Email is Required';
        error = true;
    }

    setErrors(errorObj);
    if (error) return;

    // dispatch(loadingToggleAction(true));
    // dispatch(forgotAction(email));
}

  const handleResetPasswordSubmit = async (e) => {

    e.preventDefault();

    let error = false;
    const errorObj = { ...errorsObj };

    if (email === "") {
        errorObj.email = 'Email is Required';
        error = true;
    }

    setErrors(errorObj);
    if (error) return;


    const response = await resetPassword({
      email,
    });
    
  
    if ("status" in response && response.status == true) {
      swal("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        window.location.href = "/login";
      });
    } else {
      swal("Failed", response.message, "error");
    }
  };

  async function resetPassword(email) {
    return fetch(`${API_ROOT_URL}/users/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    }).then((data) => data.json());

  }

  
	function handleKeyPress(e) {
		var key = e.key;
	   if (key == key) {
			setErrors((errorsObj == false))
		}
	}
  
  return (
    <div className="authincation h-100 p-meddle" style={{
			backgroundImage: "url(" + loginbg + ")",
			backgroundSize: "cover",
		  }}
      >
      
        <div className="container h-100">
          <div className="row h-100 align-items-center justify-contain-center">
          <div className="row justify-content-center h-100 align-items-center">
            <div className="col-md-6">
              <div className="authincation-content">
                <div className="row no-gutters">
                  <div className="col-xl-12">
                    <div className="auth-form">
                      <div className="text-center mb-3">
                          <img width="600" src={BJSLogo} alt="BJS" />
                      </div>
                      <h4 className="text-center mb-4 fs-26 font-w600 text-black text-center">Forgot Password</h4>
                      <form onSubmit={(e) => handleResetPasswordSubmit(e)}>
                        
                      <div className="form-group  mb-4">
                          <label className="">
                            <strong>Email</strong>
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            defaultValue=""
                            onChange={(e)=>setEmail(e.target.value)}
                            onKeyPress={(e) => handleKeyPress(e)}
                          />
                          {errors.email && (<div Style="color:red;font-weight:400">{errors.email}</div>)}
                        </div>

                        <div className="text-center  mb-4">
                          <button 
                          
                            type="submit"
                            className="btn btn-primary btn-block"
                          >
                            Submit
                          </button>
      
                        </div>
                        <div className="new-account mt-3">
											<p className="">
												 Go back to your {" "}
												<Link className="text-primary" to="/login">
													Login Section
												</Link>
											</p>
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
    
    </div>
  );
};

export default ForgotPassword;