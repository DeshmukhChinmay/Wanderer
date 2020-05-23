import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { useDispatch } from "react-redux";
import { fetchUser } from "./actions/userActions";
import Header from "./components/Header";
import HomePage from "./components/pages/homepage/HomePage";
import LandingPage from "./components/pages/loginpage/LandingPage";
import JourneyNew from "./components/pages/journeyCreation/JourneyNew";
import JourneyPage from "./components/pages/journeypage/JourneyPage";

const Home = () => <HomePage></HomePage>;
const Landing = () => <LandingPage></LandingPage>;
const CreateJourney = () => <JourneyNew></JourneyNew>;
const JourneyView = () => <JourneyPage></JourneyPage>;

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
                        <Route exact path="/" component={Landing}></Route>
                        <Route exact path="/home" component={Home}></Route>
                        <Route exact path="/journey/new" component={CreateJourney}></Route>
                        <Route path="/journey-view/:id" component={JourneyView}></Route>
                    </Switch>                    
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;
