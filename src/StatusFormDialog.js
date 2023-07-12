import { useContext, useState } from "react";
import ToDoContext from "./ToDoContext";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const StatusFormDialog = () => {
  const {
    createNewStatus,
    setIsStatusFormDialogOpen,
    isStatusFormDialogOpen,
    isStatusFormNew,
    statusFormData,
    setStatusFormData,
    defaultNewStatus,
    updateStatus,
  } = useContext(ToDoContext);

  const [showWarning, setShowWarning] = useState("");
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

  const handleSubmit = (isStatusFormNew) => {
    const trimmedTitle = statusFormData.title.trim();

    if (trimmedTitle !== "") {
      if (trimmedTitle.length < 30) {
        if (isStatusFormNew) {
          createNewStatus(statusFormData);
        } else {
          updateStatus(statusFormData);
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
      <DialogTitle>New Status:</DialogTitle>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(isStatusFormNew);
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
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default StatusFormDialog;
