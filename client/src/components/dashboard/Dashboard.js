import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "./../../actions/authActions";

import { Typography, Button } from "@material-ui/core";

import "./dashboard.scss";

class Dashboard extends Component {
  onlogOut(e) {
    e.preventDefault();
    this.props.logoutUser();
  }
  render() {
    const { name } = this.props.auth.user;

    return (
      <div className="dashboard_container">
        <Button
          variant="raised"
          color="secondary"
          className="logout"
          onClick={this.onlogOut.bind(this)}
        >
          LOGOUT
        </Button>
        <Typography variant="headline" gutterBottom>
          Welcome {name}
        </Typography>
        <Typography variant="display4" className="center_text">
          Dashboard
        </Typography>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
