import {
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import CardActions from "@mui/material/CardActions";
import dayjs from "dayjs";
import ToDoContext from "./ToDoContext";
import { useContext } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const ToDoCard = ({ toDo }) => {
  const {
    deleteToDo,
    setToDoFormData,
    setIsToDoFormDialogOpen,
    setIsToDoFormNew,
  } = useContext(ToDoContext);

  const formattedDueDate = dayjs(toDo.dueDate).format("dddd, MMMM, DD, YYYY");

  const handleEdit = () => {
    setToDoFormData(toDo);
    setIsToDoFormNew(false);
    setIsToDoFormDialogOpen(true);
  };

  const handleDelete = () => {
    deleteToDo(toDo.id);
  };

  const getPriorityColor = () => {
    switch (toDo.priority) {
      case "low":
        return "green";
      case "medium":
        return "orange";
      case "high":
        return "red";
      default:
        return "green";
    }
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
          <b>Priority:</b> {toDo.priority}{" "}
          <FiberManualRecordIcon
            sx={{ fontSize: "small", color: getPriorityColor() }}
          />
        </Typography>
        <CardActions>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            size="small"
            color="inherit"
            onClick={() => handleEdit()}
            aria-label="Edit ToDo"
          >
            <EditTwoToneIcon />
          </IconButton>
          <IconButton
            size="small"
            color="inherit"
            onClick={() => handleDelete()}
            aria-label="Delete ToDo"
          >
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default ToDoCard;
