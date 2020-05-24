import { FETCH_JOURNEYS, FETCH_ACTIVE_JOURNEYS, FETCH_INACTIVE_JOURNEYS } from "../actions/types";

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_JOURNEYS:
            return { ...state, allJourneys: action.payload };
        case FETCH_ACTIVE_JOURNEYS:
            return { ...state, activeJourneys: action.payload };
        case FETCH_INACTIVE_JOURNEYS:
            return { ...state, inactiveJourneys: action.payload };
        default:
            return state;
    }
}
