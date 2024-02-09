import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import DialogContext from "../contexts/DialogContext";
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
import { useTimeSince } from "../utils/useTimeSince";
import { useOrganization } from "@clerk/clerk-react";
import PrioritySelect from "../components/toDo/PrioritySelect";

const DetailedToDo = () => {
  const {
    setIsDeleteConfirmationDialogOpen,
    setDeleteConfirmationItem,
    setDeleteConfirmationItemType,
  } = useContext(DialogContext);

  const { pathname } = useLocation();
  const toDoId = useMemo(
    () => Number(decodeURIComponent(pathname.split("/")[2])),
    [pathname]
  );

  const { organization } = useOrganization();

  const { data: toDo, isPending: isToDoPending } = useGetOneToDo({
    id: toDoId,
  });

  const {
    mutate: updateToDo,
    isPending: isUpdateToDoPending,
    isSuccess: isUpdateToDoSuccess,
  } = useUpdateToDo();

  const { data: statusList } = useGetStatusList();

  const { data: userList } = useGetUserList();

  const { data: toDoAuthor } = useGetOneUser({ id: toDo?.authorUserId });

  const timeSince = useTimeSince(toDo?.createdDate);

  const [isEditing, setIsEditing] = useState(false);

  const [updateToDoData, setUpdateToDoData] = useState({
    title: "",
    description: "",
    dueDate: null,
    priority: "low",
    statusId: "",
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
        assigneeUserId: toDo.assigneeUserId || null,
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
    if (value) {
      const { id } = value;
      setUpdateToDoData((prev) => ({
        ...prev,
        assigneeUserId: id,
      }));
    } else {
      setUpdateToDoData((prev) => ({
        ...prev,
        assigneeUserId: null,
      }));
    }
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
        width: "100%",
        height: "100%",
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
                inputProps={{
                  sx: { fontSize: "1.5rem", pt: 1 },
                }}
                onChange={handleTextChange}
                fullWidth
                required
              />
            }
            sx={{ backgroundColor: "transparent" }}
          />
          <CardContent sx={{ pt: 0 }}>
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
              InputProps={{
                sx: { pt: 1.5 },
              }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                pt: 2,
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              {organization && (
                <Autocomplete
                  autoHighlight
                  id="assignee-autocomplete"
                  options={userList || []}
                  value={
                    userList?.find(
                      (user) => user.id === updateToDoData.assigneeUserId
                    ) || null
                  }
                  getOptionLabel={(option) => option.id}
                  sx={{ width: "17rem", pt: 1 }}
                  renderOption={(props, option) => {
                    return (
                      <ListItem {...props} key={option.id}>
                        <ListItemAvatar>
                          <Avatar
                            src={option.imageUrl}
                            sx={{ height: 24, width: 24 }}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={`${option?.firstName} ${option?.lastName}`}
                        />
                      </ListItem>
                    );
                  }}
                  onChange={handleAssigneeChange}
                  renderInput={({
                    inputProps: { value, ...restInputProps },
                    InputProps,
                    ...restParams
                  }) => {
                    const user = userList?.find((user) => user.id === value);
                    return (
                      <TextField
                        {...restParams}
                        value={`${user?.firstName} ${user?.lastName}`}
                        label="Assignee"
                        InputProps={{
                          ...InputProps,
                          startAdornment: (
                            <InputAdornment position="start">
                              <Avatar
                                src={user?.imageUrl}
                                sx={{ height: 24, width: 24 }}
                              />
                            </InputAdornment>
                          ),
                        }}
                        inputProps={{
                          ...restInputProps,
                          value: user
                            ? `${user?.firstName} ${user?.lastName}`
                            : "",
                        }}
                      />
                    );
                  }}
                  size="small"
                />
              )}
              <Box sx={{ pt: 1 }}>
                <DatePicker
                  slotProps={{
                    actionBar: {
                      actions: ["clear"],
                    },
                    textField: {
                      size: "small",
                      InputLabelProps: { shrink: true },
                    },
                  }}
                  sx={{
                    width: "12rem",
                  }}
                  label="Date Due"
                  value={
                    updateToDoData.dueDate
                      ? dayjs(updateToDoData.dueDate)
                      : null
                  }
                  onChange={handleDueDateChange}
                  size="small"
                  disablePast
                />
              </Box>
              <Box sx={{ pt: 1 }}>
                <FormControl size="small" sx={{}}>
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
                <PrioritySelect
                  value={updateToDoData.priority}
                  onChange={handleSelectChange}
                  sx={{ ml: 1 }}
                />
              </Box>
            </Box>
          </CardContent>
          <CardActions sx={{ p: 2, pt: 0, flexWrap: "wrap" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {organization && (
                <Avatar
                  src={toDoAuthor?.imageUrl}
                  sx={{ height: 24, width: 24, mr: 0.5 }}
                />
              )}
              <Typography sx={{ mr: 1 }} variant="caption">
                {organization
                  ? `${toDoAuthor?.firstName} ${toDoAuthor?.lastName} created ${timeSince}`
                  : `created ${timeSince}`}
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              {isEditing && (
                <>
                  <LoadingButton
                    variant="contained"
                    onClick={handleSave}
                    loading={isUpdateToDoPending}
                    sx={{ mr: 1 }}
                  >
                    Save
                  </LoadingButton>
                  <Button
                    variant="outlined"
                    onClick={handleCancel}
                    sx={{ mr: 1 }}
                  >
                    Cancel
                  </Button>
                </>
              )}
              <Button
                variant="outlined"
                onClick={(event) => handleDeleteClick(event, toDo, "toDo")}
                sx={{
                  color: "error.main",
                }}
              >
                Delete
              </Button>
            </Box>
          </CardActions>
        </Card>
      )}
    </Box>
  );
};

export default DetailedToDo;
