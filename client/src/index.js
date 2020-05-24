import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import App from "./App";
import reducers from "./reducers";

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
document.body.style.margin = "0";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector("#root"),
);
