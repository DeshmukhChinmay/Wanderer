import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUser } from "./actions/userActions";
import Header from "./components/Header";
import HomePage from "./components/pages/homepage/HomePage";
import LandingPage from "./components/pages/loginpage/LandingPage";
import JourneyNew from "./components/pages/journeyCreation/JourneyNew";
import JourneyPage from "./components/pages/journeypage/JourneyPage";

const App = () => {
    const dispatch = useDispatch();

    // Fetch the user data once the app is ready to the loaded
    useEffect(() => {
        dispatch(fetchUser());
        document.title = "Wanderer";
    });

    return (
        <div>
            <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={LandingPage}></Route>
                        <Route exact path="/home" component={HomePage}></Route>
                        <Route exact path="/journey-create" component={JourneyNew}></Route>
                        <Route path="/journey-view/:id" component={JourneyPage}></Route>
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;
