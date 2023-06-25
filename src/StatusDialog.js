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

const StatusDialog = ({ isOpen, setIsOpen }) => {
  const { addToStatusList, StatusList } = useContext(ToDoContext);
  const [newStatus, setNewStatus] = useState("");

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setNewStatus(value);
  };

  const handleSubmit = () => {
    addToStatusList(newStatus);
    setIsOpen(false);
    setNewStatus("");
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
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

export default StatusDialog;
