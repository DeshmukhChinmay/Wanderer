import axios from "axios";
import { FETCH_JOURNEYS, FETCH_ACTIVE_JOURNEYS, FETCH_INACTIVE_JOURNEYS } from "./types";

export const fetchJourneys = () => async (dispatch) => {
    const res = await axios.get("/journey/all");
    dispatch({ type: FETCH_JOURNEYS, payload: res.data });
};

export const fetchActiveJourneys = () => async (dispatch) => {
    const res = await axios.get("/journey/all-active");
    dispatch({ type: FETCH_ACTIVE_JOURNEYS, payload: res.data });
};

export const fetchInactiveJourneys = () => async (dispatch) => {
    const res = await axios.get("/journey/all-inactive");
    dispatch({ type: FETCH_INACTIVE_JOURNEYS, payload: res.data });
};
