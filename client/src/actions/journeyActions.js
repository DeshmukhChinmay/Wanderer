import axios from "axios";
import { FETCH_JOURNEYS, FETCH_ACTIVE_JOURNEYS, FETCH_INACTIVE_JOURNEYS } from "./types";

/**
 * Action for fetching all of the journeys for a user from the
 * server.
 */
export const fetchJourneys = () => async (dispatch) => {
    const res = await axios.get("/journey/all");
    dispatch({ type: FETCH_JOURNEYS, payload: res.data });
};

/**
 * Action for fetching all of the active journeys for a user from the
 * server.
 */
export const fetchActiveJourneys = () => async (dispatch) => {
    const res = await axios.get("/journey/all-active");
    dispatch({ type: FETCH_ACTIVE_JOURNEYS, payload: res.data });
};

/**
 * Action for fetching all of the inactive journeys for a user from the
 * server.
 */
export const fetchInactiveJourneys = () => async (dispatch) => {
    const res = await axios.get("/journey/all-inactive");
    dispatch({ type: FETCH_INACTIVE_JOURNEYS, payload: res.data });
};
