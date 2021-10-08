import { combineReducers } from "redux";
import { SET_USER } from "./actiontypes";

let defaultState ={
    currentUser: null
}

const userReducer =(state=defaultState, action)=>{
    if(action.type===SET_USER){
        let payload = action.payload;
        state={...payload};
        return state;
    }
    return state;
}

export const combinedReducers = combineReducers({user:userReducer})