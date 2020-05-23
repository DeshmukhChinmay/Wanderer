import React, {useEffect, useState} from "react";
import axios from "axios";
import JourneyView from "./JourneyView";
import PopularView from "./PopularView";
import HistoryView from "./HistoryView";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { fetchActiveJourneys, fetchInactiveJourneys } from "../../../actions/journeyActions";
/**
 * This component is the home page of the webapp. This is only accessible
 * if the user is logged in, and allows for:
 * - The viewing, editing and creating journeys.
 * - The viewing of popular places to visit.
 * - The viewing of past journeys and destinations.
 */
export default function HomePage(props) {

  const dispatch = useDispatch();

  // Fetch the journey data once the app is ready to the loaded
  useEffect(() => {
    dispatch(fetchActiveJourneys());
    dispatch(fetchInactiveJourneys());
  }, []);

  const state = useSelector((state) => state);

  if(state.journey.activeJourneys === undefined || state.journey.inactiveJourneys === undefined){
    return (
      <div align="center">
          <JourneyView journeys={[]}></JourneyView>
          <PopularView></PopularView>
          <HistoryView journeys={[]}></HistoryView>
      </div>
    );
  } else {
    return (
      <div align="center">
          <JourneyView journeys={state.journey.activeJourneys}></JourneyView>
          <PopularView></PopularView>
          <HistoryView journeys={state.journey.inactiveJourneys}></HistoryView>
      </div>
    )
  }

}
