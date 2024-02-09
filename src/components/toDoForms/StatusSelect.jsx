import { Chip, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useGetStatusList } from "../../hooks/status";

const StatusSelect = ({ value, onChange, fullWidth }) => {
  const { data: statusList } = useGetStatusList();

  return (
    <FormControl size="small" fullWidth={fullWidth}>
      <InputLabel id="toDo-status-label">Status</InputLabel>
      <Select
        labelId="toDo-status-label"
        id="toDo-status-select"
        name="statusId"
        value={value}
        onChange={onChange}
        label="status"
      >
        {statusList?.map((status) => {
          return (
            <MenuItem value={status.id} key={status.id}>
              <Chip label={status.title} size="small" />
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default StatusSelect;
