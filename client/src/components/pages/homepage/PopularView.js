import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import testImage from "./images/testPopular.jpg";
import axios from "axios";

/**
 * Custom CSS styles for the component.
 */
const useStyles = (theme) => ({
    root: {
        width: 780,
        height: "100%",
        margin: 20,
        display: "inline-block",
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
});

//Template for displaying location. Testimage added to display if api fails.
const placeData = {
    "Hong Kong": {
        img: testImage,
        title: "Country",
        description:
            "An amazing city with the perfect combination of east and west. With a population of 7.4 million the city is always busting with noise.",
    },
    Mangere: {
        img: testImage,
        title: "Country",
        description:
            "The entire south auckland experience in one city. Fish and Chips, burger king everything you need.",
    },
    London: {
        img: testImage,
        title: "Country",
        description:
            "One of the most vibrant city with a bit of everything. Perfect place to visit if you want to get colonised.",
    },
    "New York": {
        img: testImage,
        title: "Country",
        description:
            "It really is just like the movies. Town Square is an experience you'll never forget. And don't forget the pizzas!",
    },
    Sydney: {
        img: testImage,
        title: "Country",
        description:
            "It's auckland, but better! A very diverse city with plenty of tourist attractions such as the opera house.",
    },
    Paris: {
        img: testImage,
        title: "Country",
        description: "In this world full of sadness, all we really need is someone to love. Maybe you'll find it here.",
    },
};

const GOOGLE_PLACES_API_URL = "https://maps.googleapis.com/maps/api/place";
const GOOGLE_PLACES_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

/**
 * This component will show the recommended destinations to the user.
 */
class PopularView extends React.Component {
    //hardcoded placeIDs
    //mangere, paris, new york, hong kong, sydney, london in order
    constructor(props) {
        super(props);
        this.state = {
            places: [],
            placeIDs: [
                "ChIJBxpST4VPDW0R0N6iQ2HvAAU",
                "ChIJD7fiBh9u5kcRYJSMaMOCCwQ",
                "ChIJOwg_06VPwokRYv534QaPC8g",
                "ChIJD5gyo-3iAzQRfMnq27qzivA",
                "ChIJP3Sa8ziYEmsRUKgyFmh9AQM",
                "ChIJdd4hrwug2EcRmSrV3Vo6llI",
            ],
        };
    }
    componentDidMount() {
        const getPlaceDetails = async () => {
            this.state.placeIDs.forEach((placeID) => {
                try {
                    axios.get("/api/placeDetails/" + placeID).then((res) => {
                        //getting photo references and name from placeDetails api
                        const photoReference = res.data.result.photos[0].photo_reference;
                        let place = {};
                        place.photoReference = photoReference;
                        place.names = res.data.result.name;

                        this.setState((state) => {
                            return {
                                places: [...state.places, place],
                            };
                        });
                    });
                } catch (error) {
                    console.log(error);
                }
            });
        };
        getPlaceDetails();
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Typography className={classes.title} variant="h3">
                    {"Recommended Places"}
                </Typography>
                {this.state.places.map((place, index) => (
                    <Card className={classes.card} key={index}>
                        <CardActionArea className={classes.cardActionArea}>
                            <CardMedia
                                className={classes.media}
                                image={`${GOOGLE_PLACES_API_URL}/photo?maxwidth=400&photoreference=${place.photoReference}&key=${GOOGLE_PLACES_API_KEY}`}
                            />
                            <Typography gutterBottom variant="h5" component="h2" style={{paddingLeft: "10px", paddingTop: "5px"}}>
                                {place.names}
                            </Typography>
                        </CardActionArea>
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom>
                                {placeData[place.names] === undefined ? "" : placeData[place.names].description}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }
}

export default withStyles(useStyles)(PopularView);
