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
import getRandomImage from "./ImageHelper";

/**
 * Custom CSS styles for the component.
 */
const useStyles = makeStyles((theme) => ({
    root: {
        width: 750,
        height: "100%",
        margin: 20,
        display: "inline-block",
        align: "center",
    },
    title: {
        backgroundColor: "navy",
        color: "white",
        textDecoration: "underline",
        padding: "10px",
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
        height: 35,
    },
    media: {
        height: 140,
    },
}));

/**
 * This component will have past journeys and destinations viewable
 * as cards.
 */
export default function HistoryView(props) {
    const classes = useStyles();
    if (props.journeys === null || props.journeys.length === 0) {
        return (
            <div className={classes.root}>
                <Typography className={classes.title} variant="h3">
                    Past Journeys
                </Typography>
                <Typography>You don't have any past journeys.</Typography>
            </div>
        );
    } else {
        return (
            <div className={classes.root}>
                <Typography className={classes.title} variant="h3">
                    Past Journeys
                </Typography>
                {props.journeys.map((journey, index) => (
                    <Card className={classes.card} key={index}>
                        <CardActionArea className={classes.cardActionArea}>
                            <CardMedia className={classes.media} image={getRandomImage()} />
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
                                    axios.delete("/journey/" + journey._id).then(function (res) {
                                        window.location.reload(false);
                                    });
                                }}
                            >
                                {`Delete`}
                            </Button>
                            <Button
                                size="small"
                                color="secondary"
                                onClick={() => {
                                    axios.post("/journey/make-active/" + journey._id).then(function (res) {
                                        window.location.reload(false);
                                    });
                                }}
                            >
                                {`Make Active`}
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </div>
        );
    }
}
