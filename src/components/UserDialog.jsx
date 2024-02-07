import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import DialogContext from "../contexts/DialogContext";
import { useContext, useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useUpdateUser } from "../hooks/user";
import { useUser } from "@clerk/clerk-react";

const UserDialog = () => {
  const {
    isUserDialogOpen,
    setIsUserDialogOpen,
    userFormData,
    setUserFormData,
  } = useContext(DialogContext);
  const { user } = useUser();
  const [showWarning, setShowWarning] = useState(false);

  const {
    mutate: updateUser,
    isPending: isUpdateUserPending,
    isSuccess: isUpdateUserSuccess,
  } = useUpdateUser();

  const handleClose = (_event, reason) => {
    if (reason && (reason === "backdropClick" || reason === "escapeKeyDown")) {
      return;
    }
    setIsUserDialogOpen(false);
  };

  const handleSubmit = async (userFormData) => {
    const trimmedFirstName = userFormData.firstName.trim();
    const trimmedLastName = userFormData.lastName.trim();
    if (trimmedFirstName && trimmedLastName) {
      const userId = userFormData.userId;
      const body = {
        firstName: userFormData.firstName,
        lastName: userFormData.lastName,
      };
      const updatedUser = { userId, body };
      updateUser(updatedUser);
    } else if (!trimmedFirstName || !trimmedLastName) {
      setShowWarning(true);
    }
  };

  useEffect(() => {
    const handleUpdateUserSuccess = async () => {
      if (isUpdateUserSuccess) {
        await user?.reload();
        setIsUserDialogOpen(false);
      }
    };

    handleUpdateUserSuccess();
  }, [isUpdateUserSuccess]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUserFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Dialog open={isUserDialogOpen} onClose={handleClose}>
      <DialogTitle>Update Your Profile</DialogTitle>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(userFormData);
        }}
      >
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="firstName"
            label="First Name"
            name="firstName"
            type="text"
            fullWidth
            value={userFormData.firstName}
            onChange={handleInputChange}
            error={showWarning && !userFormData.firstName}
            helperText={
              showWarning && !userFormData.firstName
                ? "First Name is required"
                : ""
            }
            required
          />
          <TextField
            margin="dense"
            id="lastName"
            label="Last Name"
            name="lastName"
            type="text"
            fullWidth
            value={userFormData.lastName}
            onChange={handleInputChange}
            error={showWarning && !userFormData.lastName}
            helperText={
              showWarning && !userFormData.lastName
                ? "Last Name is required"
                : ""
            }
            required
          />
        </DialogContent>
        <DialogActions>
          <LoadingButton loading={isUpdateUserPending} type="submit">
            Submit
          </LoadingButton>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default UserDialog;
