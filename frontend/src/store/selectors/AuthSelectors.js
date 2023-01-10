export const isAuthenticated = (state) => {

    if (state.auth.auth.token) return true;
    //if (state.auth.auth.idToken) return true;
    return false;
};
