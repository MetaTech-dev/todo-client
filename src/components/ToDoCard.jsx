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
import { Draggable } from "react-beautiful-dnd";

const ToDoCard = ({ toDo, index }) => {
  const {
    setToDoFormData,
    setIsToDoFormDialogOpen,
    setIsDeleteConfirmationDialogOpen,
    setDeleteConfirmationItem,
    setDeleteConfirmationItemType,
  } = useContext(ToDoContext);

  const formatDate = (date) => {
    const dayjsDate = dayjs(date);
    return dayjsDate.isValid()
      ? dayjsDate.format("ddd, MMMM, DD, YYYY")
      : "none selected";
  };

  const formattedCreatedDate = formatDate(toDo.createdDate);
  const formattedDueDate = formatDate(toDo.dueDate);

  const handleEdit = () => {
    setToDoFormData(toDo);
    setIsToDoFormDialogOpen(true);
  };

  const handleDeleteClick = (item, itemType) => {
    setDeleteConfirmationItemType(itemType);
    setDeleteConfirmationItem(item);
    setIsDeleteConfirmationDialogOpen(true);
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
  // console.log("draggableId", toDo.id.toString());
  return (
    <Draggable draggableId={toDo.id.toString()} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          elevation={3}
          sx={(theme) => ({
            maxWidth: theme.spacing(40),
            marginBottom: 1,
          })}
        >
          <CardContent sx={{ p: 1.5, "&:last-child": { paddingBottom: 1 } }}>
            <Typography variant="h5">{toDo.title}</Typography>
            <Divider />
            <Typography>{handleDescription()}</Typography>
            <Divider sx={{ mb: 1 }} />
            <Typography>
              <b>Created at:</b> {formattedCreatedDate}
            </Typography>
            <Divider sx={{ mb: 1 }} />
            <Typography>
              <b>Due Date:</b> {formattedDueDate}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography>
                <b>Priority:</b> {toDo.priority}{" "}
              </Typography>
              <FiberManualRecordIcon
                sx={{
                  fontSize: "small",
                  color: getPriorityColor(),
                  ml: 0.5,
                }}
              />
              <Box sx={{ flexGrow: 1 }} />
              <CardActions sx={{ p: 0 }}>
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
                  onClick={() => handleDeleteClick(toDo, "toDo")}
                  aria-label="Delete ToDo"
                >
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              </CardActions>
            </Box>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
};

export default ToDoCard;
