import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import {
  getConference,
  deleteConferenceDetail
} from "../../../../actions/conferenceActions";
import Card from "../../components/Card/Card";
// import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  CircularProgress,
  Button,
  Tooltip,
  TextField,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  Dialog,
  DialogContent
} from "@material-ui/core";

const styles = {
  spinner: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontWeight: 400
  }
};

class Conference extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBy: "paperTitle",
      conferenceSet: [],
      open: false
    };
    this.searchByHandle = this.searchByHandle.bind(this);
    this.searchHandle = this.searchHandle.bind(this);
  }
  componentWillMount = () => {
    this.props.getConference();
  };

  deleteConferenceDetails = id => {
    this.props.deleteConferenceDetail(id);
  };

  onPaperUpload = (id, e) => {
    const fd = new FormData();
    fd.append("paper", e.target.files[0], e.target.files[0].name);
    axios
      .post(`/api/conference/uploadPaper/${id}`, fd)
      .then(res => {
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  downloadPaper(id) {
    axios.get(`/api/conference/downloadPaper/${id}`).then(res => {});
  }

  onCertUpload = (id, e) => {
    const fd = new FormData();
    fd.append("certificate", e.target.files[0], e.target.files[0].name);
    axios
      .post(`/api/conference/uploadCert/${id}`, fd)
      .then(res => {
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  searchByHandle(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.conference.conference) {
      this.setState({
        conferenceSet: newProps.conference.conference.conferenceData
      });
    }
  }

  searchHandle(e) {
    const searchTerm = e.target.value;
    const filter = this.state.searchBy;
    const filteredSet = this.props.conference.conference.conferenceData.filter(
      data => {
        return data[filter].toLowerCase().includes(searchTerm.toLowerCase());
      }
    );
    this.setState({
      conferenceSet: filteredSet
    });
  }

  render() {
    const { classes } = this.props;
    const { conference, loading } = this.props.conference;
    const { conferenceSet } = this.state;
    let conferenceContent;
    if (conference === null || loading) {
      conferenceContent = (
        <div className={classes.spinner}>
          <CircularProgress size={50} />
        </div>
      );
    } else if (Object.keys(conference).length > 0) {
      conferenceContent = (
        <div>
          <GridContainer>
            <GridItem md={12} sm={12}>
              <GridContainer>
                <GridItem>
                  <Link to="/addconference">
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ lineHeight: "2.4em" }}
                    >
                      Add Conference
                    </Button>
                  </Link>
                </GridItem>
                <GridItem>
                  <TextField
                    label="Search"
                    value={this.state.searchTerm}
                    onChange={this.searchHandle}
                    fullWidth
                    name="searchTerm"
                  />
                </GridItem>
                <GridItem>
                  <FormControl style={{ width: "400%" }}>
                    <InputLabel html-for="searchBy">Search By</InputLabel>
                    <Select
                      className={classes.cTypeStyle}
                      value={this.state.searchBy}
                      onChange={this.searchByHandle}
                      autoWidth
                      inputProps={{
                        name: "searchBy",
                        id: "searchBy"
                      }}
                    >
                      <MenuItem value="cType">Conference Type</MenuItem>
                      <MenuItem value="paperTitle">Paper Title</MenuItem>
                      <MenuItem value="authors">Authors</MenuItem>
                      <MenuItem value="conferenceTitle">
                        Conference Title
                      </MenuItem>
                      <MenuItem value="conferenceDate">Date</MenuItem>
                      <MenuItem value="isbnNo">ISBN No</MenuItem>
                      <MenuItem value="publisher">Publisher</MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>
              </GridContainer>
              {conferenceSet.map(data => (
                <Card>
                  <CardBody>
                    <div>
                      <GridContainer>
                        <GridItem md={1.5} sm={1.5}>
                          <p className={classes.title}>Conference Type :</p>
                        </GridItem>
                        <GridItem md={2.5} sm={2.5}>
                          <p>{data.cType}</p>
                        </GridItem>
                        <GridItem md={2.5} sm={2.5}>
                          <p className={classes.title}>Conference Title :</p>
                        </GridItem>
                        <GridItem md={8.5} sm={8.5}>
                          <p>{data.conferenceTitle}</p>
                        </GridItem>
                      </GridContainer>
                    </div>
                    <div>
                      <GridContainer>
                        <GridItem md={1.5} sm={1.5}>
                          <p className={classes.title}>Paper Title :</p>
                        </GridItem>
                        <GridItem md={5.5} sm={5.5}>
                          <p>{data.paperTitle}</p>
                        </GridItem>
                      </GridContainer>
                    </div>
                    <div>
                      <GridContainer>
                        <GridItem md={6} sm={6}>
                          <p>
                            <span className={classes.title}>Authors :</span>{" "}
                            {data.authors}
                          </p>
                        </GridItem>
                        <GridItem md={6} sm={6}>
                          <p>
                            <span className={classes.title}>
                              {" "}
                              Organized By :{" "}
                            </span>
                            {data.organizedBy}
                          </p>
                        </GridItem>
                      </GridContainer>
                    </div>
                    <div>
                      <GridContainer>
                        <GridItem md={3} sm={3}>
                          <p>
                            <span className={classes.title}>Publisher : </span>{" "}
                            {data.publisher}
                          </p>
                        </GridItem>
                        <GridItem md={3} sm={3}>
                          <p>
                            <span className={classes.title}>ISBN Number :</span>
                            {data.isbnNo}
                          </p>
                        </GridItem>
                        <GridItem md={3} sm={3}>
                          <p>
                            <span className={classes.title}>Date : </span>
                            {data.conferenceDate}
                          </p>
                        </GridItem>
                      </GridContainer>
                    </div>
                    <div style={{ marginTop: 10 }}>
                      <GridContainer>
                        <GridItem md={3} sm={3}>
                          {data.link && (
                            <a href={data.link} target="_blank">
                              <Button variant="outlined" color="primary">
                                Online Link
                              </Button>
                            </a>
                          )}
                        </GridItem>
                        {data.paper ? (
                          <GridItem md={3} sm={3}>
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={this.downloadPaper.bind(this, data._id)}
                            >
                              Download Paper
                            </Button>
                          </GridItem>
                        ) : (
                          <GridItem md={3} sm={3}>
                            <input
                              accept="application/pdf,application/vnd.ms-excel"
                              className={classes.input}
                              style={{ display: "none" }}
                              id="paper"
                              type="file"
                              onChange={this.onPaperUpload.bind(this, data._id)}
                            />
                            <label
                              htmlFor="paper"
                              style={{ cursor: "pointer" }}
                            >
                              <Tooltip
                                title="Make sure you upload the correct file"
                                placement="bottom"
                              >
                                <Button
                                  variant="outlined"
                                  color="primary"
                                  onClick={() => {
                                    document.getElementById("paper").click();
                                  }}
                                >
                                  Upload Paper
                                </Button>
                              </Tooltip>
                            </label>
                          </GridItem>
                        )}
                        {data.certificate ? (
                          <GridItem md={3} sm={3}>
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={() => this.setState({ open: true })}
                            >
                              View Certificate
                            </Button>
                            <Dialog
                              onClose={() => this.setState({ open: false })}
                              open={this.state.open}
                            >
                              <DialogContent>
                                <img
                                  style={{ width: "100%", height: "auto" }}
                                  src={data.certificate}
                                  alt="Certificate_not_found"
                                />
                              </DialogContent>
                            </Dialog>
                          </GridItem>
                        ) : (
                          <GridItem md={3} sm={3}>
                            <input
                              accept="image/*"
                              className={classes.input}
                              style={{ display: "none" }}
                              id="cert"
                              type="file"
                              onChange={this.onCertUpload.bind(this, data._id)}
                            />
                            <label htmlFor="cert" style={{ cursor: "pointer" }}>
                              <Tooltip
                                title="Make sure you upload the correct file"
                                placement="bottom"
                              >
                                <Button
                                  variant="outlined"
                                  color="primary"
                                  onClick={() => {
                                    document.getElementById("cert").click();
                                  }}
                                >
                                  Upload Certificate
                                </Button>
                              </Tooltip>
                            </label>
                          </GridItem>
                        )}
                        <GridItem md={3} sm={3}>
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={this.deleteConferenceDetails.bind(
                              this,
                              data._id
                            )}
                          >
                            Delete Details
                          </Button>
                        </GridItem>
                      </GridContainer>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </GridItem>
          </GridContainer>
        </div>
      );
    } else {
      conferenceContent = (
        <GridContainer>
          <GridItem md={8}>
            <div>
              <h4 className={classes.cardTitle}>
                You haven't yet set up any conference details.
              </h4>
              <Link to="/addconference" className={classes.cardLink}>
                Add details
              </Link>
            </div>
          </GridItem>
        </GridContainer>
      );
    }

    return <div>{conferenceContent}</div>;
  }
}

const mapStateToProps = state => ({
  conference: state.conference
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { getConference, deleteConferenceDetail }
  )(Conference)
);
