import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { SignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import { ToDoProvider } from "../contexts/ToDoContext";

const Layout = () => {
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
      <SignedIn>
        <ToDoProvider>
          <Outlet />
        </ToDoProvider>
      </SignedIn>
      <SignedOut>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <SignIn />
        </Box>
      </SignedOut>
    </Box>
  );
};

export default Layout;
