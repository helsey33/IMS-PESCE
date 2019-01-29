import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addConferenceDetails } from "../../../../actions/conferenceActions";
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
  cTypeStyle: {
    width: "100%"
  }
};

class AddConference extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cType: "National",
      paperTitle: "",
      authors: "",
      conferenceTitle: "",
      organizedBy: "",
      conferenceDate: "",
      isbnNo: "",
      publisher: "IEEE",
      link: "",
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
    const conferenceDetails = {
      cType: this.state.cType,
      paperTitle: this.state.paperTitle,
      authors: this.state.authors,
      conferenceTitle: this.state.conferenceTitle,
      organizedBy: this.state.organizedBy,
      conferenceDate: this.state.conferenceDate,
      isbnNo: this.state.isbnNo,
      publisher: this.state.publisher,
      link: this.state.link
    };

    this.props.addConferenceDetails(conferenceDetails, this.props.history);
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
                <h4 className={classes.cardTitleWhite}>Conference</h4>
                <p className={classes.cardCategoryWhite}>
                  Add conference details
                </p>
              </CardHeader>
              <CardBody>
                <form onSubmit={this.onSubmit} className="reg_form">
                  <GridContainer>
                    <GridItem md={2}>
                      <FormControl
                        className={`reg_form__child ${classes.cTypeStyle}`}
                      >
                        <InputLabel html-for="cType">
                          Conference Type
                        </InputLabel>
                        <Select
                          className={classes.cTypeStyle}
                          value={this.state.cType}
                          onChange={this.onChange}
                          autoWidth
                          inputProps={{
                            name: "cType",
                            id: "cType"
                          }}
                        >
                          <MenuItem value="National">National</MenuItem>
                          <MenuItem value="International">
                            International
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </GridItem>

                    <GridItem md={10}>
                      <TextField
                        label="Paper Title"
                        value={this.state.paperTitle}
                        onChange={this.onChange}
                        fullWidth
                        name="paperTitle"
                        className="reg_form__child"
                        error={!!errors.paperTitle}
                        helperText={errors.paperTitle}
                      />
                    </GridItem>
                  </GridContainer>

                  <GridContainer>
                    <GridItem md={6}>
                      <TextField
                        label="Authors"
                        name="authors"
                        value={this.state.authors}
                        onChange={this.onChange}
                        fullWidth
                        className="reg_form__child"
                        error={!!errors.authors}
                        helperText={
                          errors.authors || "Use comma seperated values"
                        }
                      />
                    </GridItem>
                    <GridItem md={6}>
                      <TextField
                        label="Conference Title"
                        value={this.state.conferenceTitle}
                        onChange={this.onChange}
                        fullWidth
                        name="conferenceTitle"
                        className="reg_form__child"
                        error={!!errors.conferenceTitle}
                        helperText={errors.conferenceTitle}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem md={8}>
                      <TextField
                        label="Organized By"
                        name="organizedBy"
                        value={this.state.organizedBy}
                        onChange={this.onChange}
                        fullWidth
                        className="reg_form__child"
                        error={!!errors.organizedBy}
                        helperText={errors.organizedBy}
                      />
                    </GridItem>

                    <GridItem md={2}>
                      <TextField
                        label="Conference Date"
                        value={this.state.conferenceDate}
                        placeholder="mm/yyyy"
                        onChange={this.onChange}
                        fullWidth
                        name="conferenceDate"
                        className="reg_form__child"
                        error={!!errors.conferenceDate}
                        helperText={errors.conferenceDate}
                      />
                    </GridItem>
                    <GridItem md={2}>
                      <TextField
                        label="ISBN Number"
                        value={this.state.isbnNo}
                        onChange={this.onChange}
                        fullWidth
                        name="isbnNo"
                        className="reg_form__child"
                        error={!!errors.isbnNo}
                        helperText={errors.isbnNo}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem md={4}>
                      <FormControl
                        className={`reg_form__child ${classes.cTypeStyle}`}
                      >
                        <InputLabel html-for="publisher">Publisher</InputLabel>
                        <Select
                          className={classes.cTypeStyle}
                          value={this.state.publisher}
                          onChange={this.onChange}
                          autoWidth
                          inputProps={{
                            name: "publisher",
                            id: "publisher"
                          }}
                        >
                          <MenuItem value="IEEE">IEEE</MenuItem>
                          <MenuItem value="Springer">Springer</MenuItem>
                          <MenuItem value="ACM">ACM</MenuItem>
                          <MenuItem value="Others">Others</MenuItem>
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem md={8}>
                      <TextField
                        label="Online link"
                        value={this.state.link}
                        onChange={this.onChange}
                        fullWidth
                        name="link"
                        className="reg_form__child"
                        helperText="Optional"
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
  errors: state.errors
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { addConferenceDetails }
  )(withRouter(AddConference))
);
