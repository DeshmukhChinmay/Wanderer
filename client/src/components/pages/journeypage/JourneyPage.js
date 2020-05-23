import React from "react";
import axios from "axios";
import moment from "moment";

import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const GOOGLE_MAPS_KEY = "AIzaSyBG6avEnYAgnCu0WJE-t5bLlLixfs253to";

const styles = theme => ({
    root: {
        textAlign: "center",
        width: "60%",
        height: "100%",
        margin: 20,
        marginLeft: "20%",
        marginTop: 70,
        display: "inline-block",
    },
});

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key="+GOOGLE_MAPS_KEY+"&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: props.locations[props.selectedLocation].lat , lng: props.locations[props.selectedLocation].lng }}
    center={{ lat: props.locations[props.selectedLocation].lat , lng: props.locations[props.selectedLocation].lng }}
  >
    {props.locations.map((location, index)=>{
      return(
        (<Marker key={index} clickable={true} label={location.name} position={{lat: location.lat, lng: location.lng }}/>)
      );
    })}
  </GoogleMap>
)

/**
 * This component is the Journey page of the app. This will take one journey
 * allow the user to display details of that journey, and edit the journey.
 */
class JourneyPage extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        journey: null,
        weather: [],
        isMarkerShown: false,
        selectedLocation: 0
      }
      console.log(this.state);
    }

    componentDidMount() {
      const id = this.props.match.params.id;

      // Get the journey
      axios.get("/journey/"+id)
      .then(res=>{
        console.log(res.data);
        this.setState({
          journey: res.data
        });
      }).then(()=>{
        // Get all the weather data for the journey's locations
        this.state.journey.locations.map((location, index)=>{
          axios.get("/api/weather").then(res=>{
            this.setState({
              weather: [...this.state.weather, res.data]
            })
          })
        });
      });
    }

    render() {
      const {classes} = this.props;
      if(this.state.journey === null || this.state.weather.length === 0){
        return (
          <div className={classes.root}>
            <h1>Loading...</h1>
          </div>
        );
      } else {
        return (
          <div className={classes.root}>
            <Typography variant="h3" align="center">{this.state.journey.name}</Typography>
            <MyMapComponent
              locations={this.state.journey.locations}
              selectedLocation={this.state.selectedLocation}
            />
            <br/>
            <Typography variant="h3" align="center">Locations</Typography>
            {this.state.journey.locations.map((location, index) => {
              return((
                <Card key={index} style={{backgroundColor:"#ffffe6", marginTop: 20}}>
                  <CardActionArea style={{paddingTop:10}} onClick={()=>{this.setState({selectedLocation: index})}}>
                    <Typography align="center" variant="h5">
                      {location.name}
                    </Typography>
                    <div align="center" style={{height:275, width:800, display: "inline-flex"}}>
                      <DayCard reading={this.state.weather[index]} day={0}></DayCard>
                      <DayCard reading={this.state.weather[index]} day={1}></DayCard>
                      <DayCard reading={this.state.weather[index]} day={2}></DayCard>
                      <DayCard reading={this.state.weather[index]} day={3}></DayCard>
                      <DayCard reading={this.state.weather[index]} day={4}></DayCard>
                    </div>
                  </CardActionArea>
                </Card>
              ));
            })}
            <Typography variant="h3" align="center">Notes</Typography>
            <Typography align="center">{this.state.journey.notes}</Typography>
          </div>
        )
      };
    }
}

function DayCard(props) {
  if(props.reading === undefined){
    return (<br/>);
  }

  var reading = props.reading.list[props.day*8];
  let newDate = new Date();
  const weekday = reading.dt * 1000
  newDate.setTime(weekday)

  const imgURL = `http://openweathermap.org/img/wn/${reading.weather[0].icon}@2x.png`

  const classes = withStyles(styles);
  return (
    <Card style={{ width:200, margin: 20, backgroundColor:"#ffffff"}}>
      <h3 className="card-title">{moment(newDate).format('dddd')}</h3>
      <p className="text-muted">{moment(newDate).format('MMMM Do, h:mm a')}</p>
      <img src={imgURL}></img>
      <h2>{Math.round((reading.main.temp-273.15))} °C</h2>
      <div className="card-body">
        <p className="card-text">{reading.weather[0].description}</p>
      </div>
    </Card>
  )
}

export default withStyles(styles)(JourneyPage);
