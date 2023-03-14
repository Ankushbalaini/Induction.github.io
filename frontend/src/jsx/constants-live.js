// require('dotenv').config();

export const USER_ROLES = {
    SUPER_ADMIN: "super_admin",
    COMPANY: "company",
    INSTRUCTOR: "instructor",
    USER: "user",
};

export const API_ROOT_URL = process.env.API_ROOT_URL || "http://176.58.103.115:5000/api";

export const UPLOADS_URL = `http://bjsinduction.com/api/`;



export const PROFILE_ASSETS_URL = `http://bjsinduction.com/api/profile`;
export const INDUCTION_ASSETS_URL = `http://bjsinduction.com/api/inductions`;




export const DASHBOARD = {
    
}