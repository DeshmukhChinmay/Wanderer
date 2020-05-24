import axios from "axios";
import { FETCH_USER } from "./types";

/**
 * Action for fetching the user from the current session
 * from the server. The response is stored in the redux store
 * state as 'user'.
 */
export const fetchUser = () => async (dispatch) => {
    const res = await axios.get("/user/current-user");
    dispatch({ type: FETCH_USER, payload: res.data });
};
