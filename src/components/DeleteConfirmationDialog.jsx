import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { useContext, useEffect } from "react";
import ToDoContext from "../contexts/ToDoContext";
import { useRemoveToDo } from "../hooks/toDo";
import { LoadingButton } from "@mui/lab";
import { useRemoveStatus } from "../hooks/status";

const DeleteConfirmationDialog = () => {
  const {
    isDeleteConfirmationDialogOpen,
    setIsDeleteConfirmationDialogOpen,
    deleteConfirmationItemType,
    setDeleteConfirmationItemType,
    deleteConfirmationItem,
    setDeleteConfirmationItem,
  } = useContext(ToDoContext);

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

  const handleClose = () => {
    setIsDeleteConfirmationDialogOpen(false);
    setDeleteConfirmationItem(null);
    setDeleteConfirmationItemType("");
  };

  const handleDelete = () => {
    if (deleteConfirmationItemType === "toDo") {
      removeToDo(deleteConfirmationItem.id);
    } else if (deleteConfirmationItemType === "status") {
      removeStatus(deleteConfirmationItem.id);
    }
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
          variant="contained"
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
