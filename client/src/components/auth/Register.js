import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "./../../actions/authActions";

import { TextField, Button } from "@material-ui/core";

import "./landing.scss";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
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
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser);
  }
  render() {
    const { errors } = this.state;
    return (
      <form onSubmit={this.onSubmit} className="reg_form">
        <TextField
          autoComplete="off"
          label="Name"
          name="name"
          value={this.state.name}
          onChange={this.onChange}
          fullWidth
          error={!!errors.name}
          helperText={errors.name}
          className="reg_form__child"
        />
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
        <TextField
          label="Confirm Password"
          value={this.state.password2}
          onChange={this.onChange}
          fullWidth
          type="password"
          name="password2"
          error={!!errors.password2}
          helperText={errors.password2}
          className="reg_form__child"
        />
        <Button
          variant="extendedFab"
          color="primary"
          type="submit"
          className="reg_form__action"
        >
          SIGN UP
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
  { registerUser }
)(Register);
