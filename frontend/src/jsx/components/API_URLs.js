const API_URLs = {

    COMPANIES: {
      URL: "http://localhost:8081/api/company/list", 
      METHOD: "GET"
    },

    // update company by ID
    UPDATE_COMPANY: {
      URL: "http://localhost:8081/api/company/edit/",
      METHOD: "PUT",
      REMARK: "append company id in URL"
    },

    // for company, instructor, users
    CHANGE_STATUS: {
      URL: "http://localhost:8081/api/users/changeUserStatus",
      METHOD: "PUT",
      REMARK: "pass userID and status in body"
    },
};
export default API_URLs;