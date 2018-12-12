import React, { Component } from "react";
import { connect } from "react-redux";

class AdminArea extends Component {
  componentWillMount = () => {
    if (!this.props.admin) {
      this.props.history.push("/dashboard");
    }
  };

  render() {
    return (
      <div>
        <h1>Admin Area</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  admin: state.auth.user.admin
});

export default connect(mapStateToProps)(AdminArea);
