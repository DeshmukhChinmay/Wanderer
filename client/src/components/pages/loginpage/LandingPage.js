import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import backgroundImage from "./images/Background.jpg";
import journeyCreation from "./images/JourneyCreation.PNG";

/**
 * Custom CSS styles for the component.
 */
const useStyles = makeStyles((theme) => ({

    background: {
        position: "absolute",
        top: 0,
        width: "100%",
        height: "100%",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundImage: 'url(' + backgroundImage + ')',
    },
    large: {
        display: "grid",
        gridTemplateRows: "40% 60%",
        width: "100%",
        height: "100%",
        verticalAlign: "middle",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgba(0,0,0,0.3)",
        color: "white",
        position: "absolute",
        top: 0,
    },

    center: {
        placeSelf: "center",
    },

    image: {
        placeSelf: "center",
        width: "40%",
        height: "auto",
    },

    bottom: {
        alignSelf: "end",
    },

    featuresContainer: {
        display: "grid",
        gridTemplateRows: "20% 80%",
    },
}));

/**
 * Component for rendering the landing page for the web application.
 */
const LandingPage = () => {
    const classes = useStyles();
    return (
        <div className={classes.background}>
            <div className={classes.large}>
                <Typography className={classes.bottom} variant="h2" align="center">
                    Welcome to Wanderer
                </Typography>
                <div className={classes.featuresContainer}>   
                    <Typography className={classes.center} variant="h4" align="center">
                        Plan your next journey today
                    </Typography>
                    <img className={classes.image} src={journeyCreation}></img>
                </div>
            </div>
        </div>
    );
};
export default LandingPage;
