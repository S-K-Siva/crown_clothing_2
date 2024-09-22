const INITIAL_VALUE = {
    currentUser : null
};

const ACTIONS = {
    SET_CURRENT_USER : 'SET_CURRENT_USER'
};
export const UserReducer = (state = INITIAL_VALUE, action) => {
    const {type, payload} = action;
    switch(type){
        case ACTIONS.SET_CURRENT_USER:
            return {currentUser : payload}
        default:
            return state;
    }
};
