import { Chip, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const PriortySelect = ({ value, onChange, fullWidth, sx }) => {
  return (
    <FormControl size="small" sx={sx} fullWidth={fullWidth}>
      <InputLabel id="toDo-priority-label">Priority</InputLabel>
      <Select
        labelId="toDo-priority-label"
        id="toDo-priority-select"
        name="priority"
        value={value}
        onChange={onChange}
        label="status"
      >
        <MenuItem value="low">
          <Chip label="Low" color="success" size="small" />
        </MenuItem>
        <MenuItem value="medium">
          <Chip label="Medium" color="warning" size="small" />
        </MenuItem>
        <MenuItem value="high">
          <Chip label="High" color="error" size="small" />
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default PriortySelect;
