import { combineReducers } from "redux";
import userReducer from "./userReducer";
import locationReducer from "./locationReducer";
import journeyReducer from "./journeyReducer";

export default combineReducers({
    user: userReducer,
    location: locationReducer,
    journey: journeyReducer,
});
