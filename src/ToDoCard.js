import { Box, Card, CardContent, Typography } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import ToDoContext from "./ToDoContext";
import { useContext } from "react";

const ToDoCard = ({ toDo }) => {
  const { deleteToDo } = useContext(ToDoContext);

  const formattedDueDate = dayjs(toDo.dueDate).format("dddd, MMMM, DD, YYYY");

  const handleDelete = () => {
    deleteToDo(toDo.id);
  };

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
          <Button size="small" variant="outlined" onClick={handleDelete}>
            Delete
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default ToDoCard;
