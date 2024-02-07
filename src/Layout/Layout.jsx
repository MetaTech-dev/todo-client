import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import {
  SignIn,
  SignedIn,
  SignedOut,
  useOrganization,
} from "@clerk/clerk-react";
import { DialogProvider } from "../contexts/DialogContext";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

const Layout = () => {
  const queryClient = useQueryClient();

  const { organization } = useOrganization();

  // if the user switches organizations we need to clear the cache
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
          <DialogProvider>
            <Outlet />
          </DialogProvider>
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
