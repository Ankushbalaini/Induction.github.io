import axios from 'axios';
import swal from "sweetalert";
import {
    loginConfirmedAction,
    logout,
} from '../store/actions/AuthActions';
import { API_ROOT_URL } from "../jsx/constants";


export function signUp(firstName, lastName, email, password, role) {
    //axios call
    const postData = {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        role,
        returnSecureToken: true,
    };
    return axios.post(
        `${API_ROOT_URL}/users`,
        postData,
    );
}

export function login(role, email, password) {
    const postData = {
        role,
        email,
        password,
        returnSecureToken: true,
    };
    return axios.post(
        `${API_ROOT_URL}/users/login`,
        postData,
    );
}

export function formatError(errorResponse) {
    
    switch (errorResponse.message) {
        case 'EMAIL_EXISTS':
            //return 'Email already exists';
            swal("Oops", "Email already exists", "error");
            break;
        case 'EMAIL_NOT_FOUND':
            //return 'Email not found';
           swal("Oops", "Email not found", "error",{ button: "Try Again!"});
           break;
        case 'INVALID_PASSWORD':
            //return 'Invalid Password';
            swal("Oops", "Invalid Password", "error",{ button: "Try Again!" });
            break;
        case 'USER_DISABLED':
            swal("Oops", "Your account has been suspended. Please contact administrator. Thank you!", "error",{ button: "Try Again",});
            break;
        
        default:
            swal("Oops", "Network Error!. Please try again later.", "error",{ button: "Try Again!",});
            break;
    }
}

export function saveTokenInLocalStorage(tokenDetails) {
    tokenDetails.expireDate = new Date(
        new Date().getTime() + tokenDetails.expiresIn * 1000,
    );
    localStorage.setItem('userDetails', JSON.stringify(tokenDetails));
}

export function runLogoutTimer(dispatch, timer, history) {
    setTimeout(() => {
        dispatch(logout(history));
    }, timer);
}

export function checkAutoLogin(dispatch, history) {
    const tokenDetailsString = localStorage.getItem('userDetails');
    
    let tokenDetails = '';
    if (!tokenDetailsString) {
        dispatch(logout(history));
        return;
    }

    tokenDetails = JSON.parse(tokenDetailsString);
    let expireDate = new Date(tokenDetails.expireDate);
    let todaysDate = new Date();

    if (todaysDate > expireDate) {
        dispatch(logout(history));
        return;
    }
    dispatch(loginConfirmedAction(tokenDetails));

    
    const timer = expireDate.getTime() - todaysDate.getTime();
    runLogoutTimer(dispatch, timer, history);
}
