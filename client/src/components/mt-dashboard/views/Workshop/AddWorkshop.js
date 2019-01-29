import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addWorkshopDetails } from "../../../../actions/workshopActions";
import moment from "moment";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import {
  TextField,
  FormControl,
  MenuItem,
  Select,
  InputLabel
} from "@material-ui/core";
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
  },
  wTypeStyle: {
    width: "100%"
  }
};

class AddWorkshop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wType: "Attended",
      title: "",
      start_date: moment().format("YYYY-MM-DD"),
      end_date: moment().format("YYYY-MM-DD"),
      organized_by: "",
      target_audience: "Faculty",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

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
    const workshopDetails = {
      wType: this.state.wType,
      title: this.state.title,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
      organized_by: this.state.organized_by,
      target_audience: this.state.target_audience
    };

    this.props.addWorkshopDetails(workshopDetails, this.props.history);
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
                <h4 className={classes.cardTitleWhite}>Workshop</h4>
                <p className={classes.cardCategoryWhite}>
                  Add Workshop details
                </p>
              </CardHeader>
              <CardBody>
                <form onSubmit={this.onSubmit} className="reg_form">
                  <GridContainer>
                    <GridItem md={3}>
                      <FormControl
                        className={`reg_form__child ${classes.wTypeStyle}`}
                      >
                        <InputLabel html-for="wType">
                          Conference Type
                        </InputLabel>
                        <Select
                          className={classes.wTypeStyle}
                          value={this.state.wType}
                          onChange={this.onChange}
                          autoWidth
                          inputProps={{
                            name: "wType",
                            id: "wType"
                          }}
                        >
                          <MenuItem value="Attended">Attended</MenuItem>
                          <MenuItem value="Conducted">Conducted</MenuItem>
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem md={9}>
                      <TextField
                        label="Title of Workshop"
                        value={this.state.title}
                        onChange={this.onChange}
                        fullWidth
                        name="title"
                        className="reg_form__child"
                        error={!!errors.title}
                        helperText={errors.title}
                      />
                    </GridItem>
                  </GridContainer>

                  <GridContainer>
                    <GridItem md={6}>
                      <TextField
                        label="Start Date"
                        name="start_date"
                        value={this.state.start_date}
                        onChange={this.onChange}
                        fullWidth
                        className="reg_form__child"
                        type="date"
                        error={!!errors.start_date}
                        helperText={
                          errors.start_date || "Date format : mm/dd/yyyy"
                        }
                      />
                    </GridItem>
                    <GridItem md={6}>
                      <TextField
                        label="End Date"
                        value={this.state.end_date}
                        onChange={this.onChange}
                        fullWidth
                        name="end_date"
                        className="reg_form__child"
                        type="date"
                        error={!!errors.end_date}
                        helperText={
                          errors.end_date || "Date format : mm/dd/yyyy"
                        }
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem md={12}>
                      <TextField
                        label="Organized By"
                        name="organized_by"
                        value={this.state.organized_by}
                        onChange={this.onChange}
                        fullWidth
                        className="reg_form__child"
                        error={!!errors.organized_by}
                        helperText={errors.organized_by}
                      />
                    </GridItem>
                    {this.state.wType === "Conducted" && (
                      <GridItem md={3}>
                        <FormControl
                          className={`reg_form__child ${classes.wTypeStyle}`}
                        >
                          <InputLabel html-for="target_audience">
                            Target Audience
                          </InputLabel>
                          <Select
                            className={classes.wTypeStyle}
                            value={this.state.target_audience}
                            onChange={this.onChange}
                            autoWidth
                            inputProps={{
                              name: "target_audience",
                              id: "target_audience"
                            }}
                          >
                            <MenuItem value="Faculty">Faculty</MenuItem>
                            <MenuItem value="Students">Students</MenuItem>
                          </Select>
                        </FormControl>
                      </GridItem>
                    )}
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
  errors: state.errors
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { addWorkshopDetails }
  )(withRouter(AddWorkshop))
);
