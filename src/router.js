import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";

export const routerChildren = [
  {
    index: true,
    path: "",
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
