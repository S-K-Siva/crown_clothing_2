import {call,all,takeLatest,put} from "redux-saga/effects";
import { TYPES } from "./product.types";
import { setProductsSuccess, setProductsFailure } from "./product.action";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
// In redux saga..

// dispatch <-> put
// 'call' to call any action
// 'all' is used to keep track of all the actions be completed before moving to next one.
// 'takelatest', here 'take' is to recieve action, 'takeLatest' is when we receive bunch of action.., we should 
// pick the latest one.

export function* productSync(){
    try{
        const data = yield call(getCategoriesAndDocuments,'categories');
        console.log(data);
        yield put(setProductsSuccess(data));
    }catch(error){
        yield put(setProductsFailure(error));
    }
};

// Start
export function* productStart(){
    yield takeLatest(TYPES.SET_PRODUCTS_START,productSync);
};

// Async Side Effects
export function* productSaga(){
    yield all([call(productStart)]);
}


