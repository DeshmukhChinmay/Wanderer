import React from "react";
import axios from "axios";
import moment from "moment";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import MoonLoader from "react-spinners/MoonLoader";

/**
 * Custom CSS styles for the component.
 */
const styles = (theme) => ({
    root: {
        display: "grid",
        gridTemplateColumns: "50% 50%",
        columnGap: "20px",
        padding: "10px 20px",
    },
    loading: {
        display: "grid",
        height: "80vh",
        width: "100%",
    },
    center: {
        placeSelf: "center",
    },
    leftContainer: {
        height: "85vh",
        maxHeight: "85vh",
        display: "grid",
        gridTemplateRows: "1fr 20px 8fr 1fr 2fr",
        placeItems: "center",
        rowGap: "5px",
    },
    rightContainer: {
        display: "grid",
        gridTemplateRows: "1fr 10fr",
        placeItems: "center",
        overflow: "hidden",
    },
    locations: {
        overflow: "auto",
        maxHeight: "75vh",
    },
    notes: {
        border: "1px solid #ccc",
        width: "90%",
        height: "100%",
    },
});

/**
 * Component for rendering Google Maps with a location
 */
const MyMapComponent = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: "100%", width: "100%" }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,
)((props) => (
    <GoogleMap
        defaultZoom={15}
        defaultCenter={{
            lat: props.locations[props.selectedLocation].latitude,
            lng: props.locations[props.selectedLocation].longitude,
        }}
        center={{
            lat: props.locations[props.selectedLocation].latitude,
            lng: props.locations[props.selectedLocation].longitude,
        }}
    >
        {props.locations.map((location, index) => {
            return (
                <Marker key={index} clickable={true} position={{ lat: location.latitude, lng: location.longitude }} />
            );
        })}
    </GoogleMap>
));

/**
 * Component for giving a summary of a journey.
 */
class JourneyPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            journey: null,
            weather: [],
            isMarkerShown: false,
            selectedLocation: 0,
            cardHeights: [220],
        };
    }

    addToCardHeight() {
        this.setState({
            cardHeights: [...this.state.cardHeights, 220],
        });
    }

    getJourneyDates() {
        let string = `Journey Start Date: 
        ${this.state.journey.startDate.substring(0,10,)} 
        Journey End Date: ${this.state.journey.endDate.substring(0, 10)}`;
        return string;
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        // Get the journey
        axios
            .get("/journey/" + id)
            .then((res) => {
                this.setState({
                    journey: res.data,
                });
            })
            .then(() => {
                // Get all the weather data for the journey's locations
                this.state.journey.locations.forEach((location) => {
                    axios({
                        method: "get",
                        url: "/api/weather/" + location.latitude + "/" + location.longitude,
                    }).then((res) => {
                        this.setState({
                            weather: [...this.state.weather, res.data],
                        });
                    });
                    this.addToCardHeight();
                });
            });
    }

    render() {
        const { classes } = this.props;
        if (this.state.journey === null || this.state.weather.length === 0) {
            return (
                <div className={classes.loading}>
                    <div className={("sweet-loading", classes.center)}>
                        <MoonLoader size={75} color={"#36C0D7"} loading={this.state.loading} />
                    </div>
                </div>
            );
        } else {
            return (
                <div className={classes.root}>
                    <div className={classes.leftContainer}>
                        <Typography variant="h4" align="center">
                            {this.state.journey.name}
                        </Typography>
                        <Typography align="center">{this.getJourneyDates()}</Typography>
                        <MyMapComponent
                            locations={this.state.journey.locations}
                            selectedLocation={this.state.selectedLocation}
                        />
                        <Typography variant="h4" align="center">
                            Notes
                        </Typography>
                        <Typography align="left" className={classes.notes} style={{ paddingLeft: "10px" }}>
                            {this.state.journey.notes}
                        </Typography>
                    </div>
                    <div className={classes.rightContainer}>
                        <Typography variant="h4" align="center">
                            Locations
                        </Typography>
                        <div className={classes.locations}>
                            {this.state.journey.locations.map((location, index) => {
                                return (
                                    <Card key={index} style={{ backgroundColor: "#E8F5FF", marginTop: 20 }}>
                                        <CardActionArea
                                            style={{ paddingTop: 10 }}
                                            onClick={() => {
                                                this.setState({ selectedLocation: index });
                                                if (this.state.cardHeights[index] === 220) {
                                                    this.state.cardHeights[index] = 270;
                                                } else {
                                                    this.state.cardHeights[index] = 220;
                                                }
                                            }}
                                        >
                                            <Typography align="center" variant="h5">
                                                {location.name}
                                            </Typography>
                                            <div
                                                align="center"
                                                style={{
                                                    height: this.state.cardHeights[index],
                                                    width: "46vw",
                                                    display: "inline-flex",
                                                }}
                                            >
                                                <DayCard reading={this.state.weather[index]} day={0}></DayCard>
                                                <DayCard reading={this.state.weather[index]} day={1}></DayCard>
                                                <DayCard reading={this.state.weather[index]} day={2}></DayCard>
                                                <DayCard reading={this.state.weather[index]} day={3}></DayCard>
                                                <DayCard reading={this.state.weather[index]} day={4}></DayCard>
                                            </div>
                                        </CardActionArea>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                </div>
            );
        }
    }
}

/**
 * Component for rendering the weather data retrieved from the server
 */
function DayCard(props) {
    if (props.reading === undefined) {
        return <br />;
    }

    var reading = props.reading.list[props.day * 8];
    let newDate = new Date();
    const weekday = reading.dt * 1000;
    newDate.setTime(weekday);

    const imgURL = `http://openweathermap.org/img/wn/${reading.weather[0].icon}@2x.png`;

    return (
        <Card style={{ width: 200, margin: "20px 10px", backgroundColor: "#ffffff" }}>
            <h3 className="card-title">{moment(newDate).format("dddd")}</h3>
            <p className="text-muted">{moment(newDate).format("MMMM Do, h:mm a")}</p>
            <img src={imgURL} alt="Weather Icon"></img>
            <h2>{Math.round(reading.main.temp - 273.15)} °C</h2>
            <div className="card-body">
                <p className="card-text">{reading.weather[0].description}</p>
            </div>
        </Card>
    );
}

export default withStyles(styles)(JourneyPage);
