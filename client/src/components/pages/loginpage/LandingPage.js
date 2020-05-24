import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import backgroundImage from "./images/Background.jpg"

const useStyles = makeStyles((theme) => ({
    large: {
        display: "grid",
        gridTemplateRows: "100vh 100vh 100vh",
        width: "100vw",
        height: "300vh",
        verticalAlign: "middle",
        backgroundImage: 'url(' + backgroundImage + ')',
        backgroundSize: "100% 50%",
        backgroundRepeat: "no-repeat",
        color: "white",
    },

    center: {
        alignSelf: "center",
    },

    bottom: {
        alignSelf: "end",
    },

    features: {
        display: "grid",
        gridTemplateRows: "25% auto 10%",
        background: "rgb(88,176,255) radial-gradient(circle, rgba(88,176,255,1) 0%, rgba(46,91,186,1) 89%)",
    },

    features2: {
        display: "grid",
        gridTemplateRows: "25% auto 10%",
        background: "rgb(119,123,133) radial-gradient(circle, rgba(119,123,133,1) 0%, rgba(84,40,40,1) 89%)",
    },
}));

const LandingPage = () => {
    const classes = useStyles();
    return (
        <div className={classes.large}>
            <Typography className={classes.center} variant="h2" align="center">
                Welcome to Wanderer
            </Typography>
            <div className={classes.features}>
                <Typography className={classes.bottom} variant="h3" align="center">
                    Plan your journeys
                </Typography>
                <div className={classes.center} align="center">
                    images go here
                </div>
            </div>
            <div className={classes.features2}>
                <Typography className={classes.bottom} variant="h3" align="center">
                    See popular destinations
                </Typography>
                <div className={classes.center} align="center">
                    images go here
                </div>
            </div>
        </div>
    );
};
export default LandingPage;
