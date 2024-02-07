import { useContext, useEffect, useState } from "react";
import DialogContext from "../contexts/DialogContext";
import {
  Alert,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useCreateStatus, useUpdateStatus } from "../hooks/status";

const StatusFormDialog = () => {
  const {
    setIsStatusFormDialogOpen,
    isStatusFormDialogOpen,
    statusFormData,
    setStatusFormData,
    defaultNewStatus,
  } = useContext(DialogContext);

  const [showWarning, setShowWarning] = useState("");

  const {
    mutate: createStatus,
    isPending: isCreateStatusPending,
    isSuccess: isCreateStatusSuccess,
  } = useCreateStatus();

  const {
    mutate: updateStatus,
    isPending: isUpdateStatusPending,
    isSuccess: isUpdateStatusSuccess,
  } = useUpdateStatus();

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
    return !status?.id ? "New Status:" : "Edit Status:";
  };

  useEffect(() => {
    if (isCreateStatusSuccess || isUpdateStatusSuccess) {
      handleClose();
    }
  }, [isCreateStatusSuccess, isUpdateStatusSuccess]);

  const handleSubmit = (status) => {
    const trimmedTitle = statusFormData.title.trim();

    if (trimmedTitle !== "") {
      if (trimmedTitle.length < 30) {
        if (!status.id) {
          createStatus(statusFormData);
        } else if (status.id) {
          updateStatus(statusFormData);
        }
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
            value={statusFormData?.title}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <LoadingButton
            loading={isCreateStatusPending || isUpdateStatusPending}
            type="submit"
          >
            Submit
          </LoadingButton>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default StatusFormDialog;
