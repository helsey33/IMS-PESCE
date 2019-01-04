import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./adminStyle.scss";

class AdminArea extends Component {
  componentWillMount = () => {
    if (!this.props.admin) {
      this.props.history.push("/dashboard");
    }
  };

  render() {
    return (
      <div>
        <Link to="allprofiles">
          <div className=" outer_box">
            <div className="profile">
              <div className="overlay">
                <header>Profiles</header>
              </div>
            </div>
          </div>
        </Link>
        <Link to="allconference">
          <div className=" outer_box">
            <div className="conference">
              <div className="overlay">
                <header>Conferences</header>
              </div>
            </div>
          </div>
        </Link>
        <Link to="alljournal">
          <div className=" outer_box">
            <div className="journal">
              <div className="overlay">
                <header>Journals</header>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  admin: state.auth.user.admin
});

export default connect(mapStateToProps)(AdminArea);
