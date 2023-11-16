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
import ToDoContext from "../contexts/ToDoContext";
import { useContext } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const ToDoCard = ({ toDo }) => {
  const { deleteToDo, setToDoFormData, setIsToDoFormDialogOpen } =
    useContext(ToDoContext);

  const dueDate = dayjs(toDo.dueDate);
  const formattedDueDate = dueDate.isValid()
    ? dueDate.format("dddd, MMMM, DD, YYYY")
    : "none selected";

  const handleEdit = () => {
    setToDoFormData(toDo);
    setIsToDoFormDialogOpen(true);
  };

  const handleDelete = () => {
    deleteToDo(toDo.id);
  };

  const getPriorityColor = () => {
    switch (toDo.priority) {
      case "low":
        return "success.main";
      case "medium":
        return "warning.main";
      case "high":
        return "error.main";
      default:
        return "success.main";
    }
  };

  const handleDescription = () => {
    if (toDo.description.length > 400) {
      return toDo.description.substring(0, 400) + "... (click edit to expand)";
    } else {
      return toDo.description;
    }
  };

  return (
    <Card
      elevation={3}
      sx={(theme) => ({
        maxWidth: theme.spacing(40),
        marginBottom: 1,
      })}
    >
      <CardContent sx={{ "&:last-child": { paddingBottom: 0.5 } }}>
        <Typography variant="h5">{toDo.title}</Typography>
        <Divider />
        {/* <Typography>Created By:{toDo.author}</Typography> */}
        <Typography>{handleDescription()}</Typography>

        {/* <Typography>Created at:</Typography> */}
        <Divider sx={{ mb: 1 }} />
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
