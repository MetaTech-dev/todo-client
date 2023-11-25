import { useContext, useState } from "react";
import ToDoContext from "../contexts/ToDoContext";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useCreateStatus, useUpdateStatus } from "../hooks/status";

const StatusFormDialog = () => {
  const {
    setIsStatusFormDialogOpen,
    isStatusFormDialogOpen,
    statusFormData,
    setStatusFormData,
    defaultNewStatus,
    formLoading,
  } = useContext(ToDoContext);

  const [showWarning, setShowWarning] = useState("");

  const { mutate: createStatusMutation } = useCreateStatus();

  const { mutate: updateStatusMutation } = useUpdateStatus();

  const handleClose = () => {
    setIsStatusFormDialogOpen(false);
    setShowWarning("");
    setStatusFormData(defaultNewStatus);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStatusFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const statusFormTitle = (status) => {
    return !status.id ? "New Status:" : "Edit Status:";
  };

  const handleSubmit = (status) => {
    const trimmedTitle = statusFormData.title.trim();

    if (trimmedTitle !== "") {
      if (trimmedTitle.length < 30) {
        if (!status.id) {
          createStatusMutation(statusFormData);
        } else if (status.id) {
          updateStatusMutation(statusFormData);
        }
        handleClose();
      } else {
        setShowWarning("Status title can't be more than 30 characters");
      }
    } else {
      setShowWarning("Status title can't be empty");
    }
  };

  return (
    <Dialog open={isStatusFormDialogOpen} onClose={handleClose}>
      <DialogTitle>{statusFormTitle(statusFormData)}</DialogTitle>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(statusFormData);
        }}
      >
        <DialogContent>
          {showWarning && <Alert severity="warning">{showWarning}</Alert>}
          <TextField
            autoFocus
            margin="dense"
            id="newStatus"
            label="New Status"
            name="title"
            type="text"
            fullWidth
            variant="standard"
            value={statusFormData.title}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          {!formLoading && <Button type="submit">Submit</Button>}
          {formLoading && (
            <CircularProgress size={25} sx={{ marginRight: 1 }} />
          )}
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default StatusFormDialog;
