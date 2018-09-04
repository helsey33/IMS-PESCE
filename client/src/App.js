import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { createBrowserHistory } from "history";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import "./components/mt-dashboard/assets/css/material-dashboard-react.css?v=1.4.1";
import PrivateRoute from "./components/common/PrivateRoute";

import Landing from "./components/auth/Landing";
import indexRoutes from "./components/mt-dashboard/routes";

//Check for token
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //LogOut User
    store.dispatch(logoutUser());
    //Redirect to login
    window.location.href = "/home";
  }
}

const theme = createMuiTheme({
  palette: {
    primary: { main: "#9b49af" }
  }
});

const hist = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
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
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
