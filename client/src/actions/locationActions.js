import { ADD_LOCATION, REMOVE_LOCATION } from "./types";

/**
 * Action for adding a location object to the redux store state.
 */
export function addLocation(location) {
    return {
        type: ADD_LOCATION,
        location,
    };
}

/**
 * Action for removing a location object from the redux store state.
 */
export function removeLocation(location) {
    return {
        type: REMOVE_LOCATION,
        location,
    };
}
