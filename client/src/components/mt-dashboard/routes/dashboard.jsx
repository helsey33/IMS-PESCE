// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Forum from "@material-ui/icons/Forum";
import ChromeReaderMode from "@material-ui/icons/ChromeReaderMode";
// import ContentPaste from "@material-ui/icons/ContentPaste";
// import LibraryBooks from "@material-ui/icons/LibraryBooks";
// import BubbleChart from "@material-ui/icons/BubbleChart";
// import LocationOn from "@material-ui/icons/LocationOn";
// import Notifications from "@material-ui/icons/Notifications";
// import Unarchive from "@material-ui/icons/Unarchive";
// core components/views
import DashboardPage from "../views/Dashboard/Dashboard.jsx";
import UserProfile from "../views/UserProfile/UserProfile.jsx";
import Conference from "../views/C&J/Conference";
import Journal from "../views/C&J/Journal";

const dashboardRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/user",
    sidebarName: "User Profile",
    navbarName: "Profile",
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
  // {
  //   path: "/icons",
  //   sidebarName: "Icons",
  //   navbarName: "Icons",
  //   icon: BubbleChart,
  //   component: Icons
  // },
  // {
  //   path: "/maps",
  //   sidebarName: "Maps",
  //   navbarName: "Map",
  //   icon: LocationOn,
  //   component: Maps
  // },
  // {
  //   path: "/notifications",
  //   sidebarName: "Notifications",
  //   navbarName: "Notifications",
  //   icon: Notifications,
  //   component: NotificationsPage
  // },
  // {
  //   path: "/upgrade-to-pro",
  //   sidebarName: "Upgrade To PRO",
  //   navbarName: "Upgrade To PRO",
  //   icon: Unarchive,
  //   component: UpgradeToPro
  // },
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
  }
];

export default dashboardRoutes;
