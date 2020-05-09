import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { useDispatch } from "react-redux";
import { fetchUser } from "./actions/userActions";
import Header from "./components/Header";
import HomePage from "./components/pages/homepage/HomePage";

const Login = () => <HomePage></HomePage>;

const App = () => {
    const dispatch = useDispatch();

    // Fetch the user data once the app is ready to the loaded
    useEffect(() => {
        dispatch(fetchUser());
    });

    return (
        <div>
            <BrowserRouter>
                <div>
                    <Header />
                    <Route exact path="/" component={Login}></Route>
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;
