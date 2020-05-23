import React from "react";
import Map from "./Map";
import JourneyDetails from "./JourneyDetails";

export default function JourneyNew(props) {
    // Create a header saying add a new journey
    // Create a field to let the user put title
    // Show a map to let the user add locations
    // Send request to the back end to create a new journey
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr",
                placeItems: "center",
                height: "80vh",
            }}
        >
            <Map google={props.google} center={{ lat: -36.848461, lng: 174.763336 }} height="80%" width="90%" zoom={15} />
            <JourneyDetails/>
        </div>
    );
}
