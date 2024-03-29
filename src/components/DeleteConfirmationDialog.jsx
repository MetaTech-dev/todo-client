import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { useContext, useEffect } from "react";
import DialogContext from "../contexts/DialogContext";
import { useRemoveToDo } from "../hooks/toDo";
import { LoadingButton } from "@mui/lab";
import { useRemoveStatus } from "../hooks/status";
import { useNavigate } from "react-router-dom";

const DeleteConfirmationDialog = () => {
  const {
    isDeleteConfirmationDialogOpen,
    setIsDeleteConfirmationDialogOpen,
    deleteConfirmationItemType,
    setDeleteConfirmationItemType,
    deleteConfirmationItem,
    setDeleteConfirmationItem,
  } = useContext(DialogContext);

  const {
    mutate: removeToDo,
    isPending: isRemoveToDoPending,
    isSuccess: isRemoveToDoSuccess,
  } = useRemoveToDo();

  const {
    mutate: removeStatus,
    isPending: isRemoveStatusPending,
    isSuccess: isRemoveStatusSuccess,
  } = useRemoveStatus();

  const navigate = useNavigate();

  const handleClose = () => {
    setIsDeleteConfirmationDialogOpen(false);
    setDeleteConfirmationItem(null);
    setDeleteConfirmationItemType("");
  };

  const handleDelete = () => {
    if (deleteConfirmationItemType === "toDo") {
      removeToDo({ id: deleteConfirmationItem.id });
    } else if (deleteConfirmationItemType === "status") {
      removeStatus({ id: deleteConfirmationItem.id });
    }
    navigate("/");
  };

  useEffect(() => {
    if (isRemoveToDoSuccess || isRemoveStatusSuccess) {
      handleClose();
    }
  }, [isRemoveToDoSuccess, isRemoveStatusSuccess]);

  return (
    <Dialog open={isDeleteConfirmationDialogOpen} onClose={handleClose}>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <LoadingButton
          variant="outlined"
          loading={isRemoveToDoPending || isRemoveStatusPending}
          onClick={handleDelete}
        >
          Yes
        </LoadingButton>
        <Button variant="contained" onClick={handleClose}>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
