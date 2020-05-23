import { ADD_LOCATION, REMOVE_LOCATION } from "./../actions/types";

export default function location(state = [], action) {
    switch (action.type) {

        case ADD_LOCATION: {
            console.log("IN THE REDUCER");
            console.log([...state, action.location]);
            return [...state, action.location];
        }

        case REMOVE_LOCATION: {
            console.log("IN THE REDUCER REMOVE LOCATION");
            console.log([...state, action.location]);
            var locations = [...state];
            var index = locations.indexOf(action.location);
            if (index > -1) { 
                locations.splice(index, 1);
            }
            return locations;
        }
        default:
            return state;
    }
}
