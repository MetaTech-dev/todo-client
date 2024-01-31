import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Header from "../Layout/Header";
import AppContext from "../contexts/AppContext";
import { useContext } from "react";

const NotFound = () => {
  const { isDarkMode } = useContext(AppContext);

  return (
    <Box
      id="not-found-container"
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Header />
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card elevation={2} sx={{ width: "fit-content" }}>
          <CardHeader title="Oops! ... Page Not Found" />
          <CardContent>
            <Alert
              severity="warning"
              sx={{ backgroundColor: isDarkMode ? "transparent" : "" }}
            >
              The page you are looking for does not exist.
            </Alert>
          </CardContent>
          <CardActionArea sx={{ display: "flex" }}>
            <Button component={RouterLink} to={"/"}>
              Let's Go Somewhere Real
            </Button>
          </CardActionArea>
        </Card>
      </Box>
    </Box>
  );
};

export default NotFound;
