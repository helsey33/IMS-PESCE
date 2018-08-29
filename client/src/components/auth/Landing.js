import React, { Component } from "react";
import { Tabs, Tab, Typography } from "@material-ui/core";

import Register from "./Register";
import Login from "./Login";

import "./landing.scss";

class Landing extends Component {
  constructor() {
    super();

    this.state = {
      value: 0
    };
    this.onTabChange = this.onTabChange.bind(this);
  }

  onTabChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return (
      <div className="landing">
        <div className="container">
          <div className="form_container">
            <div className="wrapper">
              <div className="form_container__header">
                <Tabs
                  value={value}
                  onChange={this.onTabChange}
                  indicatorColor="primary"
                  textColor="primary"
                >
                  <Tab label="Login" />
                  <Typography variant="subheading" className="or">
                    OR
                  </Typography>
                  <Tab label="Sign Up" />
                </Tabs>
              </div>
              <div className="form-container__item">
                {value === 0 && <Login history={this.props.history} />}
                {value === 2 && <Register history={this.props.history} />}
              </div>
            </div>
          </div>

          <div className="right_image" />
        </div>
      </div>
    );
  }
}

export default Landing;
