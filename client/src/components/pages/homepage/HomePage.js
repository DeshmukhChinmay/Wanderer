import React from "react";
import JourneyView from "./JourneyView";
import PopularView from "./PopularView";
import HistoryView from "./HistoryView";

/**
 * This component is the home page of the webapp. This is only accessible
 * if the user is logged in, and allows for:
 * - The viewing, editing and creating journeys.
 * - The viewing of popular places to visit.
 * - The viewing of past journeys and destinations.
 */
export default class HomePage extends React.Component {
    render() {
        return (
            <div>
                <JourneyView></JourneyView>
                <PopularView></PopularView>
                <HistoryView></HistoryView>
            </div>
        );
    }
}
