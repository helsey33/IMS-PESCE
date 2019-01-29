// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Forum from "@material-ui/icons/Forum";
import ChromeReaderMode from "@material-ui/icons/ChromeReaderMode";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Build from "@material-ui/icons/Build";

import UserProfile from "../views/UserProfile/UserProfile.jsx";
import Conference from "../views/C&J/Conference";
import Journal from "../views/C&J/Journal";
import AdminArea from "../views/AdminArea/AdminArea";
import Workshop from "../views/Workshop/Workshop";

const dashboardRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Dashboard",
    icon: Person,
    component: UserProfile
  },
  {
    path: "/conference",
    sidebarName: "Conference",
    navbarName: "Conference",
    icon: Forum,
    component: Conference
  },
  {
    path: "/journal",
    sidebarName: "Journal",
    navbarName: "Journal",
    icon: ChromeReaderMode,
    component: Journal
  },
  {
    path: "/workshop",
    sidebarName: "Workshop",
    navbarName: "Workshop",
    icon: Build,
    component: Workshop
  },
  {
    path: "/adminarea",
    sidebarName: "Admin Panel",
    navbarName: "AdminArea",
    icon: VerifiedUser,
    component: AdminArea
  },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" },
  {
    redirect: true,
    path: "/createprofile",
    to: "/createprofile",
    navbarName: "Create Profile"
  },
  {
    redirect: true,
    path: "/addgraduation",
    to: "/addgraduation",
    navbarName: "Add UG and PG Details"
  },
  {
    redirect: true,
    path: "/addpregrad",
    to: "/addpregrad",
    navbarName: "Add pre-graduation details"
  },
  {
    redirect: true,
    path: "/addworkexperience",
    to: "/addworkexperience",
    navbarName: "Add Work Experience"
  },
  {
    redirect: true,
    path: "/addproject",
    to: "/addproject",
    navbarName: "Add Project Details"
  },
  {
    redirect: true,
    path: "/addconference",
    to: "/addconference",
    navbarName: "Conference Details"
  },
  {
    redirect: true,
    path: "/addjournal",
    to: "/addjournal",
    navbarName: "Journal Details"
  },
  {
    redirect: true,
    path: "/addworkshop",
    to: "/addworkshop",
    navbarName: "Workshop Details"
  },
  {
    redirect: true,
    path: "/allconference",
    to: "/allconference",
    navbarName: "All Conferences"
  },
  {
    redirect: true,
    path: "/alljournal",
    to: "/alljournal",
    navbarName: "All Journals"
  },
  {
    redirect: true,
    path: "/allworkshop",
    to: "/allworkshop",
    navbarName: "All Workshops"
  },
  {
    redirect: true,
    path: "/allprofiles",
    to: "/allprofiles",
    navbarName: "All Profiles"
  },
  {
    redirect: true,
    path: "/handle/:handle",
    to: "/handle/:handle",
    navbarName: "Profile"
  }
];

export default dashboardRoutes;
