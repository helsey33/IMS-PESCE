import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  createProfile,
  getCurrentProfile
} from "../../../../actions/profileActions";
import moment from "moment";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { TextField } from "@material-ui/core";
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
      designation: "",
      highest_qualification: "",
      date_of_birth: moment().format("YYYY-MM-DD"),
      date_of_join_post: moment().format("YYYY-MM-DD"),
      date_of_join_institute: moment().format("YYYY-MM-DD"),
      areas_of_interest_and_practical_experience: "",
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
    const { profile } = nextProps.profile;
    if (Object.keys(profile).length > 0) {
      this.setState({
        designation: profile.designation,
        highest_qualification: profile.highest_qualification,
        date_of_birth: moment(profile.date_of_birth).format("YYYY-MM-DD"),
        date_of_join_post: moment(profile.date_of_join_post).format(
          "YYYY-MM-DD"
        ),
        date_of_join_institute: moment(profile.date_of_join_institute).format(
          "YYYY-MM-DD"
        ),
        areas_of_interest_and_practical_experience: profile.areas_of_interest_and_practical_experience.join(
          ","
        )
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value, errors: {} });
  }

  onSubmit(e) {
    e.preventDefault();
    const profileData = {
      designation: this.state.designation,
      highest_qualification: this.state.highest_qualification,
      date_of_birth: this.state.date_of_birth,
      date_of_join_post: this.state.date_of_join_post,
      date_of_join_institute: this.state.date_of_join_institute,
      areas_of_interest_and_practical_experience: this.state
        .areas_of_interest_and_practical_experience
    };

    this.props.createProfile(profileData, this.props.history);
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
                <h4 className={classes.cardTitleWhite}>Profile Form</h4>
                <p className={classes.cardCategoryWhite}>
                  Create or Edit your profile
                </p>
              </CardHeader>
              <CardBody>
                <form onSubmit={this.onSubmit} className="reg_form">
                  <GridContainer>
                    <GridItem md={6}>
                      <TextField
                        autoComplete="off"
                        label="Designation"
                        name="designation"
                        value={this.state.designation}
                        onChange={this.onChange}
                        style={{ color: "red" }}
                        fullWidth
                        className="reg_form__child"
                        error={!!errors.designation}
                        helperText={errors.designation}
                      />
                    </GridItem>

                    <GridItem md={6}>
                      <TextField
                        label="Highest Qualification"
                        value={this.state.highest_qualification}
                        onChange={this.onChange}
                        fullWidth
                        name="highest_qualification"
                        className="reg_form__child"
                        error={!!errors.highest_qualification}
                        helperText={errors.highest_qualification}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem md={4}>
                      <TextField
                        label="Date of birth"
                        name="date_of_birth"
                        value={this.state.date_of_birth}
                        onChange={this.onChange}
                        fullWidth
                        className="reg_form__child"
                        type="date"
                        error={!!errors.date_of_birth}
                        helperText={
                          errors.date_of_birth || "Date format : mm/dd/yyyy"
                        }
                      />
                    </GridItem>

                    <GridItem md={4}>
                      <TextField
                        label="Date of joining the post"
                        value={this.state.date_of_join_post}
                        onChange={this.onChange}
                        fullWidth
                        name="date_of_join_post"
                        className="reg_form__child"
                        type="date"
                        error={!!errors.date_of_join_post}
                        helperText={
                          errors.date_of_join_post || "Date format : mm/dd/yyyy"
                        }
                      />
                    </GridItem>
                    <GridItem md={4}>
                      <TextField
                        label="Date of joining the institute"
                        value={this.state.date_of_join_institute}
                        onChange={this.onChange}
                        fullWidth
                        name="date_of_join_institute"
                        className="reg_form__child"
                        type="date"
                        error={!!errors.date_of_join_institute}
                        helperText={
                          errors.date_of_join_institute ||
                          "Date format : mm/dd/yyyy"
                        }
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem md={12}>
                      <TextField
                        label="Areas of interest and practical experience"
                        value={
                          this.state.areas_of_interest_and_practical_experience
                        }
                        onChange={this.onChange}
                        fullWidth
                        name="areas_of_interest_and_practical_experience"
                        className="reg_form__child"
                        helperText="Use comma seperated values (field not required)"
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
    { createProfile, getCurrentProfile }
  )(withRouter(CreateProfile))
);
