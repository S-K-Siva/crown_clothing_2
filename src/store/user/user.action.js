import { TYPES } from "./user.types";
export const setCurrentUser = (inputPayload) => ({type : TYPES.SET_CURRENT_USER,payload : inputPayload});