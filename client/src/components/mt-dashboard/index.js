import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "./assets/css/material-dashboard-react.css?v=1.4.1";

import indexRoutes from "./routes";

const hist = createBrowserHistory();

const MtDashboard = () => {
  return (
    <Router history={hist}>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return (
            <Route path={prop.path} component={prop.component} key={key} />
          );
        })}
      </Switch>
    </Router>
  );
};

export default MtDashboard;
