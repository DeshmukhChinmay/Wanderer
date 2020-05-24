import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { Grid } from "@material-ui/core";

/**
 * Render the content of the header depending on whether the user
 * is logged in or not.
 */
const renderHeaderContent = (user) => {
    switch (user) {
        case null:
            return;
        case false:
            return (
                <Button variant="contained" color="primary" href="/auth/google">
                    Sign in With Google
                </Button>
            );
        default:
            return (
                <div>
                    <Grid container alignItems="center" justify="space-between" spacing={3}>
                        <Grid item>
                            <Avatar alt={user.name} src={user.profilePic}></Avatar>
                        </Grid>
                        <Grid item>
                            <Typography color="inherit">{user.name}</Typography>{" "}
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="secondary" href="/auth/logout">
                                Log out
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            );
    }
};

/**
 * Component for displaying the header for the web application.
 */
const Header = () => {
    const user = useSelector((state) => state.user);

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Grid container spacing={10} alignItems="center" justify="space-between">
                    <Grid item>
                        <Typography variant="h6" color="inherit">
                            <Link
                                to={user ? "/home" : "/"}
                                style={{ textDecoration: "none", color: "white", fontSize: "5vh" }}
                            >
                                Wanderer
                            </Link>
                        </Typography>
                    </Grid>
                    <Grid item>{renderHeaderContent(user)}</Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
