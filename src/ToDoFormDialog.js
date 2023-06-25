import { useContext, useEffect, useState } from "react";
import ToDoContext from "./ToDoContext";
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
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

const ToDoForm = ({ isOpen, setIsOpen, toDo }) => {
  const {
    createToDo,
    isNewToDo,
    defaultNewToDo,
    statusList,
    updateToDo,
    toDoData,
    setToDoData,
    // formData,
    // setFormData,
  } = useContext(ToDoContext);

  const toDoFormTitle = (isNewToDo) => {
    return isNewToDo ? "New ToDo:" : "Update ToDo:";
  };

  const [showWarning, setShowWarning] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    setToDoData(defaultNewToDo);
    setShowWarning(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setToDoData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (isNewToDo) => {
    const trimmedTitle = toDoData.title.trim();
    const trimmedDescription = toDoData.description.trim();

    if (trimmedTitle !== "" && trimmedDescription !== "") {
      if (isNewToDo) {
        createToDo(toDoData);
      } else {
        updateToDo(toDoData);
      }
      setIsOpen(false);
      setToDoData(defaultNewToDo);
      setShowWarning(false);
    } else {
      setShowWarning(true);
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{toDoFormTitle(isNewToDo)}</DialogTitle>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(isNewToDo);
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
            value={toDoData.title}
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
            value={toDoData.description}
            onChange={handleInputChange}
            sx={{ paddingBottom: "1rem" }}
            required
          />
          <DatePicker
            sx={{ paddingBottom: "1rem" }}
            label="Date Due"
            value={toDoData.dueDate}
            onChange={(newDate) =>
              setToDoData((prev) => ({
                ...prev,
                dueDate: newDate,
                // instanceof Date ? newDate : new Date(newDate)
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
              value={toDoData.priority}
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
              value={toDoData.status}
              onChange={handleInputChange}
              label="status"
            >
              {statusList.map((status) => {
                return (
                  <MenuItem value={status} key={status}>
                    {status}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ToDoForm;
