import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  addProject,
  getCurrentProfile
} from "../../../../actions/profileActions";
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
      title: "",
      year: "",
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
      title: this.state.title,
      year: this.state.year
    };

    this.props.addProject(expDetails, this.props.history);
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
                <h4 className={classes.cardTitleWhite}>Project at UG and PG</h4>
                <p className={classes.cardCategoryWhite}>Add Project details</p>
              </CardHeader>
              <CardBody>
                <form onSubmit={this.onSubmit} className="reg_form">
                  <GridContainer>
                    <GridItem md={12}>
                      <TextField
                        autoComplete="off"
                        label="Title"
                        name="title"
                        value={this.state.title}
                        onChange={this.onChange}
                        style={{ color: "red" }}
                        fullWidth
                        className="reg_form__child"
                        error={!!errors.title}
                        helperText={errors.title}
                      />
                    </GridItem>

                    <GridItem md={6}>
                      <TextField
                        label="Year"
                        value={this.state.year}
                        onChange={this.onChange}
                        fullWidth
                        name="year"
                        className="reg_form__child"
                        error={!!errors.year}
                        helperText={errors.year}
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
    { addProject, getCurrentProfile }
  )(withRouter(CreateProfile))
);
