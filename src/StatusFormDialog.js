import { useContext, useState } from "react";
import ToDoContext from "./ToDoContext";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const StatusFormDialog = () => {
  const { addToStatusList, setIsStatusFormDialogOpen, isStatusFormDialogOpen } =
    useContext(ToDoContext);
  const [newStatus, setNewStatus] = useState("");

  const handleClose = () => {
    setIsStatusFormDialogOpen(false);
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setNewStatus(value);
  };

  const handleSubmit = () => {
    addToStatusList(newStatus);
    setIsStatusFormDialogOpen(false);
    setNewStatus("");
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
          handleSubmit();
        }}
      >
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="newStatus"
            label="New Status"
            name="New Status"
            type="text"
            fullWidth
            variant="standard"
            value={newStatus}
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
