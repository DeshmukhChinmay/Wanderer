import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import testImage from "./images/testPopular.jpg";

/**
 * Custom CSS styles for the component.
 */
const useStyles = makeStyles((theme) => ({
    root: {
        width: "60%",
        height: "100%",
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
        height: 175,
    },
    cardContent: {
        height: 100,
    },
    cardButtons: {
        height: 25,
    },
    media: {
        height: 140,
    },
}));

const placeData = [
    {
        img: testImage,
        title: "Wellington",
        description:
            "Wellington, the capital of New Zealand, sits near the North Island’s southernmost point on the Cook Strait.",
    },
    {
        img: testImage,
        title: "Auckland",
        description:
            "Auckland, based around 2 large harbours, is a major city in the north of New Zealand’s North Island.",
    },
];

/**
 * This component will show the recommended destinations to the user.
 */
export default function PopularView() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography className={classes.title} variant="h3">{`What's Popular`}</Typography>
            {placeData.map((place, index) => (
                <Card className={classes.card} key={index}>
                    <CardActionArea className={classes.cardActionArea}>
                        <CardMedia className={classes.media} image={place.img} />
                        <Typography gutterBottom variant="h5" component="h2">
                            {place.title}
                        </Typography>
                    </CardActionArea>
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom>{place.description}</Typography>
                    </CardContent>
                    <CardActions className={classes.cardButtons}>
                        <Button size="small" color="primary">
                            {`Details`}
                        </Button>
                    </CardActions>
                </Card>
            ))}
        </div>
    );
}
