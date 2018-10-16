import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addJournalDetails } from "../../../../actions/journalActions";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import {
  TextField,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Checkbox,
  FormLabel,
  FormGroup,
  FormControlLabel
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

class AddJournal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jType: "National",
      paperTitle: "",
      authors: "",
      jTitle: "",
      volume: "",
      issue: "",
      pageNos: "",
      publishDate: "",
      issnNo: "",
      publisher: "",
      onlineLink: "",
      indexedBy: {
        webOfScience: false,
        scopus: false,
        indianCitationIndex: false
      },
      ugcApproved: "Yes",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value, errors: {} });
  }

  onCheck = name => e => {
    this.setState({
      indexedBy: {
        ...this.state.indexedBy,
        [name]: e.target.checked
      }
    });
  };

  onSubmit(e) {
    e.preventDefault();
    const journalDetails = {
      jType: this.state.jType,
      paperTitle: this.state.paperTitle,
      authors: this.state.authors,
      jTitle: this.state.jTitle,
      volume: this.state.volume,
      issue: this.state.issue,
      pageNos: this.state.pageNos,
      publishDate: this.state.publishDate,
      issnNo: this.state.issnNo,
      publisher: this.state.publisher,
      onlineLink: this.state.onlineLink,
      indexedBy: this.state.indexedBy,
      ugcApproved: this.state.ugcApproved
    };

    this.props.addJournalDetails(journalDetails, this.props.history);
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
                <h4 className={classes.cardTitleWhite}>Journal</h4>
                <p className={classes.cardCategoryWhite}>Add Journal details</p>
              </CardHeader>
              <CardBody>
                <form onSubmit={this.onSubmit} className="reg_form">
                  <GridContainer>
                    <GridItem md={2}>
                      <FormControl
                        className={`reg_form__child ${classes.cTypeStyle}`}
                      >
                        <InputLabel html-for="jType">Journal Type</InputLabel>
                        <Select
                          className={classes.cTypeStyle}
                          value={this.state.jType}
                          onChange={this.onChange}
                          autoWidth
                          inputProps={{
                            name: "jType",
                            id: "jType"
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
                        label="Journal Title"
                        value={this.state.jTitle}
                        onChange={this.onChange}
                        fullWidth
                        name="jTitle"
                        className="reg_form__child"
                        error={!!errors.jTitle}
                        helperText={errors.jTitle}
                      />
                    </GridItem>
                  </GridContainer>

                  <GridContainer>
                    <GridItem md={3}>
                      <TextField
                        label="Volume"
                        name="volume"
                        value={this.state.volume}
                        onChange={this.onChange}
                        fullWidth
                        className="reg_form__child"
                        error={!!errors.volume}
                        helperText={errors.volume}
                      />
                    </GridItem>

                    <GridItem md={3}>
                      <TextField
                        label="Issue"
                        value={this.state.issue}
                        onChange={this.onChange}
                        fullWidth
                        name="issue"
                        className="reg_form__child"
                        error={!!errors.issue}
                        helperText={errors.issue}
                      />
                    </GridItem>
                    <GridItem md={3}>
                      <TextField
                        label="Page Numbers"
                        value={this.state.pageNos}
                        onChange={this.onChange}
                        fullWidth
                        name="pageNos"
                        className="reg_form__child"
                        error={!!errors.pageNos}
                        helperText={errors.pageNos}
                      />
                    </GridItem>
                    <GridItem md={3}>
                      <TextField
                        label="Publish Date"
                        value={this.state.publishDate}
                        placeholder="mm/yyyy"
                        onChange={this.onChange}
                        fullWidth
                        name="publishDate"
                        className="reg_form__child"
                        error={!!errors.publishDate}
                        helperText={errors.publishDate}
                      />
                    </GridItem>
                  </GridContainer>

                  <GridContainer>
                    <GridItem md={2}>
                      <TextField
                        label="ISSN Number"
                        name="issnNo"
                        value={this.state.issnNo}
                        onChange={this.onChange}
                        fullWidth
                        className="reg_form__child"
                        error={!!errors.issnNo}
                        helperText={errors.issnNo}
                      />
                    </GridItem>
                    <GridItem md={8}>
                      <TextField
                        label="Publisher"
                        value={this.state.publisher}
                        onChange={this.onChange}
                        fullWidth
                        name="publisher"
                        className="reg_form__child"
                      />
                    </GridItem>
                    <GridItem md={2}>
                      <FormControl
                        className={`reg_form__child ${classes.cTypeStyle}`}
                      >
                        <InputLabel html-for="jType">UGC Approved</InputLabel>
                        <Select
                          className={classes.cTypeStyle}
                          value={this.state.ugcApproved}
                          onChange={this.onChange}
                          autoWidth
                          inputProps={{
                            name: "ugcApproved",
                            id: "ugcApproved"
                          }}
                        >
                          <MenuItem value="Yes">Yes</MenuItem>
                          <MenuItem value="No">No</MenuItem>
                        </Select>
                      </FormControl>
                    </GridItem>
                  </GridContainer>

                  <GridContainer>
                    <GridItem md={6}>
                      <TextField
                        label="Online Link"
                        name="onlineLink"
                        value={this.state.onlineLink}
                        onChange={this.onChange}
                        fullWidth
                        className="reg_form__child"
                        helperText="&nbsp;Optional"
                      />
                    </GridItem>
                    <GridItem md={6}>
                      <FormControl
                        className={`reg_form__child ${classes.cTypeStyle}`}
                      >
                        <FormLabel>Indexed By</FormLabel>
                        <FormGroup row>
                          <FormControlLabel
                            control={
                              <Checkbox
                                onChange={this.onCheck("webOfScience")}
                                checked={this.state.indexedBy.webOfScience}
                              />
                            }
                            label="Window of Science"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                onChange={this.onCheck("scopus")}
                                checked={this.state.indexedBy.scopus}
                              />
                            }
                            label="Scopus"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                onChange={this.onCheck("indianCitationIndex")}
                                checked={
                                  this.state.indexedBy.indianCitationIndex
                                }
                              />
                            }
                            label="Indian Citation Index"
                          />
                        </FormGroup>
                      </FormControl>
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
    { addJournalDetails }
  )(withRouter(AddJournal))
);
