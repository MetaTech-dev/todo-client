import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import CardActions from "@mui/material/CardActions";
import dayjs from "dayjs";
import ToDoContext from "../contexts/ToDoContext";
import { useContext, useEffect, useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Draggable } from "react-beautiful-dnd";
import { Link as RouterLink } from "react-router-dom";
import { useGetOneUser } from "../hooks/user";

const ToDoCard = ({ toDo, index, activeCard, isDragging }) => {
  const {
    setToDoFormData,
    setIsToDoFormDialogOpen,
    setIsDeleteConfirmationDialogOpen,
    setDeleteConfirmationItem,
    setDeleteConfirmationItemType,
  } = useContext(ToDoContext);

  const [isStatic, setIsStatic] = useState(false);

  useEffect(() => {
    if (isDragging && !activeCard) {
      setIsStatic(true);
    } else if (!isDragging || activeCard) {
      setIsStatic(false);
    }
  }, [isDragging, activeCard]);

  const formatDate = (date) => {
    const dayjsDate = dayjs(date);
    return dayjsDate.isValid()
      ? dayjsDate.format("ddd, MMMM, DD, YYYY")
      : "none selected";
  };
  const { data: toDoAuthor } = useGetOneUser(toDo.authorUserId);

  const formattedCreatedDate = formatDate(toDo.createdDate);
  const formattedDueDate = formatDate(toDo.dueDate);

  const handleEdit = (event) => {
    event.preventDefault();
    setToDoFormData(toDo);
    setIsToDoFormDialogOpen(true);
  };

  const handleDeleteClick = (event, item, itemType) => {
    event.preventDefault();
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

  const cardElevation = isStatic && isDragging ? 1 : activeCard ? 5 : 2;

  return (
    <Draggable draggableId={toDo.id.toString()} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          elevation={cardElevation}
          sx={(theme) => ({
            maxWidth: theme.spacing(40),
            marginBottom: 1,
            opacity: isStatic ? 0.4 : 1,
          })}
        >
          <CardActionArea component={RouterLink} to={`/todos/${toDo.id}`}>
            <CardContent sx={{ p: 1.5, "&:last-child": { paddingBottom: 1 } }}>
              <Typography variant="h5">{toDo.title}</Typography>
              <Divider />
              <Typography>{handleDescription()}</Typography>
              <Divider sx={{ mb: 1 }} />
              <Typography>
                <b>Author:</b> {toDoAuthor?.name}
              </Typography>
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
                    onClick={(event) => handleEdit(event)}
                    aria-label="Edit ToDo"
                  >
                    <EditTwoToneIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="inherit"
                    onClick={(event) => handleDeleteClick(event, toDo, "toDo")}
                    aria-label="Delete ToDo"
                  >
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </CardActions>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    </Draggable>
  );
};

export default ToDoCard;
