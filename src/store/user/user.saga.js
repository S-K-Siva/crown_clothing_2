import {all,call,takeLatest,put} from "redux-saga/effects";
import { setCurrentUserSuccess, setCurrentUserFailure, logoutUserFailure, logoutUserStart, logoutUserSuccess } from "./user.action";
import { getCurrentUserFromFB,signOutUser} from "../../utils/firebase/firebase.utils";
import { signInWithGooglePopUp,signInAuthWithEmailAndPassword,createUserDocumentation,createAuthWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

import {TYPES} from './user.types';
import { signOut } from "firebase/auth";

// FOR ASSIGNING USER 
export function* setUserAsync() {
    try {
        const data = yield call(getCurrentUserFromFB);
        yield call(createUserDocumentation, data);
        yield put(setCurrentUserSuccess(data));  // Add yield to dispatch the action
    } catch (error) {
        yield put(setCurrentUserFailure(error)); // Add yield to dispatch the failure action
    }
}
export function* setUserStart(){
    yield takeLatest(TYPES.SET_CURRENT_USER_START,setUserAsync);
}

// LOGOUT USER
export function* userLogoutAsync(){
    try{
        yield call(signOutUser());
        yield put(logoutUserSuccess);
    }catch(error){
        yield put(logoutUserFailure(error));
    }
}

export function* onUserLogoutStart(){
    yield takeLatest(TYPES.LOGOUT_USER_START,userLogoutAsync);
}

// GOOGLE SIGNIN
export function* GoogleSignInAsync(){
    try{
        const res = yield call(signInWithGooglePopUp);
        const { user } = res;
        yield call(createUserDocumentation, user);
        yield put(setCurrentUserSuccess(user)); // Corrected put usage
    }catch(error){
        yield put(setCurrentUserFailure(error));
    }
}

export function* onGoogleSignInAsync(){
    yield takeLatest(TYPES.SIGN_IN_WITH_GOOGLE_START,GoogleSignInAsync);
}




// Worker saga for email sign-in
export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield call(signInAuthWithEmailAndPassword, email, password);
        yield call(createUserDocumentation, user);
        yield put(setCurrentUserSuccess(user));
    } catch (error) {
        yield put(setCurrentUserFailure(error));
    }
}

export function *onSignInWithEmailAndPasswordAsync(){
    yield takeLatest(TYPES.SIGN_IN_WITH_EMAIL_START,signInWithEmail);
}

// Worker saga for email registration
export function* signUpWithEmail(data) {
    const {type , payload} = data;
    const {email,password,extrafields} = payload;
    if(!email || !password) return;
    console.log(email,password);
    const res = yield call(createAuthWithEmailAndPassword,email,password);
    console.log(res);
    yield put(setCurrentUserSuccess(res.user||null));
    yield call(createUserDocumentation,extrafields);
    
}

export function* onSignUpWithEmail(){
    yield takeLatest(TYPES.SIGN_UP_WITH_EMAIL, signUpWithEmail);
}

// USER_SESSION
// Worker saga to handle user session check
export function* userSessionAsync() {
    try {
        const user = yield call(getCurrentUserFromFB);  // Check if there's an authenticated user
        if (user) {
            yield put(setCurrentUserSuccess(user));  // Set the current user in Redux
        } else {
            yield put(setCurrentUserSuccess(null));  // Set null if no user is authenticated
        }
    } catch (error) {
        yield put(setCurrentUserFailure(error));  // Handle errors
    }
}

// Watcher saga to listen for USER_SESSION_START
export function* onUserSessionStart() {
    yield takeLatest(TYPES.USER_SESSION_START, userSessionAsync);
}

export function* userSaga(){
    yield all([call(setUserStart),call(onUserSessionStart),call(onUserLogoutStart),call(onGoogleSignInAsync),call(onSignInWithEmailAndPasswordAsync),call(onSignUpWithEmail)]);
}

