import { useAuth0 } from "@auth0/auth0-react";
import { Box } from "@mui/material";

const UserProfile = () => {
  const { user } = useAuth0();

  console.log(user);
  return (
    <Box
      id="profile-container"
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    ></Box>
  );
};
export default UserProfile;
