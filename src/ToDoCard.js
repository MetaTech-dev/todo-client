import {
  Box,
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
        <Typography variant="h5">Title</Typography>
        <Typography>Created By:</Typography>
        <Typography>Description:</Typography>
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
        <Typography>Due Date:</Typography>
        <Typography>Assignee:</Typography>
      </CardContent>
    </Card>
  );
};

export default ToDoCard;
