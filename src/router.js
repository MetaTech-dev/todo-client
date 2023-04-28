import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout/Layout";
import Dashboard from "./Views/Dashboard";

export const routerChildren = [
  {
    index: true,
    path: "",
    element: <Dashboard />,
    name: "Dashboard",
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
