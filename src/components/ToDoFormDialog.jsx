import { useContext, useEffect, useState } from "react";
import DialogContext from "../contexts/DialogContext";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Alert,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useCreateToDo, useUpdateToDo } from "../hooks/toDo";
import { useGetUserList } from "../hooks/user";
import { useOrganization } from "@clerk/clerk-react";
import AppContext from "../contexts/AppContext";
import PrioritySelect from "./toDoForms/PrioritySelect";
import StatusSelect from "./toDoForms/StatusSelect";
import DateSelector from "./toDoForms/DateSelector";
import AssigneeSelect from "./toDoForms/AssigneeSelect";
import { useGetStatusList } from "../hooks/status";

const ToDoForm = () => {
  const {
    defaultNewToDo,
    toDoFormData,
    setToDoFormData,
    isToDoFormDialogOpen,
    setIsToDoFormDialogOpen,
  } = useContext(DialogContext);

  const { isMobile } = useContext(AppContext);
  const { organization } = useOrganization();
  const [showWarning, setShowWarning] = useState("");

  const { data: userList } = useGetUserList();
  const { data: statusList } = useGetStatusList();

  const {
    mutate: createToDo,
    isPending: isCreateToDoPending,
    isSuccess: isCreateToDoSuccess,
  } = useCreateToDo();

  const {
    mutate: updateToDo,
    isPending: isUpdateToDoPending,
    isSuccess: isUpdateToDoSuccess,
  } = useUpdateToDo();

  const handleClose = () => {
    setIsToDoFormDialogOpen(false);
    setShowWarning(false);
    setToDoFormData(defaultNewToDo);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setToDoFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toDoFormTitle = (toDo) => (!toDo.id ? "New ToDo:" : "Update ToDo:");

  useEffect(() => {
    if (isCreateToDoSuccess || isUpdateToDoSuccess) {
      handleClose();
    }
  }, [isCreateToDoSuccess, isUpdateToDoSuccess]);

  const handleSubmit = (toDo) => {
    const trimmedTitle = toDoFormData.title.trim();
    const trimmedDescription = toDoFormData.description.trim();

    if (trimmedTitle !== "" && trimmedDescription !== "") {
      if (!toDo.id) {
        createToDo(toDoFormData);
      } else if (toDo.id) {
        updateToDo(toDoFormData);
      }
      setIsToDoFormDialogOpen(false);
      setToDoFormData(defaultNewToDo);
      setShowWarning(false);
    } else {
      setShowWarning(true);
    }
  };

  return (
    <Dialog open={isToDoFormDialogOpen} onClose={handleClose}>
      <DialogTitle>{toDoFormTitle(toDoFormData)}</DialogTitle>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(toDoFormData);
        }}
      >
        <DialogContent>
          {showWarning && (
            <Alert severity="warning">
              Title and Description must be filled out
            </Alert>
          )}
          <TextField
            autoFocus
            margin="dense"
            id="toDoTitle"
            label="Title"
            name="title"
            type="text"
            fullWidth
            variant="standard"
            value={toDoFormData.title}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            id="toDoDescription"
            label="Description"
            name="description"
            type="text"
            fullWidth
            variant="standard"
            value={toDoFormData.description}
            onChange={handleChange}
            sx={{ pb: "1rem" }}
            required
            multiline
          />
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <DateSelector
              value={toDoFormData.dueDate}
              onChange={handleChange}
              sx={{ pb: "1rem", pr: "1rem" }}
            />
            {organization && (
              <AssigneeSelect
                value={
                  userList?.find(
                    (user) => user.id === toDoFormData.assigneeUserId
                  ) || null
                }
                onChange={handleChange}
                sx={{
                  width: isMobile ? "100% " : "17rem",
                  pb: 2,
                }}
              />
            )}
          </Box>
          <PrioritySelect
            value={toDoFormData.priority}
            onChange={handleChange}
            sx={{ pb: "1rem" }}
            fullWidth={true}
          />
          {statusList && (
            <StatusSelect
              value={toDoFormData.statusId}
              onChange={handleChange}
              fullWidth={true}
              statusList={statusList}
            />
          )}
        </DialogContent>
        <DialogActions>
          <LoadingButton
            loading={isCreateToDoPending || isUpdateToDoPending}
            type="submit"
          >
            Submit
          </LoadingButton>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ToDoForm;
