import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import {
  getJournal,
  deleteJournalDetail
} from "../../../../actions/journalActions";
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
  MenuItem
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

class Journal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBy: "paperTitle",
      journalSet: []
    };
    this.searchByHandle = this.searchByHandle.bind(this);
    this.searchHandle = this.searchHandle.bind(this);
  }
  componentWillMount = () => {
    this.props.getJournal();
  };

  deleteJournalDetails = id => {
    this.props.deleteJournalDetail(id);
  };

  onPaperUpload = (id, e) => {
    const fd = new FormData();
    fd.append("paper", e.target.files[0], e.target.files[0].name);
    axios
      .post(`/api/journal/uploadPaper/${id}`, fd)
      .then(res => {
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  downloadPaper(id) {
    axios
      .get(`/api/journal/downloadPaper/${id}`)
      .then(res => console.log("success"));
  }

  searchByHandle(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.journal.journal) {
      this.setState({
        journalSet: newProps.journal.journal.journalData
      });
    }
  }

  searchHandle(e) {
    const searchTerm = e.target.value;
    const filter = this.state.searchBy;
    const filteredSet = this.props.journal.journal.journalData.filter(data => {
      return data[filter].toLowerCase().includes(searchTerm.toLowerCase());
    });
    this.setState({
      journalSet: filteredSet
    });
  }

  render() {
    const { classes } = this.props;
    const { journal, loading } = this.props.journal;
    const { journalSet } = this.state;
    let journalContent;
    if (journal === null || loading) {
      journalContent = (
        <div className={classes.spinner}>
          <CircularProgress size={50} />
        </div>
      );
    } else if (Object.keys(journal).length > 0) {
      journalContent = (
        <div>
          <GridContainer>
            <GridItem md={12} sm={12}>
              <GridContainer>
                <GridItem>
                  <Link to="/addjournal">
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ lineHeight: "2.4em" }}
                    >
                      Add Journal
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
                      <MenuItem value="jType">Journal Type</MenuItem>
                      <MenuItem value="paperTitle">Paper Title</MenuItem>
                      <MenuItem value="authors">Authors</MenuItem>
                      <MenuItem value="jTitle">Journal Title</MenuItem>
                      <MenuItem value="publishDate">Date</MenuItem>
                      <MenuItem value="issnNo">ISSN No</MenuItem>
                      <MenuItem value="publisher">Publisher</MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>
              </GridContainer>
              {journalSet.map(data => (
                <Card>
                  <CardBody>
                    <div>
                      <GridContainer>
                        <GridItem md={1.5} sm={1.5}>
                          <p className={classes.title}>Journal Type :</p>
                        </GridItem>
                        <GridItem md={2.5} sm={2.5}>
                          <p>{data.jType}</p>
                        </GridItem>
                        <GridItem md={1.5} sm={1.5}>
                          <p className={classes.title}>Journal Title :</p>
                        </GridItem>
                        <GridItem md={5.5} sm={5.5}>
                          <p>{data.jTitle}</p>
                        </GridItem>
                      </GridContainer>
                    </div>
                    <div>
                      <GridContainer>
                        <GridItem md={2} sm={2}>
                          <p className={classes.title}>Paper Title :</p>
                        </GridItem>
                        <GridItem md={10} sm={10}>
                          <p>{data.paperTitle}</p>
                        </GridItem>
                      </GridContainer>
                    </div>
                    <div>
                      <GridContainer>
                        <GridItem md={2} sm={2}>
                          <p className={classes.title}>Authors :</p>
                        </GridItem>
                        <GridItem md={10} sm={10}>
                          <p>{data.authors}</p>
                        </GridItem>
                      </GridContainer>
                    </div>
                    <div>
                      <GridContainer>
                        <GridItem md={2} sm={2}>
                          <p className={classes.title}>Journal Title :</p>
                        </GridItem>
                        <GridItem md={10} sm={10}>
                          <p>{data.jTitle}</p>
                        </GridItem>
                      </GridContainer>
                    </div>
                    <div>
                      <GridContainer>
                        <GridItem md={2} sm={2}>
                          <p className={classes.title}>Publisher :</p>
                        </GridItem>
                        <GridItem md={4} sm={4}>
                          <p>{data.publisher}</p>
                        </GridItem>
                        <GridItem md={6} sm={6}>
                          <p>
                            <span className={classes.title}>ISSN Number :</span>
                            {data.issnNo}
                          </p>
                        </GridItem>
                      </GridContainer>
                    </div>
                    <div>
                      <GridContainer>
                        {(data.indexedBy.webOfScience ||
                          data.indexedBy.scopus ||
                          data.indexedBy.indianCitationIndex) && (
                          <Fragment>
                            <GridItem md={2} sm={2}>
                              <p className={classes.title}>Indexed By : </p>
                            </GridItem>
                            <GridItem md={6} sm={6}>
                              <p>
                                {data.indexedBy.webOfScience &&
                                  "Web Of Science, "}
                                {data.indexedBy.scopus && "Scopus, "}{" "}
                                {data.indexedBy.indianCitationIndex &&
                                  "Indian Citation Index"}
                              </p>
                            </GridItem>
                          </Fragment>
                        )}
                        <GridItem md={4} sm={4}>
                          <p>
                            <span className={classes.title}>
                              UGC Approved :
                            </span>
                            {data.ugcApproved}
                          </p>
                        </GridItem>
                      </GridContainer>
                    </div>
                    <div>
                      <GridContainer>
                        <GridItem md={3} sm={3}>
                          <span className={classes.title}>Voulme : </span>
                          {data.volume}
                        </GridItem>
                        <GridItem md={3} sm={3}>
                          <span className={classes.title}>Issue : </span>
                          {data.issue}
                        </GridItem>
                        <GridItem md={3} sm={3}>
                          <span className={classes.title}>Page Numbers : </span>
                          {data.pageNos}
                        </GridItem>
                        <GridItem md={3} sm={3}>
                          <span className={classes.title}>
                            Published Date :
                          </span>
                          {data.publishDate}
                        </GridItem>
                      </GridContainer>
                    </div>
                    <div style={{ marginTop: 10 }}>
                      <GridContainer>
                        <GridItem md={2} />
                        <GridItem md={3} sm={3}>
                          {data.onlineLink && (
                            <a href={data.onlineLink} target="_blank">
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
                        <GridItem md={3} sm={3}>
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={this.deleteJournalDetails.bind(
                              this,
                              data._id
                            )}
                          >
                            Delete Details
                          </Button>
                        </GridItem>
                        <GridItem md={1} />
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
      journalContent = (
        <GridContainer>
          <GridItem md={8}>
            <div>
              <h4 className={classes.cardTitle}>
                You haven't yet set up any journal details.
              </h4>
              <Link to="/addjournal" className={classes.cardLink}>
                Add details
              </Link>
            </div>
          </GridItem>
        </GridContainer>
      );
    }

    return <div>{journalContent}</div>;
  }
}

const mapStateToProps = state => ({
  journal: state.journal
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { getJournal, deleteJournalDetail }
  )(Journal)
);
