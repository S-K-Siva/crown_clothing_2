import { TYPES as ACTIONS } from './user.types.js';
import { createSlice } from '@reduxjs/toolkit';
const INITIAL_VALUE = {
    currentUser: null,
    error: null
};

export const UserSlice = createSlice({
    name : 'users',
    initialState : INITIAL_VALUE,
    reducers : {
        setCurrentUser(state,action)
        {
            state.currentUser = action.payload
        }
    }
});

export const {setCurrentUser} = UserSlice.actions;

export const UserReducer = UserSlice.reducer;

export const UserReducerOld = (state = INITIAL_VALUE, action) => {
    const { type, payload } = action;
    switch (type) {
        case ACTIONS.SIGN_IN_WITH_EMAIL_START:
        case ACTIONS.SIGN_IN_WITH_GOOGLE_START:
        case ACTIONS.SET_CURRENT_USER_START:
            return state; // no change, just the start
        case ACTIONS.SET_CURRENT_USER_SUCCESS:
            return {
                ...state,  // Keep the previous state
                currentUser: payload, // Update currentUser with payload
                error: null           // Reset any previous errors
            };
        case ACTIONS.SET_CURRENT_USER_FAILURE:
            return {
                ...state, // Keep the previous state
                error: payload // Set error in case of failure
            };
        case ACTIONS.LOGOUT_USER_START:
            return state;
        case ACTIONS.LOGOUT_USER:
            return {
                ...state,
                currentUser: null,  // Explicitly set currentUser to null
                error: null         // Clear any previous errors
            };
        case ACTIONS.LOGOUT_USER_SUCCESS:
            return {
                ...state,
                currentUser: null,  // Explicitly set currentUser to null
                error: null         // Clear any previous errors
            };
        case ACTIONS.LOGOUT_USER_FAILURE:
            return {
                ...state,
                currentUser : null,
                error : payload
            }
        default:
            return state;
    }
};