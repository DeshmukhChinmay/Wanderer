import { ADD_LOCATION, REMOVE_LOCATION } from "./types";

export function addLocation(location) {
    console.log('IN LOCATION ACTION');
    console.log(location);

    return {
        type: ADD_LOCATION,
        location,
    };
}

export function removeLocation(location) {
    console.log('IN LOCATION ACTION');
    console.log(location);

    return {
        type: REMOVE_LOCATION,
        location,
    };
}
