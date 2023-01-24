import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  loadingToggleAction,
  loginAction,
} from "../../store/actions/AuthActions";

//
import loginbg from "../../images/bg-1.jpg";
import logo from "../../images/log.png";
//import logofull from '../../images/logo-full.png';
import logofull from "../../images/homedelivery.svg";

function Login(props) {
  const [email, setEmail] = useState("super@admin.com");
  let errorsObj = { email: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);
  const [password, setPassword] = useState("admin");
  const [userType, setUserType] = useState("user");
  const dispatch = useDispatch();

  function onLogin(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (email === "") {
      errorObj.email = "Email is Required";
      error = true;
    }
    if (password === "") {
      errorObj.password = "Password is Required";
      error = true;
    }
    setErrors(errorObj);
    if (error) {
      return;
    }
    dispatch(loadingToggleAction(true));
    dispatch(loginAction(userType, email, password, props.history));
  }

  return (
    <div
      className="login-main-page"
      style={{
        backgroundImage: "url(" + loginbg + ")",
        backgroundSize: "cover",
      }}
    >
      <div className="login-wrapper">
        <div className="container h-100">
          <div className="row h-100 align-items-center justify-contain-center">
            <div className="col-xl-12 mt-3">
              <div className="card">
                <div className="card-body p-0">
                  <div className="row m-0">
                    <div className="col-xl-6 col-md-6 sign text-center">
                      <div>
                        <div className="text-center my-5">
                          <Link to="/dashboard">
                            <img width="200" src={logofull} alt="" />
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6 col-md-6">
                      <div className="sign-in-your">
                        <h4 className="fs-20 font-w800 text-black">
                          Sign in your account
                        </h4>
                        
                        <span>
                          Welcome back! Login with your data that you entered
                          <br /> during registration
                        </span>
                        <div className="login-social"></div>
                        {props.errorMessage && (
                          <div className="bg-red-300 text-red-900 border border-red-900 p-1 my-2">
                            {props.errorMessage}
                          </div>
                        )}
                        {props.successMessage && (
                          <div className="bg-green-300 text-green-900 border border-green-900 p-1 my-2">
                            {props.successMessage}
                          </div>
                        )}
                        <form onSubmit={onLogin}>
                          <div className="mb-3">
                            <label className="mb-1">
                              <strong>Select User Type</strong>
                            </label>

                            <select
                              onChange={(e) => setUserType(e.target.value)}
                              value={userType}
                              className="form-control">
                              <option value="super_admin">Super Admin</option>
                              <option value="company">Company</option>
                              <option value="instructor">Instructor</option>
                              <option value="user">User</option>
                            </select>
                            {errors.userType && (
                              <div className="text-danger fs-12">
                                {errors.userType}
                              </div>
                            )}
                          </div>

                          <div className="mb-3">
                            <label className="mb-1">
                              <strong>Email</strong>
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                            {errors.email && (
                              <div className="text-danger fs-12">
                                {errors.email}
                              </div>
                            )}
                          </div>
                          <div className="mb-3">
                            <label className="mb-1">
                              <strong>Password</strong>
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                            {errors.password && (
                              <div className="text-danger fs-12">
                                {errors.password}
                              </div>
                            )}
                          </div>
                          <div className="row d-flex justify-content-between mt-4 mb-2">
                            <div className="mb-3">
                              <div className="form-check custom-checkbox ms-1">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="basic_checkbox_1"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="basic_checkbox_1"
                                >
                                  Remember my preference
                                </label>
                              </div>
                            </div>
                            <div className="mb-3">
                              <Link to="./page-register" className="text-primary">Sign up</Link>
                              <br></br>
                              <Link to="./forgot-password" className="text-primary">
                                Forgot password
                              </Link>
                            </div>
                          </div>
                          <div className="text-center">
                            <button
                              type="submit"
                              className="btn btn-primary btn-block"
                            >
                              Sign Me In
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
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};
export default connect(mapStateToProps)(Login);
