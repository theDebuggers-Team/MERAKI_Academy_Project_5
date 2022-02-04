import loginReducer from "./login/index";
import { combineReducers, createStore } from "redux";

// create main reducer
const reducers = combineReducers({ loginReducer });

//create store
const store = createStore(reducers);

export default store;
