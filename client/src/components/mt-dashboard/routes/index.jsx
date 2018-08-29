import Dashboard from "../layouts/Dashboard/Dashboard.jsx";
import Landing from "./../../../components/auth/Landing";

const indexRoutes = [
  { path: "/home", component: Landing, exact: true },
  { path: "/", component: Dashboard }
];

export default indexRoutes;
