import { useContext, useEffect, useState } from "react";
import DialogContext from "../contexts/DialogContext";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Alert,
  Autocomplete,
  ListItem,
  Avatar,
  ListItemText,
  ListItemAvatar,
  InputAdornment,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import LoadingButton from "@mui/lab/LoadingButton";
import dayjs from "dayjs";
import { useCreateToDo, useUpdateToDo } from "../hooks/toDo";
import { useGetStatusList } from "../hooks/status";
import { useGetUserList } from "../hooks/user";
import { useOrganization } from "@clerk/clerk-react";
import AppContext from "../contexts/AppContext";
import PrioritySelect from "../components/toDo/PrioritySelect";

const ToDoForm = () => {
  const {
    defaultNewToDo,
    toDoFormData,
    setToDoFormData,
    isToDoFormDialogOpen,
    setIsToDoFormDialogOpen,
  } = useContext(DialogContext);

  const { isMobile } = useContext(AppContext);

  const { organization } = useOrganization();

  const [showWarning, setShowWarning] = useState("");

  const { data: userList } = useGetUserList();

  const { data: statusList } = useGetStatusList();

  const {
    mutate: createToDo,
    isPending: isCreateToDoPending,
    isSuccess: isCreateToDoSuccess,
  } = useCreateToDo();

  const {
    mutate: updateToDo,
    isPending: isUpdateToDoPending,
    isSuccess: isUpdateToDoSuccess,
  } = useUpdateToDo();

  const handleClose = () => {
    setIsToDoFormDialogOpen(false);
    setShowWarning(false);
    setToDoFormData(defaultNewToDo);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setToDoFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAssigneeChange = (event, value) => {
    if (value) {
      const { id } = value;
      setToDoFormData((prev) => ({
        ...prev,
        assigneeUserId: id,
      }));
    } else {
      setToDoFormData((prev) => ({
        ...prev,
        assigneeUserId: null,
      }));
    }
  };

  const toDoFormTitle = (toDo) => {
    return !toDo.id ? "New ToDo:" : "Update ToDo:";
  };

  useEffect(() => {
    if (isCreateToDoSuccess || isUpdateToDoSuccess) {
      handleClose();
    }
  }, [isCreateToDoSuccess, isUpdateToDoSuccess]);

  const handleSubmit = (toDo) => {
    const trimmedTitle = toDoFormData.title.trim();
    const trimmedDescription = toDoFormData.description.trim();

    if (trimmedTitle !== "" && trimmedDescription !== "") {
      if (!toDo.id) {
        createToDo(toDoFormData);
      } else if (toDo.id) {
        updateToDo(toDoFormData);
      }
      setIsToDoFormDialogOpen(false);
      setToDoFormData(defaultNewToDo);
      setShowWarning(false);
    } else {
      setShowWarning(true);
    }
  };

  return (
    <Dialog open={isToDoFormDialogOpen} onClose={handleClose}>
      <DialogTitle>{toDoFormTitle(toDoFormData)}</DialogTitle>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(toDoFormData);
        }}
      >
        <DialogContent>
          {showWarning && (
            <Alert severity="warning">
              Title and Description must be filled out
            </Alert>
          )}
          <TextField
            autoFocus
            margin="dense"
            id="taskTitle"
            label="Title"
            name="title"
            type="text"
            fullWidth
            variant="standard"
            value={toDoFormData.title}
            onChange={handleInputChange}
            required
          />
          <TextField
            margin="dense"
            id="taskDescription"
            label="Description"
            name="description"
            type="text"
            fullWidth
            variant="standard"
            value={toDoFormData.description}
            onChange={handleInputChange}
            sx={{ pb: "1rem" }}
            required
            multiline
          />
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
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
              sx={{ pb: "1rem", pr: "1rem" }}
              label="Date Due"
              value={toDoFormData.dueDate ? dayjs(toDoFormData.dueDate) : null}
              onChange={(newDate) =>
                setToDoFormData((prev) => ({
                  ...prev,
                  dueDate: newDate,
                }))
              }
              disablePast
            />
            {organization && (
              <Autocomplete
                autoHighlight
                id="assignee-autocomplete"
                options={userList || []}
                value={
                  userList?.find(
                    (user) => user.id === toDoFormData.assigneeUserId
                  ) || null
                }
                getOptionLabel={(option) => option.id}
                sx={{
                  width: isMobile ? "100% " : "17rem",
                  pb: isMobile ? 2 : 0,
                }}
                renderOption={(props, option) => {
                  return (
                    <ListItem {...props} key={option.id}>
                      <ListItemAvatar>
                        <Avatar
                          src={option.imageUrl}
                          sx={{ height: 24, width: 24 }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${option?.firstName} ${option?.lastName}`}
                      />
                    </ListItem>
                  );
                }}
                onChange={handleAssigneeChange}
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
                            <Avatar
                              src={user?.imageUrl}
                              sx={{ height: 24, width: 24 }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      inputProps={{
                        ...restInputProps,
                        value: user
                          ? `${user?.firstName} ${user?.lastName}`
                          : "",
                      }}
                    />
                  );
                }}
                size="small"
              />
            )}
          </Box>
          <PrioritySelect
            value={toDoFormData.priority}
            onChange={handleInputChange}
            sx={{ pb: "1rem" }}
            fullWidth={true}
          />
          <FormControl fullWidth size="small">
            <InputLabel id="toDo-status-label">Status</InputLabel>
            <Select
              labelId="toDo-status-label"
              id="toDo-status-select"
              name="statusId"
              value={toDoFormData.statusId}
              onChange={handleInputChange}
              label="status"
            >
              {statusList?.length > 0
                ? statusList.map((status) => {
                    return (
                      <MenuItem value={status.id} key={status.id}>
                        {status.title}
                      </MenuItem>
                    );
                  })
                : null}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            loading={isCreateToDoPending || isUpdateToDoPending}
            type="submit"
          >
            Submit
          </LoadingButton>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ToDoForm;
