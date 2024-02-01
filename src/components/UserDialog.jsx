import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import ToDoContext from "../contexts/ToDoContext";
import { useContext, useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useUpdateUser } from "../hooks/user";
import { useUser } from "@clerk/clerk-react";

const UserDialog = () => {
  const { isUserDialogOpen, setIsUserDialogOpen, userData, setUserData } =
    useContext(ToDoContext);
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

  const handleSubmit = async (userData) => {
    const trimmedFirstName = userData.firstName.trim();
    const trimmedLastName = userData.lastName.trim();
    if (trimmedFirstName && trimmedLastName) {
      const userId = userData.userId;
      const body = {
        firstName: userData.firstName,
        lastName: userData.lastName,
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

    setUserData((prev) => ({
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
          handleSubmit(userData);
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
            value={userData.firstName}
            onChange={handleInputChange}
            error={showWarning && !userData.firstName}
            helperText={
              showWarning && !userData.firstName ? "First Name is required" : ""
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
            value={userData.lastName}
            onChange={handleInputChange}
            error={showWarning && !userData.lastName}
            helperText={
              showWarning && !userData.lastName ? "Last Name is required" : ""
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
