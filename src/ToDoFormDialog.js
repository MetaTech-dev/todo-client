import { useContext, useState } from "react";
import ToDoContext from "./ToDoContext";
import {
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

const defaultNewToDo = {
  title: "",
  description: "",
  author: "",
  createdDate: "",
  dueDate: null,
  assignee: "",
  priority: "low",
  status: "new",
  id: "",
};

const ToDoForm = ({ isOpen, setIsOpen }) => {
  const { createToDo } = useContext(ToDoContext);
  const [newToDo, setNewToDo] = useState(defaultNewToDo);
  const [showWarning, setShowWarning] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewToDo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handlePriorityChange = (event) => {
    setNewToDo((prev) => ({
      ...prev,
      priority: event.target.value,
    }));
  };
  const handleStatusChange = (event) => {
    setNewToDo((prev) => ({
      ...prev,
      status: event.target.value,
    }));
  };
  const handleSubmit = () => {
    if (newToDo.title !== "" || newToDo.description !== "") {
      createToDo(newToDo);
      setNewToDo(defaultNewToDo);
      setIsOpen(false);
    } else {
      setShowWarning(true);
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>New ToDo:</DialogTitle>
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
          value={newToDo.title}
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
          value={newToDo.description}
          onChange={handleInputChange}
          sx={{ paddingBottom: "1rem" }}
          required
        />
        <DatePicker
          sx={{ paddingBottom: "1rem" }}
          label="Date Due"
          value={newToDo.dueDate}
          onChange={(newDate) =>
            setNewToDo((prev) => ({
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
            name="toDoPriority"
            value={newToDo.priority}
            onChange={handlePriorityChange}
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
            name="toDoStatus"
            value={newToDo.status}
            onChange={handleStatusChange}
            label="status"
          >
            <MenuItem value="new">New</MenuItem>
            <MenuItem value="ready">Ready</MenuItem>
            <MenuItem value="in progress">In Progress</MenuItem>
            <MenuItem value="in review">In Review</MenuItem>
            <MenuItem value="done">Done</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleSubmit()}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ToDoForm;
