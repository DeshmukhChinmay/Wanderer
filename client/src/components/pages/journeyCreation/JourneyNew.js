import React from "react";
import Map from "./Map";
import JourneyDetails from "./JourneyDetails";

/**
 * Parent component to the 'Map' and 'JourneyDetails' components
 */
export default function JourneyNew(props) {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr",
                placeItems: "center",
                height: "80vh",
            }}
        >
            <Map
                google={props.google}
                center={{ lat: -36.848461, lng: 174.763336 }}
                height="80%"
                width="90%"
                zoom={15}
            />
            <JourneyDetails />
        </div>
    );
}
