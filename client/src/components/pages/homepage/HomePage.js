import React, { useEffect, forwardRef } from "react";
import JourneyView from "./JourneyView";
import PopularView from "./PopularView";
import HistoryView from "./HistoryView";
import { makeStyles, Grid, Tooltip } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchActiveJourneys, fetchInactiveJourneys } from "../../../actions/journeyActions";

const useStyles = makeStyles((theme) => ({
    fab: {
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

const CreateJourneyLink = forwardRef((props, ref) => <Link ref={ref} to="/journey/new" {...props} />);

/**
 * This component is the home page of the webapp. This is only accessible
 * if the user is logged in, and allows for:
 * - The viewing, editing and creating journeys.
 * - The viewing of popular places to visit.
 * - The viewing of past journeys and destinations.
 */
export default function HomePage(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const state = useSelector((state) => state);

    // Fetch the journey data once the app is ready to the loaded
    useEffect(() => {
        dispatch(fetchActiveJourneys());
        dispatch(fetchInactiveJourneys());
    }, [dispatch]);

    if (state.journey.activeJourneys === undefined || state.journey.inactiveJourneys === undefined) {
        return (
            <div
                style={{
                    display: "inline",
                    alignSelf: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <Grid container spacing={2} justify="center">
                    <JourneyView journeys={[]}></JourneyView>
                    <PopularView></PopularView>
                    <HistoryView journeys={[]}></HistoryView>
                </Grid>
                <Tooltip title="Add a Journey" aria-label="add a journey" component={CreateJourneyLink}>
                    <Fab color="primary" aria-label="add" className={classes.fab}>
                        <AddIcon />
                    </Fab>
                </Tooltip>
            </div>
        );
    } else {
        return (
            <div
                style={{
                    display: "inline",
                    alignSelf: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <Grid container spacing={2} justify="center">
                    <JourneyView journeys={state.journey.activeJourneys}></JourneyView>
                    <PopularView></PopularView>
                    <HistoryView journeys={state.journey.inactiveJourneys}></HistoryView>
                </Grid>
                <Tooltip title="Add a Journey" aria-label="add a journey" component={CreateJourneyLink}>
                    <Fab color="primary" aria-label="add" className={classes.fab}>
                        <AddIcon />
                    </Fab>
                </Tooltip>
            </div>
        );
    }
}
