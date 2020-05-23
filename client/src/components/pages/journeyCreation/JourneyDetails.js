import "date-fns";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import ListSubheader from "@material-ui/core/ListSubheader";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { removeLocation } from "./../../../actions/locationActions";
import axios from "axios";

function JourneyDetails() {
    const locations = useSelector((store) => store.location);
    const dispatch = useDispatch();

    const history = useHistory();

    const useStyles = makeStyles((theme) => ({
        container: {
            display: "grid",
            alignItems: "center",
            padding: "5px 20px 5px 5px",
            width: "90%",
            gridTemplateRows: "1fr 1fr 1fr 2fr 1fr 10px",
        },
        dates: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap: "20px",
        },
        locations: {
            position: "relative",
            overflow: "auto",
            maxHeight: 180,
            height: 180,
            border: "1px solid #ccc",
            marginTop: "16px",
        },
    }));

    const [name, setName] = React.useState();
    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const [startDate, setStartDate] = React.useState(new Date());
    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const [endDate, setEndDate] = React.useState(new Date());
    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const [notes, setNotes] = React.useState();
    const handleNotesChange = (event) => {
        setNotes(event.target.value);
    };

    const clickCompleteJourney = async () => {
        const parameters = {
            name: name,
            notes: notes,
            startDate: startDate,
            endDate: endDate,
            locations: locations,
        };
        console.log(parameters);
        await axios({
            method: "post",
            url: "/journey/create",
            data: parameters,
        });
        history.push("/home");
    };

    const deleteLocation = (location) => {
        dispatch(removeLocation(location));
    };

    const isSubmittable = name;

    return (
        <div className={useStyles().container}>
            <Typography variant="h4">Journey Details</Typography>
            <TextField
                required
                id="outlined-name"
                label="Journey Name"
                value={name}
                onChange={handleNameChange}
                variant="outlined"
            />
            <div className={useStyles().dates}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        autoOk={true}
                        minDate={new Date()}
                        minDateMessage="Date must be after todays date"
                        invalidDateMessage="Date must be after todays date"
                        margin="normal"
                        id="start-date"
                        label="Start Date"
                        value={startDate}
                        onChange={handleStartDateChange}
                        KeyboardButtonProps={{
                            "aria-label": "change date",
                        }}
                    />
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        autoOk={true}
                        minDate={startDate}
                        minDateMessage="Date must be after todays date"
                        invalidDateMessage="Date must be after todays date"
                        margin="normal"
                        id="end-date"
                        label="End Date"
                        value={endDate}
                        onChange={handleEndDateChange}
                        KeyboardButtonProps={{
                            "aria-label": "change date",
                        }}
                    />
                </MuiPickersUtilsProvider>
            </div>
            <TextField
                id="outlined-multiline-static"
                label="Journey Notes"
                multiline
                rows={4}
                variant="outlined"
                value={notes}
                onChange={handleNotesChange}
            />
            <Button
                disabled={!isSubmittable}
                variant="contained"
                color="primary"
                component="span"
                onClick={clickCompleteJourney}
            >
                Complete Journey
            </Button>
            <ListSubheader>Locations</ListSubheader>
            <List dense className={useStyles().locations}>
                {locations &&
                    locations.map((location, index) => (
                        <ListItem key={index}>
                            <ListItemText
                                primary={location.name}
                                secondary={location.latitude + ", " + location.longitude}
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete" onClick={(e) => deleteLocation(location)}>
                                    <ClearIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
            </List>
        </div>
    );
}

export default JourneyDetails;
