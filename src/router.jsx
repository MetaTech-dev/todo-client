import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./Views/Dashboard";
import UserProfile from "./Views/UserProfile";

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
];

const router = createBrowserRouter([
  {
    path: "/*",
    element: <Layout />,
    children: routerChildren,
  },
]);

export default router;
