import React from "react";
import { connect } from "react-redux";
import { logoutUser } from "./../../../../actions/authActions";
// @material-ui/core components
import { Typography, Button } from "@material-ui/core";

class HeaderLinks extends React.Component {
  onlogOut(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { name } = this.props.auth.user;
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography
          variant="subheading"
          gutterBottom
          style={{ marginRight: "20px" }}
        >
          {name}
        </Typography>
        <Button
          variant="raised"
          color="secondary"
          className="logout"
          onClick={this.onlogOut.bind(this)}
        >
          LOGOUT
        </Button>
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
)(HeaderLinks);
