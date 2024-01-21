import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./Views/Dashboard";
import UserProfile from "./Views/UserProfile";
import Users from "./Views/Users";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import DetailedToDo from "./Views/DetailedToDo";
import { SignIn } from "@clerk/clerk-react";
import { Box } from "@mui/material";
import { Organizations } from "./Views/Organizations";

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
    path: "users",
    element: <Users />,
    name: "Users",
    isInNavMenu: true,
    icon: <PeopleAltOutlinedIcon />,
  },
  {
    path: "users/:userId",
    element: <UserProfile />,
    name: "User Profile",
    isInNavMenu: false,
  },
  {
    path: "organizations",
    element: <Organizations />,
    name: "Organizations",
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
