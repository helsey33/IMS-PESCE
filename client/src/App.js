import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";
import { createBrowserHistory } from "history";

import "./components/mt-dashboard/assets/css/material-dashboard-react.css?v=1.4.1";
import PrivateRoute from "./components/common/PrivateRoute";

import Landing from "./components/auth/Landing";
// import Dashboard from "./components/mt-dashboard";
import indexRoutes from "./components/mt-dashboard/routes";

//Check for token
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
}

const hist = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={hist}>
          <div className="app">
            <Route path="/home" exact component={Landing} />
            <Switch>
              {indexRoutes.map((prop, key) => {
                return (
                  <PrivateRoute
                    path={prop.path}
                    component={prop.component}
                    key={key}
                    exact={prop.exact}
                  />
                );
              })}
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
