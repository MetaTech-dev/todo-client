import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./Views/Dashboard";
import UserProfile from "./Views/UserProfile";
import Users from "./Views/Users";

export const routerChildren = [
  {
    index: true,
    path: "",
    element: <Dashboard />,
    name: "Dashboard",
  },
  {
    path: ":userId",
    element: <UserProfile />,
    name: "User Profile",
  },
  {
    path: "users",
    element: <Users />,
    name: "Users",
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
