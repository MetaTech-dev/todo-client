import { Box, Card, CardContent, Typography } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

const ToDoCard = () => {
  return (
    <Card variant="outlined" sx={{ m: 1, minWidth: 120, width: "90%" }}>
      <CardContent>
        <Typography variant="h5">Title</Typography>
        <Typography>Created By:</Typography>
        <Typography>Description:</Typography>

        <Typography>Created at:</Typography>
        <Typography>Due Date:</Typography>
        <Typography>Assignee:</Typography>
        <Typography>Priority:</Typography>
        <CardActions>
          <Box sx={{ flexGrow: 1 }} />
          <Button size="small" variant="outlined">
            Edit
          </Button>
          <Button size="small" variant="outlined">
            Delete
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default ToDoCard;
