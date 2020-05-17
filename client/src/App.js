import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { useDispatch } from "react-redux";
import { fetchUser } from "./actions/userActions";
import Header from "./components/Header";
import HomePage from "./components/pages/homepage/HomePage";
import LandingPage from "./components/pages/loginpage/LandingPage";

const Login = () => <HomePage></HomePage>;
const Landing = () => <LandingPage></LandingPage>;

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
                    <Route exact path="/" component={Landing}></Route>
                    <Route exact path="/home" component={Login}></Route>
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;
