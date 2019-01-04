import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllProfiles } from "../../.../../../../actions/profileActions";
import { Link } from "react-router-dom";

import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";

import withStyles from "@material-ui/core/styles/withStyles";
import { CircularProgress } from "@material-ui/core";

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
    transformOrigin: "center center"
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

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: []
    };
  }
  componentWillMount = () => {
    this.props.getAllProfiles();
  };

  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.profile.profiles).length) {
      const { profiles } = nextProps.profile;
      this.setState({
        profiles
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { profiles, loading } = this.props.profile;

    let profileContent;
    if (profiles === null || loading) {
      profileContent = (
        <div className={classes.spinner}>
          <CircularProgress size={50} />
        </div>
      );
    } else if (Object.keys(profiles).length > 0) {
      profileContent = (
        <div>
          <GridContainer>
            <GridItem md={12}>
              <Card>
                <CardHeader color="primary">Profiles</CardHeader>
                <CardBody>
                  <List>
                    {this.state.profiles.map(profile => (
                      <div>
                        <ListItem
                          className={classes.listItemStyle}
                          key={profile.handle}
                        >
                          <ListItemText>{profile.user.name}</ListItemText>
                          <ListItemSecondaryAction>
                            <Link to={`handle/${profile.handle}`}>View</Link>
                          </ListItemSecondaryAction>
                        </ListItem>
                      </div>
                    ))}
                  </List>
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
              <h4 className={classes.cardTitle}>No profiles available.</h4>
            </div>
          </GridItem>
        </GridContainer>
      );
    }

    return <div>{profileContent}</div>;
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    {
      getAllProfiles
    }
  )(UserProfile)
);
