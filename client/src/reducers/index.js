import { combineReducers } from "redux";
import userReducer from "./userReducer";
import journeyReducer from "./journeyReducer";

export default combineReducers({
    user: userReducer,
    journey: journeyReducer
});
