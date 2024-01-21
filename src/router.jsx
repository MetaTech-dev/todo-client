import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./Views/Dashboard";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import DetailedToDo from "./Views/DetailedToDo";
import { OrganizationProfile } from "@clerk/clerk-react";

export const routerChildren = [
  {
    index: true,
    path: "",
    element: <Dashboard />,
    name: "Dashboard",
    isInNavMenu: true,
    icon: <DashboardOutlinedIcon />,
  },
  {
    path: "todos/:toDoId",
    element: <DetailedToDo />,
    name: "Detailed ToDo",
    isInNavMenu: false,
  },
  {
    path: "organization",
    element: <OrganizationProfile />,
    name: "Organization",
    isInNavMenu: true,
    icon: <PeopleAltOutlinedIcon />,
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
