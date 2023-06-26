import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
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
    <Card elevation={3} sx={{ m: 1, width: "90%" }}>
      <CardContent>
        <Typography variant="h5">{toDo.title}</Typography>
        <Divider />
        {/* <Typography>Created By:{toDo.author}</Typography> */}
        <Typography>{toDo.description}</Typography>

        {/* <Typography>Created at:</Typography> */}
        <Divider sx={{ padding: ".5rem" }} />
        <Typography>
          <b>Due Date:</b> {formattedDueDate}
        </Typography>
        {/* <Typography>Assignee:</Typography> */}
        <Typography>
          <b>Priority:</b> {toDo.priority}
        </Typography>
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
