import {
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
} from "@mui/material";
import Select from "@mui/material/Select";
import { useState } from "react";

const ToDoCard = () => {
  const [toDoStatus, setToDoStatus] = useState("new");
  const [priority, setPriority] = useState("low");

  const handleToDoStatusChange = (e) => {
    setToDoStatus(e.target.value);
  };
  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  return (
    <Card>
      <CardContent>
        <FormControl variant="outlined">
          <Typography>Created By:</Typography>
          <Typography>Title:</Typography>
          <Typography>Description:</Typography>
          <InputLabel id="status-select-label">Status:</InputLabel>
          <Select
            labelId="status-select-label"
            id="status-select"
            value={toDoStatus}
            onChange={handleToDoStatusChange}
            label="Status"
          >
            <MenuItem value="new">New</MenuItem>
            <MenuItem value="ready">Ready</MenuItem>
            <MenuItem value="in progress">In Progress</MenuItem>
            <MenuItem value="in review">In Review</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
          <InputLabel id="priority-select-label">Priority:</InputLabel>
          <Select
            labelId="priority-select-label"
            id="priority-select"
            value={priority}
            onChange={handlePriorityChange}
            label="Priority"
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
          <Typography>Created at:</Typography>
          <Typography></Typography>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default ToDoCard;
