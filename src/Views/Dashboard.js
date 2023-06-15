import { useContext, useState } from "react";
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
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ToDoCard from "../ToDoCard";
import { DatePicker } from "@mui/x-date-pickers";
import ToDoContext from "../ToDoContext";

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

const Dashboard = () => {
  const [newToDo, setNewToDo] = useState(defaultNewToDo);

  const [open, setOpen] = useState(false);

  const { createToDo, toDoList } = useContext(ToDoContext);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
    createToDo(newToDo);
    setNewToDo(defaultNewToDo);
    setOpen(false);
  };

  return (
    <Box>
      <Button color="inherit" variant="contained" onClick={handleOpen}>
        New ToDo:
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New ToDo:</DialogTitle>
        <DialogContent>
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
      <Box
        id="stack-holder"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          overflowX: "auto",
        }}
      >
        <Stack sx={{ height: "100%", width: "100%", alignItems: "center" }}>
          <Typography>New</Typography>
          <Paper elevation={2}>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {toDoList.map((toDo) => {
                return (
                  <li key={toDo.id}>
                    <ToDoCard toDo={toDo} />
                  </li>
                );
              })}
            </ul>
          </Paper>
        </Stack>
        <Stack sx={{ height: "100%", width: "100%", alignItems: "center" }}>
          <Typography>Ready</Typography>
        </Stack>
        <Stack sx={{ height: "100%", width: "100%", alignItems: "center" }}>
          <Typography>In Progress</Typography>
        </Stack>
        <Stack sx={{ height: "100%", width: "100%", alignItems: "center" }}>
          <Typography>In Review</Typography>
        </Stack>
        <Stack sx={{ height: "100%", width: "100%", alignItems: "center" }}>
          <Typography>Done</Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default Dashboard;
