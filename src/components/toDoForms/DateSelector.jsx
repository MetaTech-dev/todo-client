import { DatePicker } from "@mui/x-date-pickers";

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
        },
      }}
      sx={sx}
      label="Date Due"
      value={value}
      onChange={onChange}
      size="small"
      disablePast
    />
  );
};

export default DateSelector;
