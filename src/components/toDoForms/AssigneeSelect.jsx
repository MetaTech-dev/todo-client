import {
  Autocomplete,
  Avatar,
  InputAdornment,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from "@mui/material";
import { useGetUserList } from "../../hooks/user";

const AssigneeSelect = ({ onChange, value, sx }) => {
  const { data: userList } = useGetUserList();

  return (
    <Autocomplete
      autoHighlight
      id="assignee-autocomplete"
      options={userList || []}
      value={value}
      getOptionLabel={(option) => option.id}
      sx={sx}
      renderOption={(props, option) => {
        return (
          <ListItem {...props} key={option.id}>
            <ListItemAvatar>
              <Avatar src={option.imageUrl} sx={{ height: 24, width: 24 }} />
            </ListItemAvatar>
            <ListItemText
              primary={`${option?.firstName} ${option?.lastName}`}
            />
          </ListItem>
        );
      }}
      onChange={onChange}
      renderInput={({
        inputProps: { value, ...restInputProps },
        InputProps,
        ...restParams
      }) => {
        const user = userList?.find((user) => user.id === value);
        return (
          <TextField
            {...restParams}
            value={`${user?.firstName} ${user?.lastName}`}
            label="Assignee"
            InputProps={{
              ...InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <Avatar src={user?.imageUrl} sx={{ height: 24, width: 24 }} />
                </InputAdornment>
              ),
            }}
            inputProps={{
              ...restInputProps,
              value: user ? `${user?.firstName} ${user?.lastName}` : "",
            }}
          />
        );
      }}
      size="small"
    />
  );
};

export default AssigneeSelect;
