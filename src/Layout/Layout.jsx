import { useAuth0 } from "@auth0/auth0-react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import LoadingUser from "../components/loading/LoadingUser";

const Layout = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
      id="layout-container"
    >
      <Header />
      {isAuthenticated ? <Outlet /> : <LoadingUser />}
    </Box>
  );
};

export default Layout;
