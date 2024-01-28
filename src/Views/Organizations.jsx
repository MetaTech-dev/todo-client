import { OrganizationList } from "@clerk/clerk-react";
import { Box } from "@mui/material";

export const Organizations = () => (
  <Box
    sx={{
      display: "flex",
      height: "100%",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <OrganizationList
      afterSelectOrganizationUrl={() => `/`}
      afterSelectPersonalUrl={() => `/`}
    />
  </Box>
);
