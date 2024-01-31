import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./Views/Dashboard";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import DetailedToDo from "./Views/DetailedToDo";
import { OrganizationProfile } from "@clerk/clerk-react";
import { Organizations } from "./Views/Organizations";
import NotFound from "./Views/NotFound";

export const routerChildren = [
  {
    path: "*",
    element: <NotFound />,
    name: "Not Found",
    isInNavMenu: false,
    isMobileOnly: false,
  },
  {
    index: true,
    path: "",
    element: <Dashboard />,
    name: "Dashboard",
    isInNavMenu: true,
    isMobileOnly: false,
    icon: <DashboardOutlinedIcon />,
  },
  {
    path: "todos/:toDoId",
    element: <DetailedToDo />,
    name: "Detailed ToDo",
    isInNavMenu: false,
    isMobileOnly: false,
  },
  {
    path: "organization",
    element: <OrganizationProfile />,
    name: "Organization",
    isInNavMenu: true,
    isMobileOnly: false,
    icon: <PeopleAltOutlinedIcon />,
  },
  {
    path: "organizations",
    element: <Organizations />,
    name: "Organizations",
    isInNavMenu: true,
    isMobileOnly: true,
    icon: <Groups2OutlinedIcon />,
  },
];

const router = createBrowserRouter([
  {
    path: "/*",
    element: <Layout />,
    children: routerChildren,
  },
]);

export default router;
