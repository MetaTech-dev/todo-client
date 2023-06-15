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
  const [priority, setPriority] = useState("");

  const handleToDoStatusChange = (e) => {
    setToDoStatus(e.target.value);
  };
  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  return (
    <Card
      variant="outlined"
      sx={{ m: 1, minWidth: 120 }}
      style={{ width: "90%" }}
    >
      <CardContent>
        <Typography variant="h5">Title</Typography>
        <Typography>Created By:</Typography>
        <Typography>Description:</Typography>

        <Typography>Created at:</Typography>
        <Typography>Due Date:</Typography>
        <Typography>Assignee:</Typography>
        <FormControl size="small">
          <InputLabel id="priority-select-small-label">Priority</InputLabel>
          <Select
            labelId="priority-select-small-label"
            id="priority-select"
            value={priority}
            onChange={handlePriorityChange}
            label="Priority"
            size="small"
            sx={{ width: "7rem" }}
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default ToDoCard;
