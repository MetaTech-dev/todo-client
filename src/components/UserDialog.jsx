import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import ToDoContext from "../contexts/ToDoContext";
import { useContext } from "react";
import { LoadingButton } from "@mui/lab";
import { useUpdateUser } from "../hooks/user";
import { useUser } from "@clerk/clerk-react";

const UserDialog = () => {
  const { isUserDialogOpen, setIsUserDialogOpen, userData, setUserData } =
    useContext(ToDoContext);
  const { user } = useUser();

  const {
    mutate: updateUser,
    isPending: isUpdateUserPending,
    onSuccess: isUpdateUserSuccess,
  } = useUpdateUser();

  const handleClose = () => {
    setIsUserDialogOpen(false);
  };

  const handleSubmit = async (userData) => {
    const userId = userData.userId;
    const body = {
      firstName: userData.firstName,
      lastName: userData.lastName,
    };
    const updatedUser = { userId, body };
    updateUser(updatedUser);
    console.log("user before reload", user);
    await user?.reload();

    console.log("user after reload", user);
    setIsUserDialogOpen(false);
  };

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
          <LoadingButton loading={isUpdateUserPending} type="submit">
            Submit
          </LoadingButton>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default UserDialog;
