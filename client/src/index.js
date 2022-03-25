import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import user from "./reducers/loginReducer";
import adminVacations from "./reducers/vacationsReducer";
import userVacations from "./reducers/followReducer";
import postVacation from "./reducers/postVacationReducer";
import register from "./reducers/registerReducer";
import loginMessage from "./reducers/loginMessageReducer";
import editVacationReducer from "./reducers/editVacationReducer";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

let rootReducer = combineReducers({
  user,
  adminVacations,
  register,
  userVacations,
  editVacationReducer,
  postVacation,
  loginMessage,
});
let store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
