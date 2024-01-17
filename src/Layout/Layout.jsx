import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import LoadingUser from "../components/loading/LoadingUser";
import {
  SignedIn,
  SignedOut,
  useOrganization,
  useOrganizationList,
} from "@clerk/clerk-react";
import { useEffect } from "react";
import { ToDoProvider } from "../contexts/ToDoContext";

const Layout = () => {
  // start make sure there is an active organization
  const { organization } = useOrganization();
  const {
    // TODO: Remove organizationList when userMemberships is fixed
    // organizationList is marked deprecated but it still has data
    organizationList,
    // userMemberships is the new way to get the organization list but it is empty for some reason
    userMemberships,
    isLoaded: isOrganizationListLoaded,
    setActive,
  } = useOrganizationList({
    infinite: true,
  });
  useEffect(() => {
    if (!organization && isOrganizationListLoaded) {
      if (userMemberships?.data?.length === 0) {
        setActive([userMemberships.data[0]?.organization]);
      } else if (organizationList?.data?.length === 0) {
        setActive([organizationList.data[0]?.organization]);
      }
    }
  }, [isOrganizationListLoaded, userMemberships, setActive]);
  // end make sure there is an active organization

  return (
    <ToDoProvider>
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
          <Outlet />
        </SignedIn>
        <SignedOut>
          <LoadingUser />
        </SignedOut>
      </Box>
    </ToDoProvider>
  );
};

export default Layout;
