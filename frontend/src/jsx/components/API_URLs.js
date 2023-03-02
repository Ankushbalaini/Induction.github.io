const API_URLs = {

    COMPANIES: {
      URL: "${API_ROOT_URL}/company/list", 
      METHOD: "GET"
    },

    // update company by ID
    UPDATE_COMPANY: {
      URL: "${API_ROOT_URL}/company/edit/",
      METHOD: "PUT",
      REMARK: "append company id in URL"
    },

    // for company, instructor, users
    CHANGE_STATUS: {
      URL: "${API_ROOT_URL}/users/changeUserStatus",
      METHOD: "PUT",
      REMARK: "pass userID and status in body"
    },
};
export default API_URLs;


export const SLIDE_APIS = {
  CHANGE_STATUS: {
    URL: "${API_ROOT_URL}/slides/",
    METHOD: "PUT",
    REMARK: "pass id and status in body"
  }
}