import React, { Component } from "react";
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from "react-google-autocomplete";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { addLocation } from "./../../../actions/locationActions";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
Geocode.enableDebug();

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: "",
            mapPosition: {
                lat: this.props.center.lat,
                lng: this.props.center.lng,
            },
            markerPosition: {
                lat: this.props.center.lat,
                lng: this.props.center.lng,
            },
        };
    }
    
    componentDidMount() {
        Geocode.fromLatLng(this.state.mapPosition.lat, this.state.mapPosition.lng).then(
            (response) => {
                const address = response.results[0].formatted_address;
                this.setState({
                    address: address ? address : "",
                });
            },
            (error) => {
                console.error(error);
            },
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.markerPosition.lat !== this.props.center.lat || this.state.address !== nextState.address) {
            console.log("Component Updating");
            console.log(this.props.location);
            return true;
        } else if (this.props.center.lat === nextProps.center.lat) {
            console.log("Component NOT Updating!!!");
            return false;
        }
    }

    onMarkerDragEnd = (event) => {
        let newLat = event.latLng.lat(),
            newLng = event.latLng.lng();

        Geocode.fromLatLng(newLat, newLng).then(
            (response) => {
                const address = response.results[0].formatted_address;

                this.setState({
                    address: address ? address : "",
                    markerPosition: {
                        lat: newLat,
                        lng: newLng,
                    },
                    mapPosition: {
                        lat: newLat,
                        lng: newLng,
                    },
                });
            },
            (error) => {
                console.error(error);
            },
        );
    };

    onPlaceSelected = (place) => {
        console.log("plc", place);

        const address = place.formatted_address,
            latValue = place.geometry.location.lat(),
            lngValue = place.geometry.location.lng();

        console.log(`latValue = ${latValue}`);
        console.log(`lngValue = ${lngValue}`);

        // Set these values in the state.
        this.setState({
            address: address ? address : "",
            markerPosition: {
                lat: latValue,
                lng: lngValue,
            },
            mapPosition: {
                lat: latValue,
                lng: lngValue,
            },
        });

        console.log(this.state.mapPosition.lat);
        console.log(this.state.mapPosition.lng);
    };

    addButtonClicked = () => {
        console.log(this.state.mapPosition.lat);
        console.log(this.state.mapPosition.lng);

        this.props.addLocation({
            name: this.state.address,
            latitude: this.state.mapPosition.lat,
            longitude: this.state.mapPosition.lng,
        });

        console.log(this.props.location);
    };

    render() {
        const AsyncMap = withScriptjs(
            withGoogleMap((props) => (
                <GoogleMap
                    google={this.props.google}
                    defaultZoom={this.props.zoom}
                    defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
                >
                    {/* InfoWindow on top of marker */}
                    <InfoWindow
                        onClose={this.onInfoWindowClose}
                        position={{ lat: this.state.markerPosition.lat + 0.002, lng: this.state.markerPosition.lng }}
                    >
                        <div>
                            <span style={{ padding: 0, margin: 0 }}>{this.state.address}</span>
                        </div>
                    </InfoWindow>
                    {/*Marker*/}
                    <Marker
                        google={this.props.google}
                        draggable={true}
                        onDragEnd={this.onMarkerDragEnd}
                        position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
                    />
                    <Marker />
                    {/* For Auto complete Search Box */}
                    <Autocomplete
                        style={{
                            width: "75%",
                            height: "40px",
                            paddingLeft: "5%",
                            margin: "10px 10%",
                            alignItems: "center",
                        }}
                        onPlaceSelected={this.onPlaceSelected}
                        types={["(regions)"]}
                    />
                    <Button
                        variant="contained"
                        onClick={this.addButtonClicked}
                        style={{
                            backgroundColor: "teal",
                            color: "white",
                            width: "80%",
                            height: "40px",
                            margin: "10px 10%",
                            alignItems: "center",
                         }}
                    >
                        Add Location to Journey
                    </Button>
                </GoogleMap>
            )),
        );
        let map;
        if (this.props.center.lat !== undefined) {
            map = (
                <AsyncMap
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: this.props.height, width:this.props.width, display:"grid", gridTemplateRows:"90% 10%" }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            );
        } else {
            map = <div style={{ height: this.props.height, width:this.props.width }} />;
        }
        return map;
    }
}

function mapStateToProps(state) {
    return {
        location: state.location,
    };
}

const mapDispatchToProps = {
    addLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
