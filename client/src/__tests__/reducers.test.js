import { createStore } from "redux";
import reducers from "./../reducers";
import { addLocation, removeLocation } from "./../actions/locationActions";

let store;

beforeEach(() => {
    store = createStore(reducers);
});

it("initial state of location", () => {
    const keys = Object.keys(store.getState());
    console.log(keys);
    expect(keys.length).toBe(3);
    expect(keys[1]).toBe("location");
    expect(store.getState().value).toBe();
});

it("adding a location", () => {
    const location = {
        name: "Auckland, New Zealand",
        latitude: -37.123,
        longitude: 125.123,
    };

    store.dispatch(addLocation(location));

    expect(store.getState().location).toMatchObject([
        {
            name: "Auckland, New Zealand",
            latitude: -37.123,
            longitude: 125.123,
        },
    ]);
});

it("removing a location", () => {
    const location = {
        name: "Auckland, New Zealand",
        latitude: -37.123,
        longitude: 125.123,
    };

    store.dispatch(addLocation(location));

    expect(store.getState().location).toMatchObject([
        {
            name: "Auckland, New Zealand",
            latitude: -37.123,
            longitude: 125.123,
        },
    ]);

    store.dispatch(removeLocation(location));

    expect(store.getState().location).toMatchObject([]);
});
