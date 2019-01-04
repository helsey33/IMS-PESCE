import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getProfileByHandle,
  deleteGradDetails,
  deletePreGradDetails,
  deleteWorkExperience,
  deleteProject
} from "../../.../../../../actions/profileActions";
import moment from "moment";
import axios from "axios";

import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CardAvatar from "../../components/Card/CardAvatar.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import Table from "../../components/Table/Table.jsx";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button
} from "@material-ui/core";

import withStyles from "@material-ui/core/styles/withStyles";
import { CircularProgress } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import { cardLink } from "../../assets/jss/material-dashboard-react.jsx";

const styles = {
  cardLink,
  listItemStyle: {
    display: "flex",
    alignItems: "flex-end"
  },
  listTextStyle: {
    alignSelf: "flex-end"
  },
  secondaryActionStyle: {
    fontFamily: "Montserrat"
  },
  avatarStyle: {
    transition: "all 0.5s",
    transformOrigin: "center center",
    "&:hover": {
      boxShadow:
        "0 16px 25px -22px rgba(0, 0, 0, 0.56), 0 4px 15px 0px rgba(0, 0, 0, 0.12), 0 8px 5px -15px rgba(0, 0, 0, 0.2)",
      transform: "scale(0.97)"
    }
  },
  btnHouseStyle: {
    display: "flex",
    justifyContent: "space-around"
  },
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  spinner: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
};

