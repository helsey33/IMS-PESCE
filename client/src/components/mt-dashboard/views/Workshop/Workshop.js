import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import moment from "moment";
import { CSVLink } from "react-csv";

import {
  getWorkshop,
  deleteWorkshopDetail
} from "../../../../actions/workshopActions";
import Card from "../../components/Card/Card";
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

class Workshop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBy: "academicYear",
      workshopSet: [],
      open: false
    };
    this.searchByHandle = this.searchByHandle.bind(this);
    this.searchHandle = this.searchHandle.bind(this);
  }
  componentWillMount = () => {
    this.props.getWorkshop();
  };

  deleteWorkshopDetails = id => {
    this.props.deleteWorkshopDetail(id);
  };

  onPaperUpload = (id, e) => {
    const fd = new FormData();
    fd.append("report", e.target.files[0], e.target.files[0].name);
    axios
      .post(`/api/workshop/uploadReport/${id}`, fd)
      .then(res => {
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  downloadPaper(id) {
    axios.post(`/api/workshop/downloadReport/${id}`).then(res => {
      window.open(`http://localhost:5000/${res.data}`);
    });
  }

  onCertUpload = (id, e) => {
    const fd = new FormData();
    fd.append("certificate", e.target.files[0], e.target.files[0].name);
    axios
      .post(`/api/workshop/uploadCert/${id}`, fd)
      .then(res => {
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  searchByHandle(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.workshop.workshop) {
      this.setState({
        workshopSet: newProps.workshop.workshop.workshopData
      });
    }
  }

  searchHandle(e) {
    const searchTerm = e.target.value;
    const filter = this.state.searchBy;
    const filteredSet = this.props.workshop.workshop.workshopData.filter(
      data => {
        return data[filter].toLowerCase().includes(searchTerm.toLowerCase());
      }
    );
    this.setState({
      workshopSet: filteredSet
    });
  }

  render() {
    const { classes } = this.props;
    const { workshop, loading } = this.props.workshop;
    const { workshopSet } = this.state;

    let workshopContent;
    if (workshop === null || loading) {
      workshopContent = (
        <div className={classes.spinner}>
          <CircularProgress size={50} />
        </div>
      );
    } else if (Object.keys(workshop).length > 0) {
      //For exporting CSV
      const headers = [
        { label: "Name", key: "name" },
        { label: "Workshop Type", key: "wType" },
        { label: "Title", key: "title" },
        { label: "Start Date", key: "start_date" },
        { label: "End Date", key: "end_date" },
        { label: "Organized By", key: "organized_by" },
        { label: "Target Audience", key: "target_audience" }
      ];

      const data = this.state.workshopSet.map(data => ({
        name: workshop.user.name,
        wType: data.wType,
        title: data.title,
        start_date: moment(data.start_date).format("Do MMM, YYYY"),
        end_date: moment(data.end_date).format("Do MMM, YYYY"),
        organized_by: data.organized_by,
        target_audience: data.target_audience
      }));

      data.unshift({
        name: "",
        wType: "",
        title: "",
        start_date: "",
        end_date: "",
        organized_by: "",
        target_audience: ""
      });

      // data unshift to add a blank row

      workshopContent = (
        <div>
          <GridContainer>
            <GridItem md={12} sm={12}>
              <GridContainer>
                <GridItem>
                  <Link to="/addworkshop">
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ lineHeight: "2.4em" }}
                    >
                      Add Workshop
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
                  <FormControl style={{ width: "100%" }}>
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
                      <MenuItem value="wType">Type</MenuItem>
                      <MenuItem value="title"> Title</MenuItem>
                      <MenuItem value="academicYear">Academic Year</MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem>
                  <CSVLink
                    data={data}
                    headers={headers}
                    filename={"workshop_report.csv"}
                  >
                    <Button
                      variant="outlined"
                      style={{ lineHeight: "2em" }}
                      color="primary"
                    >
                      CSV
                    </Button>
                  </CSVLink>
                </GridItem>
              </GridContainer>
              {workshopSet.map(data => (
                <Card key={data._id}>
                  <CardBody>
                    <div>
                      <GridContainer>
                        <GridItem>
                          <p
                            style={{
                              fontSize: "20px",
                              color: "#6C337A"
                            }}
                          >
                            {data.wType}
                          </p>
                        </GridItem>
                      </GridContainer>
                    </div>
                    <div>
                      <GridContainer>
                        <GridItem>
                          <p>
                            <span className={classes.title}>Title :</span>{" "}
                            {data.title}
                          </p>
                        </GridItem>
                      </GridContainer>
                    </div>
                    <div>
                      <GridContainer>
                        <GridItem md={6} sm={6}>
                          <p>
                            <span className={classes.title}>Start Date :</span>{" "}
                            {moment(data.start_date).format("Do MMM, YYYY")}
                          </p>
                        </GridItem>
                        <GridItem md={6} sm={6}>
                          <p>
                            <span className={classes.title}> End Date : </span>
                            {moment(data.end_date).format("Do MMM, YYYY")}
                          </p>
                        </GridItem>
                      </GridContainer>
                    </div>
                    <div>
                      <GridContainer>
                        <GridItem md={6} sm={6}>
                          <p>
                            <span className={classes.title}>
                              Organized By :{" "}
                            </span>{" "}
                            {data.organized_by}
                          </p>
                        </GridItem>
                        {data.wType === "Conducted" && (
                          <GridItem md={6} sm={6}>
                            <p>
                              <span className={classes.title}>
                                Target Audience :{" "}
                              </span>{" "}
                              {data.target_audience}
                            </p>
                          </GridItem>
                        )}
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
                        {data.report ? (
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
                                title="Only pdf or word file allowed"
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
                                title="Only images allowed (jpeg | jpg | png)"
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
                            onClick={this.deleteWorkshopDetails.bind(
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
      workshopContent = (
        <GridContainer>
          <GridItem md={8}>
            <div>
              <h4 className={classes.cardTitle}>
                You haven't yet set up any workshop details.
              </h4>
              <Link to="/addworkshop" className={classes.cardLink}>
                Add details
              </Link>
            </div>
          </GridItem>
        </GridContainer>
      );
    }

    return <div>{workshopContent}</div>;
  }
}

const mapStateToProps = state => ({
  workshop: state.workshop
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { getWorkshop, deleteWorkshopDetail }
  )(Workshop)
);
