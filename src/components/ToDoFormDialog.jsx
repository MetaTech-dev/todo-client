import { useContext, useState } from "react";
import ToDoContext from "../contexts/ToDoContext";
import {
  Box,
  Button,
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
  CircularProgress,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import AppSettingsContext from "../contexts/AppSettingsContext";

const ToDoForm = () => {
  const {
    createToDo,
    isToDoFormNew,
    defaultNewToDo,
    statusList,
    updateToDo,
    toDoFormData,
    setToDoFormData,
    isToDoFormDialogOpen,
    setIsToDoFormDialogOpen,
  } = useContext(ToDoContext);

  const { isLoading, setIsLoading } = useContext(AppSettingsContext);

  const toDoFormTitle = (isToDoFormNew) => {
    return isToDoFormNew ? "New ToDo:" : "Update ToDo:";
  };

  const [showWarning, setShowWarning] = useState(false);

  const handleClose = () => {
    setIsToDoFormDialogOpen(false);
    setToDoFormData(defaultNewToDo);
    setShowWarning(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setToDoFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (isToDoFormNew) => {
    const trimmedTitle = toDoFormData.title.trim();
    const trimmedDescription = toDoFormData.description.trim();

    if (trimmedTitle !== "" && trimmedDescription !== "") {
      if (isToDoFormNew) {
        createToDo(toDoFormData);
      } else {
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
      <DialogTitle>{toDoFormTitle(isToDoFormNew)}</DialogTitle>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(isToDoFormNew);
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
            autoFocus
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
            value={toDoFormData.dueDate}
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
              name="status"
              value={toDoFormData.status}
              onChange={handleInputChange}
              label="status"
            >
              {statusList.map((status) => {
                return (
                  <MenuItem value={status.title} key={status.id}>
                    {status.title}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          {!isLoading && <Button type="submit">Submit</Button>}
          {isLoading && <CircularProgress size={25} sx={{ marginRight: 2 }} />}
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ToDoForm;
