import {
  formatError,
  login,
  runLogoutTimer,
  saveTokenInLocalStorage,
  signUp,
} from "../../services/AuthService";

export const SIGNUP_CONFIRMED_ACTION = "[signup action] confirmed signup";
export const SIGNUP_FAILED_ACTION = "[signup action] failed signup";
export const LOGIN_CONFIRMED_ACTION = "[login action] confirmed login";
export const LOGIN_FAILED_ACTION = "[login action] failed login";
export const LOADING_TOGGLE_ACTION = "[Loading action] toggle loading";
export const LOGOUT_ACTION = "[Logout action] logout action";

export function signupAction(firstName, lastName, email, password,role, history) {
  return (dispatch) => {
    signUp(firstName, lastName, email, password, role)
      .then((response) => {
        saveTokenInLocalStorage(response.data.data);
        // runLogoutTimer(
        //     dispatch,
        //     response.data.expiresIn * 1000,
        //     history,
        // );
        

        dispatch(confirmedSignupAction(response.data.data));
        history.push("/dashboard");
        // window.location.href = "/login";
      })
      .catch((error) => {
        const errorMessage = formatError(error);
        dispatch(signupFailedAction(errorMessage));
        history.push("/page-register");

      });
  };
}

export function logout(history) {
  localStorage.removeItem("userDetails");
  history.push("/login");
  return {
    type: LOGOUT_ACTION,
  };
}

export function loginAction(role, email, password, history) {
  return (dispatch) => {
    login(role, email, password)
      .then((response) => {
        
        saveTokenInLocalStorage(response.data.data);
        
        dispatch(loginConfirmedAction(response.data.data));
        
        // navigate to respective dashboard
        switch (response.data.data.role) {
          case "super_admin":
            history.push("/dashboard");
            break;
          case "company":
            history.push("/departments");
            break;
          case "instructor":
            history.push("/instructor-dashboard");
            break;
          default:
            history.push("/courses");
            break;
        }
        
      })
      .catch((error) => {
        const errorMessage = formatError(error);
        dispatch(loginFailedAction(errorMessage));
      });
  };
}

export function loginFailedAction(data) {
  return {
    type: LOGIN_FAILED_ACTION,
    payload: data,
  };
}

export function loginConfirmedAction(data) {
  return {
    type: LOGIN_CONFIRMED_ACTION,
    payload: data,
  };
}

export function confirmedSignupAction(payload) {
  return {
    type: SIGNUP_CONFIRMED_ACTION,
    payload,
  };
}

export function signupFailedAction(message) {
  return {
    type: SIGNUP_FAILED_ACTION,
    payload: message,
  };
}

export function loadingToggleAction(status) {
  return {
    type: LOADING_TOGGLE_ACTION,
    payload: status,
  };
}
