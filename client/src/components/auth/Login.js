import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "./../../actions/authActions";

import { TextField, Button } from "@material-ui/core";

import "./landing.scss";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(newUser);
  }
  render() {
    const { errors } = this.state;
    return (
      <form onSubmit={this.onSubmit} className="reg_form">
        <TextField
          autoComplete="off"
          label="Email"
          type="email"
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          fullWidth
          error={!!errors.email}
          helperText={errors.email}
          className="reg_form__child"
        />
        <TextField
          label="Password"
          value={this.state.password}
          onChange={this.onChange}
          fullWidth
          type="password"
          name="password"
          error={!!errors.password}
          helperText={errors.password}
          className="reg_form__child"
        />

        <Button
          variant="extendedFab"
          color="primary"
          type="submit"
          className="reg_form__action"
        >
          LOGIN
        </Button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Register);
