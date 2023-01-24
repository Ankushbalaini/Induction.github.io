import React, { useState }from "react";
import { Link } from "react-router-dom";
// image
import logo from "../../images/homedelivery.svg";
import swal from 'sweetalert';

async function resetPassword(email) {
  return fetch("http://localhost:8081/api/users/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  }).then((data) => data.json());
}

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState();

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
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



  return (
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
                    <h4 className="text-center mb-4 ">Forgot Password</h4>
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
                        <br></br>
                        OR 
                        <br></br><br></br>
                        <h4><Link to="/login" className="text-primary">Login</Link></h4>
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
  );
};

export default ForgotPassword;
