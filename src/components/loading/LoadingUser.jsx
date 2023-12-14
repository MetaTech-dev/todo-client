import { Box, CircularProgress } from "@mui/material";

const LoadingUser = () => {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress size={100} />
    </Box>
  );
};

export default LoadingUser;
