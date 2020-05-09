import React from "react";
import testImage from "./images/testHistory.jpg";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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
        height: 200,
    },
    cardButtons: {
        height: 25,
    },
    media: {
        height: 140,
    },
}));

const tileData = [
    {
        img: testImage,
        title: "South Korea Trip",
        date: "8/05/2014",
    },
    {
        img: testImage,
        title: "China Holiday",
        date: "9/12/2010",
    },
];

/**
 * This component will have past journeys and destinations viewable
 * as cards.
 */
export default function HistoryView() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography className={classes.title} variant="h3">
                Past Journeys
            </Typography>
            {tileData.map((tile, index) => (
                <Card className={classes.card} key={index}>
                    <CardActionArea className={classes.cardActionArea}>
                        <CardMedia className={classes.media} image={tile.img} />
                        <Typography gutterBottom variant="h5" component="h2">
                            {tile.title}
                        </Typography>
                        <Typography gutterBottom variant="p" component="p">
                            {tile.date}
                        </Typography>
                    </CardActionArea>
                    <CardActions className={classes.cardButtons}>
                        <Button size="small" color="primary">
                            {`View`}
                        </Button>
                        <Button size="small" color="secondary">
                            {`Delete`}
                        </Button>
                    </CardActions>
                </Card>
            ))}
        </div>
    );
}
