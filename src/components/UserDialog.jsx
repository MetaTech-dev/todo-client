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
  const [isLoading, setIsLoading] = useState(false);

  const {
    mutate: updateUser,
    isPending: isUpdateUserPending,
    isSuccess: isUpdateUserSuccess,
  } = useUpdateUser();

  const handleClose = () => {
    setIsUserDialogOpen(false);
  };

  const handleSubmit = async (userData) => {
    setIsLoading(true);
    const userId = userData.userId;
    const body = {
      firstName: userData.firstName,
      lastName: userData.lastName,
    };
    const updatedUser = { userId, body };
    updateUser(updatedUser);
  };

  if (isUpdateUserPending) {
    // TODO: Why isn't this being called?
    console.log("updating user...");
  }

  useEffect(() => {
    const handleUpdateUserSuccess = async () => {
      if (isUpdateUserSuccess) {
        // TODO: remove this when we figure out why we need to wait and fix the root problem
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await user?.reload();
        setIsUserDialogOpen(false);
        setIsLoading(false);
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
            variant="standard"
            value={userData.firstName}
            onChange={handleInputChange}
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="lastName"
            label="Last Name"
            name="lastName"
            type="text"
            fullWidth
            variant="standard"
            value={userData.lastName}
            onChange={handleInputChange}
            required
          />
        </DialogContent>
        <DialogActions>
          <LoadingButton loading={isLoading} type="submit">
            Submit
          </LoadingButton>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default UserDialog;
