import React,{useState} from "react";
import { Link } from "react-router-dom";
import BJSLogo from "../../images/BJSLogo.png";
import loginbg from "../../images/bg-1.jpg";
import { connect, useDispatch } from 'react-redux';
import {
    loadingToggleAction,
    signupAction,
} from '../../store/actions/AuthActions';
// image
import logo from '../../images/homedelivery.svg';
import { Row } from "react-bootstrap";

function Register(props) {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] 	= useState('');
    const [email, setEmail] 		= useState('');
	const [password, setPassword] = useState('');
	const [role, setRole] = useState("user");
	
    let errorsObj = { firstName: '', lastName: '', email: '', password: '' };
    const [errors, setErrors] = useState(errorsObj);
    

    const dispatch = useDispatch();

    function onSignUp(e) {
        e.preventDefault();
        let error = false;
        const errorObj = { ...errorsObj };

		if (firstName === '') {
            errorObj.firstName = 'First Name is Required';
            error = true;
        }
		if (lastName === '') {
            errorObj.lastName = 'Last name is Required';
            error = true;
        }

        if (email === '') {
            errorObj.email = 'Email is Required';
            error = true;
        }
        if (password === '') {
            errorObj.password = 'Password is Required';
            error = true;
        }
		

        setErrors(errorObj);
        if (error) return;

        dispatch(loadingToggleAction(true));
        dispatch(signupAction(firstName, lastName, email, password, role, props.history));
		
    }
	
	return (
		<div className="authincation h-100 p-meddle" style={{
			backgroundImage: "url(" + loginbg + ")",
			backgroundSize: "cover",
		  }}>
			<div className="container h-100">
				<div className="row justify-content-center h-100 align-items-center">
					<div className="col-md-6">
						<div className="authincation-content">
							<div className="row no-gutters">
								<div className="col-xl-12">
									<div className="auth-form">
										<div className="text-center mb-3">
											<img width="600" src={BJSLogo} alt="BJS" />
										</div>
										<Row>
										<span className="text-center mb-4 fs-26 font-w600 text-black text-center ">Create an Account</span>
										</Row>
										
										{props.errorMessage && (
											<div className=''>
												{props.errorMessage}
											</div>
										)}
										{props.successMessage && (
											<div className=''>
												{props.successMessage}
											</div>
										)}
										<form onSubmit={onSignUp}>
											<div className="form-group mb-3">
												<label className="mb-1 ">
													<strong>First Name</strong>
												</label>
												<input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}  className="form-control"/>
												{errors.firstName && <div Style="color:red;font-weight:400">{errors.firstName}</div>}
											</div>
											

											<div className="form-group mb-3">
												<label className="mb-1 ">
													<strong>Last Name</strong>
												</label>
												<input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}  className="form-control" />
												{errors.lastName && <div Style="color:red;font-weight:400">{errors.lastName}</div>}
											</div>
											

											<div className="form-group mb-3">
												<label className="mb-1 ">
												  <strong>Email</strong>
												</label>
												<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
												{errors.email && <div Style="color:red;font-weight:400">{errors.email}</div>}
											</div>
											

											<div className="form-group mb-3">
												<label className="mb-1 ">
													<strong>Password</strong>
												</label>
												<input
												type="password"
													value={password}
													onChange={(e) =>
														setPassword(e.target.value)
													}
												  className="form-control"
												/>
												{errors.password && <div Style="color:red;font-weight:400">{errors.password}</div>}
											</div>
											
											<div className="text-center mt-4">
												<button type="submit" className="btn btn-primary btn-block">Register</button>
											</div>
										</form>
										<div className="new-account mt-3">
											<p className="">
												Already have an account?{" "}
												<Link className="text-primary" to="/login">
													Sign in
												</Link>
											</p>
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

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.errorMessage,
        successMessage: state.auth.successMessage,
        showLoading: state.auth.showLoading,
    };
};

export default connect(mapStateToProps)(Register);

