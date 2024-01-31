import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const NotFound = () => {
  return (
    <Card elevation={2}>
      <CardHeader title="Oops! ... Page Not Found" />
      <CardContent>
        <Alert severity="warning">
          The page you are looking for does not exist.
        </Alert>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button component={RouterLink} to={"/"}>
          Let's Go Somewhere Real
        </Button>
      </CardActions>
    </Card>
  );
};

export default NotFound;
