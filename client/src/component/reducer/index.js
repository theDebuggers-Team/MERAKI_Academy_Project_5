import loginReducer from "./login/index";
import { combineReducers, createStore } from "redux";
import productReducer from "./products/index";

// create main reducer
const reducers = combineReducers({ loginReducer, productReducer });

//create store
const store = createStore(reducers);

export default store;
