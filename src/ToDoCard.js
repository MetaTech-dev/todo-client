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
    <Card variant="outlined" style={{ width: "90%" }}>
      <CardContent>
        <Typography variant="h5">Title</Typography>
        <Typography>Created By:</Typography>
        <Typography>Description:</Typography>
        <Box style={{ display: "flex" }}>
          <InputLabel id="priority-select-label" style={{ color: "black" }}>
            Priority:
          </InputLabel>
          <Box sx={{ flexGrow: 1 }} />
          <Select
            labelId="priority-select-label"
            id="priority-select"
            value={priority}
            onChange={handlePriorityChange}
            label="Priority"
            size="small"
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
          <Box sx={{ flexGrow: 1 }} />
        </Box>
        <Typography>Created at:</Typography>
        <Typography>Due Date:</Typography>
        <Typography>Assignee:</Typography>
      </CardContent>
    </Card>
  );
};

export default ToDoCard;
