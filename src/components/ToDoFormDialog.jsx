import { useContext, useEffect, useState } from "react";
import ToDoContext from "../contexts/ToDoContext";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Alert,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import LoadingButton from "@mui/lab/LoadingButton";
import dayjs from "dayjs";
import { useCreateToDo, useUpdateToDo } from "../hooks/toDo";
import { useGetStatusList } from "../hooks/status";

const ToDoForm = () => {
  const {
    defaultNewToDo,
    toDoFormData,
    setToDoFormData,
    isToDoFormDialogOpen,
    setIsToDoFormDialogOpen,
  } = useContext(ToDoContext);

  const [showWarning, setShowWarning] = useState("");

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setToDoFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toDoFormTitle = (toDo) => {
    return !toDo.id ? "New ToDo:" : "Update ToDo:";
  };

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
            id="taskTitle"
            label="Title"
            name="title"
            type="text"
            fullWidth
            variant="standard"
            value={toDoFormData.title}
            onChange={handleInputChange}
            required
          />
          <TextField
            margin="dense"
            id="taskDescription"
            label="Description"
            name="description"
            type="text"
            fullWidth
            variant="standard"
            value={toDoFormData.description}
            onChange={handleInputChange}
            sx={{ paddingBottom: "1rem" }}
            required
            multiline
          />
          <DatePicker
            sx={{ paddingBottom: "1rem" }}
            label="Date Due"
            value={toDoFormData.dueDate ? dayjs(toDoFormData.dueDate) : null}
            onChange={(newDate) =>
              setToDoFormData((prev) => ({
                ...prev,
                dueDate: newDate,
              }))
            }
            disablePast
          />
          {/* TODO: look into double labels */}
          <FormControl fullWidth size="small" sx={{ paddingBottom: "1rem" }}>
            <InputLabel id="toDo-priority-label">Priority</InputLabel>
            <Select
              labelId="toDo-priority-label"
              id="toDo-priority-select"
              name="priority"
              value={toDoFormData.priority}
              onChange={handleInputChange}
              label="priority"
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth size="small">
            <InputLabel id="toDo-status-label">Status</InputLabel>
            <Select
              labelId="toDo-status-label"
              id="toDo-status-select"
              name="statusId"
              value={toDoFormData.statusId}
              onChange={handleInputChange}
              label="status"
            >
              {statusList?.map((status) => {
                return (
                  <MenuItem value={status.id} key={status.id}>
                    {status.title}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
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
