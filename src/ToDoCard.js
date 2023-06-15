import { Box, Card, CardContent, Typography } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import format from "date-fns/format";

const ToDoCard = ({ toDo }) => {
  const formattedDueDate = format(
    new Date(toDo.dueDate),
    "EEEE, MMMM dd, yyyy"
  );

  return (
    <Card
      elevation={3}
      // variant="outlined"
      sx={{ m: 1, minWidth: 120, width: "90%" }}
    >
      <CardContent>
        <Typography variant="h5">{toDo.title}</Typography>
        {/* <Typography>Created By:{toDo.author}</Typography> */}
        <Typography>{toDo.description}</Typography>

        {/* <Typography>Created at:</Typography> */}
        <Typography>Due Date: {formattedDueDate}</Typography>
        {/* <Typography>Assignee:</Typography> */}
        <Typography>Priority: {toDo.priority}</Typography>
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
