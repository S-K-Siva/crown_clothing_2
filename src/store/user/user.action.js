import { TYPES } from "./user.types";

export const setCurrentUser = (inputPayload) => ({type : TYPES.SET_CURRENT_USER,payload : inputPayload});

export const setCurrentUserStart = () => ({type : TYPES.SET_CURRENT_USER_START});

export const setCurrentUserSuccess = (data) => ({type : TYPES.SET_CURRENT_USER_SUCCESS, payload : data});

export const setCurrentUserFailure = (error) => ({type : TYPES.SET_CURRENT_USER_FAILURE, payload : error});

export const logoutUserStart = () => ({type : TYPES.LOGOUT_USER_START});

export const logoutUserSuccess = () => ({type : TYPES.LOGOUT_USER_SUCCESS,payload : null});

export const logoutUserFailure = (error) => ({type : TYPES.LOGOUT_USER_FAILURE,payload : error});

export const googleSignInStart = () => ({type : TYPES.SIGN_IN_WITH_GOOGLE_START});

export const userSessionStart = () => ({type : TYPES.USER_SESSION_START});
export const emailAndPasswordSignInStart = (email, password) => ({
    type: TYPES.SIGN_IN_WITH_EMAIL_START,
    payload: { email, password }
});

export const emailAndPasswordRegisterStart = (data) => ({
    type : TYPES.SIGN_UP_WITH_EMAIL,
    payload : {email : data.email,password : data.password, extrafields : {...data}}
});
