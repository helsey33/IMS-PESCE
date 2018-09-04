import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from "moment";
import {
  addWorkExperience,
  getCurrentProfile
} from "../../../../actions/profileActions";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { TextField, Checkbox, FormControlLabel } from "@material-ui/core";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class CreateProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organisation: "",
      exp_designation: "",
      from: moment().format("YYYY-MM-DD"),
      to: moment().format("YYYY-MM-DD"),
      current: false,
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount = () => {
    this.props.getCurrentProfile();
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value, errors: {} });
  }

  onSubmit(e) {
    e.preventDefault();
    const expDetails = {
      organisation: this.state.organisation,
      exp_designation: this.state.exp_designation,
      from: this.state.from,
      to: this.state.current ? "current" : this.state.to
    };

    this.props.addWorkExperience(expDetails, this.props.history);
  }

  onCheck() {
    this.setState({
      current: !this.state.current
    });
  }

  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Work Experience</h4>
                <p className={classes.cardCategoryWhite}>
                  Add previous and present work experience
                </p>
              </CardHeader>
              <CardBody>
                <form onSubmit={this.onSubmit} className="reg_form">
                  <GridContainer>
                    <GridItem md={6}>
                      <TextField
                        autoComplete="off"
                        label="Organisation"
                        name="organisation"
                        value={this.state.organisation}
                        onChange={this.onChange}
                        style={{ color: "red" }}
                        fullWidth
                        className="reg_form__child"
                        error={!!errors.organisation}
                        helperText={errors.organisation}
                      />
                    </GridItem>

                    <GridItem md={6}>
                      <TextField
                        label="Designation"
                        value={this.state.exp_designation}
                        onChange={this.onChange}
                        fullWidth
                        name="exp_designation"
                        className="reg_form__child"
                        error={!!errors.exp_designation}
                        helperText={errors.exp_designation}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem md={4}>
                      <TextField
                        label="From"
                        name="from"
                        value={this.state.from}
                        onChange={this.onChange}
                        fullWidth
                        type="date"
                        className="reg_form__child"
                        error={!!errors.from}
                        helperText={errors.from || "Date format : mm/dd/yyyy"}
                      />
                    </GridItem>

                    <GridItem md={4}>
                      <TextField
                        label="To"
                        value={this.state.to}
                        onChange={this.onChange}
                        fullWidth
                        name="to"
                        className="reg_form__child"
                        type="date"
                        error={!!errors.to}
                        helperText={errors.to || "Date format : mm/dd/yyyy"}
                        disabled={this.state.current}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            checked={this.state.current}
                            value={this.state.current}
                            onChange={this.onCheck.bind(this)}
                          />
                        }
                        label="Currently Working"
                      />
                    </GridItem>
                  </GridContainer>
                  <Button
                    variant="extendedFab"
                    color="primary"
                    type="submit"
                    className="reg_form__child"
                  >
                    SUBMIT
                  </Button>
                </form>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { addWorkExperience, getCurrentProfile }
  )(withRouter(CreateProfile))
);
