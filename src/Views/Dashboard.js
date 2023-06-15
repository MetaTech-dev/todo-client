import { useContext, useEffect, useState } from "react";
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
import { v4 as uuidv4 } from "uuid";

const defaultNewToDo = {
  title: "",
  description: "",
  author: "",
  createdDate: "",
  dueDate: null,
  assignee: "",
  priority: "low",
  id: uuidv4(),
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
  const handleSubmit = () => {
    createToDo(newToDo);
    setNewToDo(defaultNewToDo);
    setOpen(false);
  };

  useEffect(() => {
    console.log("Task List:", toDoList);
  }, [toDoList]);

  return (
    <Box>
      <Button color="inherit" variant="contained" onClick={handleOpen}>
        New Task:
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Task:</DialogTitle>
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
          />
          <DatePicker
            sx={{ paddingBottom: "1rem" }}
            label="Date Due"
            value={newToDo.dueDate}
            onChange={(newDate) =>
              setNewToDo((prev) => ({
                ...prev,
                dueDate: newDate instanceof Date ? newDate : new Date(newDate),
              }))
            }
          />
          <FormControl fullWidth size="small">
            <InputLabel id="task-priority-label">Priority</InputLabel>
            <Select
              labelId="task-priority-label"
              id="task-priority-select"
              name="taskPriority"
              value={newToDo.priority}
              onChange={handlePriorityChange}
              label="priority"
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
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
