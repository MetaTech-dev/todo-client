import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const DateSelector = ({ onChange, value, sx }) => {
  return (
    <DatePicker
      slotProps={{
        actionBar: {
          actions: ["clear"],
        },
        textField: {
          size: "small",
          InputLabelProps: { shrink: true },
          error: false,
        },
      }}
      sx={sx}
      label="Date Due"
      value={dayjs(value)}
      onChange={(dateObj) =>
        onChange({
          target: { name: "dueDate", value: dateObj ? dayjs(dateObj) : null },
        })
      }
      size="small"
      disablePast
    />
  );
};

export default DateSelector;
