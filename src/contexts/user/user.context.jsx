import { createContext, useReducer , useEffect} from "react";
import { onAuthStateChangedListener } from "../../utils/firebase/firebase.utils";


export const UserContext = createContext({
    currentUser : null,
    setCurrentUser : () => null
});

const INITIAL_VALUE = {
    currentUser : null
};

const ACTIONS = {
    SET_CURRENT_USER : 'SET_CURRENT_USER'
};
const UserReducer = (state, action) => {
    const {type, payload} = action;
    switch(type){
        case ACTIONS.SET_CURRENT_USER:
            return {currentUser : payload}
        default:
            throw new Error(`Unhandled ACTION ${type}`);
    }
};
export const UserProvider = ({children}) => {
    const [{currentUser},dispatch] = useReducer(UserReducer, INITIAL_VALUE);

    const setCurrentUser = (user) => {
        dispatch({type : 'SET_CURRENT_USER', payload :user});
    }
    const value = {currentUser, setCurrentUser};
    useEffect(()=>{
        const unsubscribe = onAuthStateChangedListener((user)=>{
            setCurrentUser(user);
        });
        return unsubscribe;
    },[])
    
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};