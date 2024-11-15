import { useContext, useEffect, useMemo, useState } from "react";
import DialogContext from "../contexts/DialogContext";
import { useGetOneUser, useGetUserList } from "../hooks/user";
import { useGetOneToDo, useUpdateToDo } from "../hooks/toDo";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import LoadingDetailedToDo from "../components/loading/LoadingDetailedToDo";
import { LoadingButton } from "@mui/lab";
import { enqueueSnackbar } from "notistack";
import { useTimeSince } from "../utils/useTimeSince";
import { useOrganization } from "@clerk/clerk-react";
import PrioritySelect from "../components/toDoForms/PrioritySelect";
import StatusSelect from "../components/toDoForms/StatusSelect";
import DateSelector from "../components/toDoForms/DateSelector";
import AssigneeSelect from "../components/toDoForms/AssigneeSelect";
import { useGetStatusList } from "../hooks/status";

const DetailedToDo = () => {
  const {
    setIsDeleteConfirmationDialogOpen,
    setDeleteConfirmationItem,
    setDeleteConfirmationItemType,
    defaultUpdateToDoData,
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
  const { data: userList } = useGetUserList();
  const { data: toDoAuthor } = useGetOneUser({ id: toDo?.authorUserId });
  const { data: statusList } = useGetStatusList();

  const {
    mutate: updateToDo,
    isPending: isUpdateToDoPending,
    isSuccess: isUpdateToDoSuccess,
  } = useUpdateToDo();

  const timeSince = useTimeSince(toDo?.createdDate);

  const [isEditing, setIsEditing] = useState(false);
  const [updateToDoData, setUpdateToDoData] = useState(defaultUpdateToDoData);
  const assigneeValue = useMemo(
    () =>
      userList?.find((user) => user.id === updateToDoData.assigneeUserId) ||
      null,
    [updateToDoData.assigneeUserId, userList]
  );

  useEffect(() => {
    if (toDo) {
      setUpdateToDoData({
        ...toDo,
        assigneeUserId: toDo.assigneeUserId ?? null,
      });
    }
  }, [toDo]);

  const handleSave = () => {
    updateToDo(updateToDoData);
  };

  useEffect(() => {
    if (isUpdateToDoSuccess) {
      enqueueSnackbar("ToDo updated successfully", { variant: "success" });
      setIsEditing(false);
    }
  }, [isUpdateToDoSuccess]);

  const handleChange = (event) => {
    setIsEditing(true);
    const { name, value } = event.target;

    setUpdateToDoData((prev) => ({
      ...prev,
      [name]: value ?? null,
    }));
  };

  const handleCancel = () => {
    setUpdateToDoData(toDo);
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
                onChange={handleChange}
                fullWidth
                required
              />
            }
            avatar={
              <Avatar sx={{ height: 50, width: 50, color: "inherit" }}>
                {toDo.id}
              </Avatar>
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
              onChange={handleChange}
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
                <AssigneeSelect
                  value={assigneeValue}
                  onChange={handleChange}
                  sx={{ width: "17rem", pt: 1 }}
                />
              )}
              <Box sx={{ pt: 1 }}>
                <DateSelector
                  value={updateToDoData.dueDate}
                  onChange={handleChange}
                  sx={{ width: "12rem" }}
                />
              </Box>
              <Box sx={{ pt: 1 }}>
                {statusList && (
                  <StatusSelect
                    value={updateToDoData.statusId}
                    onChange={handleChange}
                    statusList={statusList}
                  />
                )}
                <PrioritySelect
                  value={updateToDoData.priority}
                  onChange={handleChange}
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
                sx={{ color: "error.main" }}
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
