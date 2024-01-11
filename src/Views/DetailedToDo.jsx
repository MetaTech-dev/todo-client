import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import ToDoContext from "../contexts/ToDoContext";
import dayjs from "dayjs";
import { useGetOneUser, useGetUserList } from "../hooks/user";
import { useGetOneToDo, useUpdateToDo } from "../hooks/toDo";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useGetStatusList } from "../hooks/status";
import LoadingDetailedToDo from "../components/loading/LoadingDetailedToDo";
import { LoadingButton } from "@mui/lab";
import { enqueueSnackbar } from "notistack";
import { DatePicker } from "@mui/x-date-pickers";

const DetailedToDo = () => {
  const {
    setIsDeleteConfirmationDialogOpen,
    setDeleteConfirmationItem,
    setDeleteConfirmationItemType,
  } = useContext(ToDoContext);

  const { pathname } = useLocation();
  const toDoId = useMemo(
    () => Number(decodeURIComponent(pathname.split("/")[2])),
    [pathname]
  );

  const { data: toDo, isPending: isToDoPending } = useGetOneToDo(toDoId);

  const {
    mutate: updateToDo,
    isPending: isUpdateToDoPending,
    isSuccess: isUpdateToDoSuccess,
  } = useUpdateToDo();

  const { data: statusList } = useGetStatusList();

  const { data: userList } = useGetUserList();

  const formatDate = (date) => {
    const dayjsDate = dayjs(date);
    return dayjsDate.isValid()
      ? dayjsDate.format("MMMM, DD, YYYY")
      : "none selected";
  };
  const { data: toDoAuthor } = useGetOneUser(toDo?.authorUserId);

  const formattedCreatedDate = formatDate(toDo?.createdDate);

  const [isEditing, setIsEditing] = useState(false);

  const [updateToDoData, setUpdateToDoData] = useState({
    title: "",
    description: "",
    dueDate: null,
    priority: "low",
    statusId: 1,
    assigneeUserId: null,
    id: null,
  });

  useEffect(() => {
    if (toDo) {
      setUpdateToDoData({
        title: toDo.title,
        description: toDo.description,
        createdDate: toDo.createdDate,
        authorUserId: toDo.authorUserId,
        dueDate: toDo.dueDate,
        priority: toDo.priority,
        statusId: toDo.statusId,
        assigneeUserId: toDo.assigneeUserId,
        id: toDo.id,
      });
    }
  }, [toDo]);

  const handleTextChange = useCallback((event) => {
    setIsEditing(true);
    setUpdateToDoData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSave = () => {
    updateToDo(updateToDoData);
  };

  useEffect(() => {
    if (isUpdateToDoSuccess) {
      enqueueSnackbar("ToDo updated successfully", { variant: "success" });
      setIsEditing(false);
    }
  }, [isUpdateToDoSuccess]);

  const handleAssigneeChange = (event, value) => {
    setIsEditing(true);
    const { user_id } = value;
    setUpdateToDoData((prev) => ({
      ...prev,
      assigneeUserId: user_id,
    }));
  };

  const handleDueDateChange = (newDate) => {
    setIsEditing(true);
    setUpdateToDoData((prev) => ({
      ...prev,
      dueDate: newDate,
    }));
  };

  const handleSelectChange = (event) => {
    setIsEditing(true);
    const { name, value } = event.target;

    setUpdateToDoData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setUpdateToDoData({
      title: toDo.title,
      description: toDo.description,
      dueDate: toDo.dueDate,
      priority: toDo.priority,
      statusId: toDo.statusId,
      assigneeUserId: toDo.assigneeUserId,
      id: toDo.id,
    });
    setIsEditing(false);
  };

  const handleDeleteClick = (event, item, itemType) => {
    event.preventDefault();
    setDeleteConfirmationItemType(itemType);
    setDeleteConfirmationItem(item);
    setIsDeleteConfirmationDialogOpen(true);
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
        <Card
          sx={{
            width: "90%",
            maxHeight: "90%",
          }}
        >
          <CardHeader
            title={
              <TextField
                type="text"
                variant="filled"
                id="toDoTitle"
                name="title"
                placeholder="Title"
                value={updateToDoData?.title}
                InputProps={{
                  style: { fontSize: "1.5rem" },
                }}
                onChange={handleTextChange}
                fullWidth
                required
              />
            }
            subheader={
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 1,
                }}
              >
                <Typography sx={{ mr: 1 }}>
                  Author: {toDoAuthor?.name}
                </Typography>
                <Avatar
                  src={toDoAuthor?.picture}
                  sx={{ height: 30, width: 30 }}
                />
                <Box sx={{ flex: 1 }} />
                <Typography sx={{ mr: 1 }}>
                  Created: {formattedCreatedDate}
                </Typography>
              </Box>
            }
            sx={{ backgroundColor: "transparent" }}
          />
          <CardContent>
            <Box sx={{ display: "flex" }}>
              <Autocomplete
                autoHighlight
                id="assignee-autocomplete"
                options={userList || []}
                value={
                  userList?.find(
                    (user) => user.user_id === updateToDoData.assigneeUserId
                  ) || null
                }
                getOptionLabel={(option) => option.user_id}
                sx={{ width: "17rem", mr: 1 }}
                renderOption={(props, option) => {
                  return (
                    <ListItem {...props} key={option.user_id}>
                      <ListItemAvatar>
                        <Avatar
                          src={option.picture}
                          sx={{ height: 30, width: 30 }}
                        />
                      </ListItemAvatar>
                      <ListItemText primary={option.name} />
                    </ListItem>
                  );
                }}
                onChange={handleAssigneeChange}
                renderInput={({
                  inputProps: { value, ...restInputProps },
                  InputProps,
                  ...restParams
                }) => {
                  const user = userList?.find((user) => user.user_id === value);
                  return (
                    <TextField
                      {...restParams}
                      value={user?.name || ""}
                      label="Assignee"
                      InputProps={{
                        ...InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <Avatar
                              src={user?.picture}
                              sx={{ height: 25, width: 25 }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      inputProps={{
                        ...restInputProps,
                        value: user?.name || "",
                      }}
                    />
                  );
                }}
                size="small"
              />
              <DatePicker
                sx={{
                  pb: 1,
                  pr: 1,
                  width: "10rem",
                  "& .MuiInputBase-root": {
                    pr: 1,
                    "& .MuiButtonBase-root": {
                      pl: 0,
                    },
                    "& .MuiInputBase-input": {
                      p: 1.1,
                      pr: 0,
                    },
                  },
                }}
                label="Date Due"
                value={
                  updateToDoData.dueDate ? dayjs(updateToDoData.dueDate) : null
                }
                onChange={handleDueDateChange}
                size="small"
                disablePast
              />
              <FormControl size="small" sx={{ mr: 1 }}>
                <InputLabel id="toDo-status-label">Status</InputLabel>
                <Select
                  labelId="toDo-status-label"
                  id="toDo-status-select"
                  name="statusId"
                  value={updateToDoData.statusId}
                  onChange={handleSelectChange}
                  label="status"
                >
                  {statusList?.map((status) => {
                    return (
                      <MenuItem value={status.id} key={status.id}>
                        <Chip label={status.title} size="small" />
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl size="small">
                <InputLabel id="toDo-priority-label">Priority</InputLabel>
                <Select
                  labelId="toDo-priority-label"
                  id="toDo-priority-select"
                  name="priority"
                  value={updateToDoData.priority}
                  onChange={handleSelectChange}
                  label="status"
                >
                  <MenuItem value="low">
                    <Chip label="Low" color="success" size="small" />
                  </MenuItem>
                  <MenuItem value="medium">
                    <Chip label="Medium" color="warning" size="small" />
                  </MenuItem>
                  <MenuItem value="high">
                    <Chip label="High" color="error" size="small" />
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
            <TextField
              type="text"
              variant="filled"
              id="toDoDescription"
              name="description"
              placeholder="Description"
              value={updateToDoData?.description}
              onChange={handleTextChange}
              multiline
              maxRows={15}
              minRows={3}
              sx={{ overflowY: "auto" }}
              fullWidth
              required
            />
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end", pt: 0, pb: 2 }}>
            {isEditing && (
              <>
                <LoadingButton
                  variant="contained"
                  size="small"
                  onClick={handleSave}
                  loading={isUpdateToDoPending}
                >
                  Save
                </LoadingButton>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleCancel}
                  sx={{ mr: 1.5 }}
                >
                  Cancel
                </Button>
              </>
            )}
            <Button
              size="small"
              variant="outlined"
              onClick={(event) => handleDeleteClick(event, toDo, "toDo")}
              sx={{ mr: 1 }}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      )}
    </Box>
  );
};

export default DetailedToDo;
