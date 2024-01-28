import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import {
  SignIn,
  SignedIn,
  SignedOut,
  useOrganization,
} from "@clerk/clerk-react";
import { ToDoProvider } from "../contexts/ToDoContext";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

const Layout = () => {
  const queryClient = useQueryClient();

  const { organization } = useOrganization();

  useEffect(() => {
    queryClient.invalidateQueries();
  }, [organization]);
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
      <Box
        id="main-container"
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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
              flexGrow: 1,
            }}
          >
            <SignIn />
          </Box>
        </SignedOut>
      </Box>
    </Box>
  );
};

export default Layout;
