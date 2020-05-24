import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import testImage from "./images/testJourney.jpg";

/**
 * Custom CSS styles for the component.
 */
const useStyles = makeStyles((theme) => ({
    root: {
        width: "60%",
        height: "100%",
        marginTop: 70,
        margin: 20,
        display: "inline-block",
    },
    title: {
        backgroundColor: "pink",
    },
    card: {
        float: "left",
        height: "auto",
        width: 250,
        margin: 5,
    },
    cardActionArea: {
        height: 200,
    },
    cardButtons: {
        height: 25,
    },
    media: {
        height: 140,
    },
}));

/**
 * This component will have journeys viewed as cards. The user can change the
 * status (Active/Inactive) of the journey on the cards. The journeys can be deleted
 * from the cards as well.
 */
export default function JourneyView(props) {
    const classes = useStyles();
    if (props.journeys === null || props.journeys.length === 0) {
        return (
            <div className={classes.root}>
                <Typography className={classes.title} variant="h3">
                    Planned Journeys
                </Typography>
                <Typography>Uh oh! It looks like you don't have any journeys yet!</Typography>
            </div>
        );
    } else {
        return (
            <div className={classes.root}>
                <Typography className={classes.title} variant="h3">
                    Planned Journeys
                </Typography>
                {props.journeys.map((journey, index) => (
                    <Card className={classes.card} key={index}>
                        <CardActionArea className={classes.cardActionArea}>
                            <CardMedia className={classes.media} image={testImage} />
                            <Typography gutterBottom variant="h5" component="h2" align="center">
                                {journey.name}
                            </Typography>
                        </CardActionArea>
                        <CardActions className={classes.cardButtons}>
                            <Button size="small" color="primary" component={Link} to={"journey-view/" + journey._id}>
                                {`View`}
                            </Button>
                            <Button
                                size="small"
                                color="secondary"
                                onClick={() => {
                                    axios.post("/journey/make-inactive/" + journey._id).then(function (res) {
                                        window.location.reload(false);
                                    });
                                }}
                            >
                                {`Mark as Complete`}
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </div>
        );
    }
}
