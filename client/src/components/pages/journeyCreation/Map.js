import React, { Component } from "react";
import { connect } from "react-redux";
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from "react-google-autocomplete";
import { Button } from "@material-ui/core";
import { addLocation } from "./../../../actions/locationActions";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
Geocode.enableDebug();

/**
 * Renders the map on the website along with providing a search box to
 * search for the locations.
 */
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

    // After the component is loaded, get the actual address of the co-ordinates that
    // are stored in the state of the object
    componentDidMount() {
        Geocode.fromLatLng(this.state.mapPosition.lat, this.state.mapPosition.lng).then((response) => {
            const address = response.results[0].formatted_address;
            this.setState({
                address: address ? address : "",
            });
        });
    }

    // Preventing the re-render after every call made to the Google Maps API.
    // Page should only update if the state is changed.
    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.markerPosition.lat !== this.props.center.lat || this.state.address !== nextState.address) {
            return true;
        } else if (this.props.center.lat === nextProps.center.lat) {
            return false;
        }
    }

    // Update the state with the current co-ordinates of the marker
    onMarkerDragEnd = (event) => {
        let newLatitude = event.latLng.lat();
        let newLongitude = event.latLng.lng();

        Geocode.fromLatLng(newLatitude, newLongitude).then((response) => {
            const address = response.results[0].formatted_address;
            this.setState({
                address: address ? address : "",
                markerPosition: {
                    lat: newLatitude,
                    lng: newLongitude,
                },
                mapPosition: {
                    lat: newLatitude,
                    lng: newLongitude,
                },
            });
        });
    };

    // Update the state with the co-ordinates of the selected place
    onPlaceSelected = (place) => {
        const address = place.formatted_address;
        const latitudeValue = place.geometry.location.lat();
        const longitudeValue = place.geometry.location.lng();

        this.setState({
            address: address ? address : "",
            markerPosition: {
                lat: latitudeValue,
                lng: longitudeValue,
            },
            mapPosition: {
                lat: latitudeValue,
                lng: longitudeValue,
            },
        });
    };

    // Add the location from the objects state to the redux store state
    addButtonClicked = () => {
        this.props.addLocation({
            name: this.state.address,
            latitude: this.state.mapPosition.lat,
            longitude: this.state.mapPosition.lng,
        });
    };

    render() {
        const GoogleMapComponent = withScriptjs(
            withGoogleMap((props) => (
                <GoogleMap
                    google={this.props.google}
                    defaultZoom={this.props.zoom}
                    defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
                >
                    <InfoWindow
                        onClose={this.onInfoWindowClose}
                        position={{ lat: this.state.markerPosition.lat + 0.002, lng: this.state.markerPosition.lng }}
                    >
                        <div>
                            <span style={{ padding: 0, margin: 0 }}>{this.state.address}</span>
                        </div>
                    </InfoWindow>
                    <Marker
                        google={this.props.google}
                        draggable={true}
                        onDragEnd={this.onMarkerDragEnd}
                        position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
                    />
                    <Marker />
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

        map = (
            <GoogleMapComponent
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={
                    <div
                        style={{
                            height: this.props.height,
                            width: this.props.width,
                            display: "grid",
                            gridTemplateRows: "90% 10%",
                        }}
                    />
                }
                mapElement={<div style={{ height: `100%` }} />}
            />
        );

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