class ProfileByHandle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayImage: "",
      pg_and_ug: [],
      pre_graduation: [],
      work_experience: [],
      project_at_pg_ug: []
    };
  }
  componentWillMount = () => {
    const { handle } = this.props.match.params;
    this.props.getProfileByHandle(handle);
  };

  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.profile.profile).length) {
      const { profile } = nextProps.profile;
      this.setState({
        displayImage: profile.displayImage,
        pg_and_ug: profile.pg_and_ug,
        pre_graduation: profile.pre_graduation,
        work_experience: profile.work_experience,
        project_at_pg_ug: profile.project_at_pg_ug
      });
    }
  }

  onDpChange(e) {
    const fd = new FormData();
    fd.append("displayImage", e.target.files[0], e.target.files[0].name);
    axios
      .post("/api/profile/profilePic/", fd)
      .then(res => this.setState({ displayImage: res.data.displayImage }))
      .catch(err => console.log(err));
  }

  onGradDetailDelete(id) {
    this.props.deleteGradDetails(id);
  }

  onPGradDetailDelete(id) {
    this.props.deletePreGradDetails(id);
  }

  onWorkExpDelete(id) {
    this.props.deleteWorkExperience(id);
  }

  onProjectDelete(id) {
    this.props.deleteProject(id);
  }

  render() {
    const { classes } = this.props;
    const { profile, loading } = this.props.profile;

    let profileContent;
    if (profile === null || loading) {
      profileContent = (
        <div className={classes.spinner}>
          <CircularProgress size={50} />
        </div>
      );
    } else if (Object.keys(profile).length > 0) {
      profileContent = (
        <div>
          <GridContainer>
            <GridItem md={8}>
              <Card>
                <CardHeader color="primary"> YOUR PROFILE</CardHeader>
                <CardBody>
                  <List>
                    <ListItem className={classes.listItemStyle}>
                      <ListItemText>Date of Birth</ListItemText>
                      <ListItemSecondaryAction
                        className={classes.secondaryActionStyle}
                      >
                        {moment(profile.date_of_birth).format("Do MMM, YYYY")}
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem className={classes.listItemStyle}>
                      <ListItemText>Highest Qualification</ListItemText>
                      <ListItemSecondaryAction
                        className={classes.secondaryActionStyle}
                      >
                        {profile.highest_qualification}
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem className={classes.listItemStyle}>
                      <ListItemText>
                        Date of joining the present post
                      </ListItemText>
                      <ListItemSecondaryAction
                        className={classes.secondaryActionStyle}
                      >
                        {moment(profile.date_of_join_post).format(
                          "Do MMM, YYYY"
                        )}
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem className={classes.listItemStyle}>
                      <ListItemText>Date of joining the institute</ListItemText>
                      <ListItemSecondaryAction
                        className={classes.secondaryActionStyle}
                      >
                        {moment(profile.date_of_join_institute).format(
                          "Do MMM, YYYY"
                        )}
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                  <div className={classes.btnHouseStyle}>
                    <Link to="/addgraduation">
                      <Button
                        type="button"
                        color="primary"
                        variant="outlined"
                        style={{ margin: 5 }}
                      >
                        Add Graduation Details
                      </Button>
                    </Link>
                    <Link to="/addpregrad">
                      <Button
                        type="button"
                        color="primary"
                        variant="outlined"
                        style={{ margin: 5 }}
                      >
                        Add Pre-Graduation Details
                      </Button>
                    </Link>
                    <Link to="/addworkexperience">
                      <Button
                        type="button"
                        color="primary"
                        variant="outlined"
                        style={{ margin: 5 }}
                      >
                        Add Work Experiece
                      </Button>
                    </Link>
                    <Link to="/addproject">
                      <Button
                        type="button"
                        color="primary"
                        variant="outlined"
                        style={{ margin: 5 }}
                      >
                        Add Project details
                      </Button>
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem md={4}>
              <Card profile>
                <CardAvatar profile className={classes.avatarStyle}>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="raised-button-file"
                    type="file"
                    style={{ display: "none" }}
                    onChange={this.onDpChange.bind(this)}
                  />

                  <label
                    htmlFor="raised-button-file"
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={"../" + this.state.displayImage}
                      alt="Profile_Image"
                    />
                  </label>
                </CardAvatar>
                <CardBody profile>
                  <h4 className={classes.cardCategory}>{profile.user.name}</h4>
                  <h3 className={classes.cardTitle}>{profile.designation}</h3>
                  <h6
                    className={classes.cardTitle}
                    style={{ fontWeight: "400" }}
                  >
                    Areas of Interest and Practical Experience
                  </h6>
                  <p className={classes.description}>
                    {profile.areas_of_interest_and_practical_experience.join(
                      ","
                    )}
                  </p>
                  <Link to="/createprofile">
                    <Button
                      type="button"
                      color="primary"
                      variant="contained"
                      style={{ marginBottom: 20 }}
                    >
                      Edit Profile
                    </Button>
                  </Link>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      );
    } else {
      profileContent = (
        <GridContainer>
          <GridItem md={8}>
            <div>
              <h4 className={classes.cardTitle}>
                You haven't yet set up a profile.
              </h4>
              <Link to="/createprofile" className={classes.cardLink}>
                Create Profile
              </Link>
            </div>
          </GridItem>
        </GridContainer>
      );
    }

    let gradContent;
    if (this.state.pg_and_ug.length > 0) {
      gradContent = (
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Graduation Details</h4>
                <p className={classes.cardCategoryWhite}>(PG and UG)</p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={Object.keys(this.state.pg_and_ug[0])
                    .slice(1)
                    .map(val => val[0].toUpperCase() + val.slice(1))} //Remove _id and then capitalize everything else
                  tableData={this.state.pg_and_ug.map(value => {
                    const toDisplay = Object.values(value).slice(1);
                    toDisplay.push(
                      <DeleteIcon
                        style={{ cursor: "pointer" }}
                        onClick={this.onGradDetailDelete.bind(this, value._id)}
                      />
                    );
                    return toDisplay;
                  })}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      );
    }

    let pgradContent;
    if (this.state.pre_graduation.length > 0) {
      pgradContent = (
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>
                  Pre Graduation Details
                </h4>
                <p className={classes.cardCategoryWhite}>(Xth and XIIth)</p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={Object.keys(this.state.pre_graduation[0])
                    .slice(1)
                    .map(val => val[0].toUpperCase() + val.slice(1))} //Remove _id and then capitalize everything else
                  tableData={this.state.pre_graduation.map(value => {
                    const toDisplay = Object.values(value).slice(1);
                    toDisplay.push(
                      <DeleteIcon
                        style={{ cursor: "pointer" }}
                        onClick={this.onPGradDetailDelete.bind(this, value._id)}
                      />
                    );
                    return toDisplay;
                  })}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      );
    }

    let workExperience;
    if (this.state.work_experience.length > 0) {
      workExperience = (
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Work Experience</h4>
                <p className={classes.cardCategoryWhite}>
                  Previous Employments and Experience
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={Object.keys(this.state.work_experience[0])
                    .slice(1)
                    .map(val => {
                      if (val === "exp_designation") return "Designation";
                      return val[0].toUpperCase() + val.slice(1);
                    })} //Remove _id and then capitalize everything else
                  tableData={this.state.work_experience.map(value => {
                    const toDisplay = Object.values(value).slice(1);
                    const toDisplayF = toDisplay.map(val => {
                      if (moment(val).isValid()) {
                        return moment(val).format("Do MMM, YYYY");
                      }
                      return val;
                    });
                    toDisplayF.push(
                      <DeleteIcon
                        style={{ cursor: "pointer" }}
                        onClick={this.onWorkExpDelete.bind(this, value._id)}
                      />
                    );
                    return toDisplayF;
                  })}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      );
    }

    let projectDetails;
    if (this.state.project_at_pg_ug.length > 0) {
      projectDetails = (
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Project Details</h4>
                <p className={classes.cardCategoryWhite}>Done during UG & PG</p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={Object.keys(this.state.project_at_pg_ug[0])
                    .slice(1)
                    .map(val => {
                      if (val === "exp_designation") return "Designation";
                      return val[0].toUpperCase() + val.slice(1);
                    })} //Remove _id and then capitalize everything else
                  tableData={this.state.project_at_pg_ug.map(value => {
                    const toDisplay = Object.values(value).slice(1);

                    toDisplay.push(
                      <DeleteIcon
                        style={{ cursor: "pointer" }}
                        onClick={this.onProjectDelete.bind(this, value._id)}
                      />
                    );
                    return toDisplay;
                  })}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      );
    }
    return (
      <div>
        {profileContent}
        {gradContent}
        {pgradContent}
        {workExperience}
        {projectDetails}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    {
      getProfileByHandle,
      deleteGradDetails,
      deletePreGradDetails,
      deleteWorkExperience,
      deleteProject
    }
  )(ProfileByHandle)
);
