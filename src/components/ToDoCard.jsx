import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Link as RouterLink } from "react-router-dom";
import { useGetOneUser } from "../hooks/user";
import dayjs from "dayjs";

const ToDoCard = ({ toDo, index, activeCard, isDragging }) => {
  const [isStatic, setIsStatic] = useState(false);

  useEffect(() => {
    if (isDragging && !activeCard) {
      setIsStatic(true);
    } else if (!isDragging || activeCard) {
      setIsStatic(false);
    }
  }, [isDragging, activeCard]);

  const { data: toDoAssignee } = useGetOneUser({ id: toDo.assigneeUserId });

  const getPriorityColor = () => {
    switch (toDo?.priority) {
      case "low":
        return "success";
      case "medium":
        return "warning";
      case "high":
        return "error";
      default:
        return "success";
    }
  };

  const formatDate = (date) => {
    const dayjsDate = dayjs(date);
    return dayjsDate.isValid() ? dayjsDate.format("M/D/YYYY") : "none selected";
  };

  const dueDate = formatDate(toDo?.dueDate);

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
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6">{toDo.title}</Typography>
                {toDoAssignee && (
                  <Avatar
                    src={toDoAssignee?.imageUrl}
                    sx={{ height: 25, width: 25, ml: 1 }}
                  />
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "end",
                }}
              >
                <Chip
                  size="small"
                  color={getPriorityColor()}
                  label={toDo?.priority}
                  sx={{ mt: 1 }}
                />
                {toDo.dueDate && (
                  <Typography
                    variant="body1"
                    sx={{
                      opacity: 0.5,
                      fontSize: "14px",
                    }}
                  >
                    Due: {dueDate}
                  </Typography>
                )}
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    </Draggable>
  );
};

export default ToDoCard;
