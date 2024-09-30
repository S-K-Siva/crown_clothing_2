
import {call, all} from "redux-saga/effects";
import { productSaga } from "./product/product.saga";
import { userSaga } from "./user/user.saga";

// generator function
export function* rootSaga(){
    yield all([call(productSaga),call(userSaga)])
}