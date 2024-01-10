import { useContext, useMemo } from "react";
import ToDoContext from "../contexts/ToDoContext";
import dayjs from "dayjs";
import { useGetOneUser } from "../hooks/user";
import { useGetOneToDo } from "../hooks/toDo";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import { useLocation } from "react-router-dom";
import { useGetOneStatus } from "../hooks/status";
import { useTheme } from "@emotion/react";
import LoadingDetailedToDo from "../components/loading/LoadingDetailedToDo";

const DetailedToDo = () => {
  const {
    setToDoFormData,
    setIsToDoFormDialogOpen,
    setIsDeleteConfirmationDialogOpen,
    setDeleteConfirmationItem,
    setDeleteConfirmationItemType,
  } = useContext(ToDoContext);

  const { pathname } = useLocation();
  const toDoId = useMemo(
    () => Number(decodeURIComponent(pathname.split("/")[2])),
    [pathname]
  );

  const theme = useTheme();

  const { data: toDo, isPending: isToDoPending } = useGetOneToDo(toDoId);

  const { data: toDoStatus } = useGetOneStatus(toDo?.statusId);

  const formatDate = (date) => {
    const dayjsDate = dayjs(date);
    return dayjsDate.isValid()
      ? dayjsDate.format("ddd, MMMM, DD, YYYY")
      : "none selected";
  };
  const { data: toDoAuthor } = useGetOneUser(toDo?.authorUserId);

  const { data: toDoAssignee } = useGetOneUser(toDo?.assigneeUserId);

  const formattedCreatedDate = formatDate(toDo?.createdDate);
  const formattedDueDate = formatDate(toDo?.dueDate);

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

  return (
    <Box
      id="detailed-todo-container"
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "neutral.main",
      }}
    >
      {isToDoPending ? (
        <LoadingDetailedToDo />
      ) : (
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 2,
          }}
        >
          <Box sx={(theme) => ({ display: "flex", width: theme.spacing(120) })}>
            <Card elevation={2} sx={{ flex: 6, mr: 2 }}>
              <CardContent
                sx={{ p: 1.5, "&:last-child": { paddingBottom: 1 } }}
              >
                <Typography variant="h5">{toDo?.title}</Typography>
                <Divider />
                <Typography
                  sx={{
                    overflowY: "auto",
                    maxHeight: "30rem",
                  }}
                >
                  {toDo?.description}
                </Typography>
              </CardContent>
            </Card>
            <Card elevation={2} sx={{ flex: 3 }}>
              <CardContent
                sx={{ p: 1.5, "&:last-child": { paddingBottom: 1 } }}
              >
                {/* <Box sx={{ display: "flex", alignItems: "center" }}> */}
                <Typography variant="h6">{toDoStatus?.title}</Typography>
                {/* </Box> */}
                <Divider sx={{ mb: 1 }} />
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography>
                    <b>Author:</b>
                  </Typography>
                  <Avatar
                    src={toDoAuthor?.picture}
                    sx={{ height: 30, width: 30, ml: 0.5, mr: 0.5 }}
                  />
                  <Typography>{toDoAuthor?.name}</Typography>
                </Box>
                <Divider sx={{ mb: 1 }} />
                {toDoAssignee && (
                  <>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography>
                        <b>Assignee:</b>
                      </Typography>
                      <Avatar
                        src={toDoAssignee?.picture}
                        sx={{ height: 30, width: 30, ml: 0.5, mr: 0.5 }}
                      />
                      <Typography>{toDoAssignee?.name}</Typography>
                    </Box>
                    <Divider sx={{ mb: 1 }} />
                  </>
                )}
                <Typography>
                  <b>Created at:</b> {formattedCreatedDate}
                </Typography>
                <Divider sx={{ mb: 1 }} />
                <Typography>
                  <b>Due Date:</b> {formattedDueDate}
                </Typography>
                <Divider sx={{ mb: 1 }} />
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography>
                    <b>Priority:</b>
                  </Typography>

                  <Chip
                    size="small"
                    color={getPriorityColor()}
                    label={toDo?.priority}
                  />
                </Box>
                <Box sx={{ flexGrow: 1 }} />
              </CardContent>
            </Card>
          </Box>

          <CardActions
            sx={{ p: 0, display: "flex", justifyContent: "flex-end" }}
          >
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
        </Paper>
      )}
    </Box>
  );
};

export default DetailedToDo;
