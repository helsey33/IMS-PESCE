import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "./../../actions/authActions";

import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel
} from "@material-ui/core";

import "./landing.scss";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      keyword: "",
      checked: false,
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
      const { errors } = nextProps;
      console.log(errors);
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          ...errors
        }
      }));
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    let newUser;
    if (this.state.checked) {
      if (this.state.keyword.trim() === "") {
        this.setState({
          errors: {
            keyword: "Secret keyword required"
          }
        });
        return;
      } else if (this.state.keyword.toLowerCase() !== "immigrant") {
        this.setState({
          errors: {
            keyword: "Wrong keyword"
          }
        });
        return;
      } else {
        newUser = {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          password2: this.state.password2,
          admin: true
        };
        this.props.registerUser(newUser);
        return;
      }
    }

    newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      admin: false
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
        {this.state.checked && (
          <TextField
            label="Secret keyword"
            value={this.state.keyword}
            onChange={this.onChange}
            fullWidth
            name="keyword"
            error={!!errors.keyword}
            helperText={errors.keyword}
            className="reg_form__child"
          />
        )}
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.checked}
              onChange={e => this.setState({ checked: e.target.checked })}
            />
          }
          label="Sign Up as Admin"
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
