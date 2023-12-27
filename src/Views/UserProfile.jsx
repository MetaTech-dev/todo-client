import { useAuth0 } from "@auth0/auth0-react";
import {
  Alert,
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useGetOneUser, useUpdateUser } from "../hooks/user";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import SaveTwoToneIcon from "@mui/icons-material/SaveTwoTone";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { set } from "date-fns";
import { enqueueSnackbar } from "notistack";

const UserProfile = () => {
  const { user: currentUser } = useAuth0();
  const profileId = useLocation().pathname.split("/")[1];

  const { data: profileUser } = useGetOneUser(profileId);

  const {
    mutate: updateUser,
    isPending: isUpdateUserPending,
    isSuccess: isUpdateUserSuccess,
  } = useUpdateUser();

  const [isEditing, setIsEditing] = useState(false);
  const [isSelf, setIsSelf] = useState(false);

  const formatDate = (date) => {
    const dayjsDate = dayjs(date);
    return dayjsDate.isValid()
      ? dayjsDate.format("ddd, MMMM, DD, YYYY")
      : "none selected";
  };

  useEffect(() => {
    if (currentUser?.sub === profileUser?.user_id) {
      setIsSelf(true);
    }
  }, [currentUser, profileUser]);

  const [updateUserData, setUpdateUserData] = useState({
    name: "",
    email: "",
    nickname: "",
  });

  const [userRolesData, setUserRolesData] = useState({
    roles: [],
  });

  useEffect(() => {
    if (profileUser) {
      setUpdateUserData({
        name: profileUser.name,
        nickname: profileUser.nickname,
        email: profileUser.email,
      });
      setUserRolesData({
        roles: profileUser.roles,
      });
    }
  }, [profileUser]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdateUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateUser = () => {
    const trimmedName = updateUserData.name.trim();
    const trimmedNickname = updateUserData.nickname.trim();
    const validateEmail = (email) => {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return regex.test(email);
    };
    const validEmail = validateEmail(updateUserData.email);
    if (trimmedName !== "" && trimmedNickname !== "" && validEmail) {
      const body = updateUserData;
      const userId = profileUser?.user_id;
      updateUser({ userId, body });
    } else if (trimmedName === "") {
      enqueueSnackbar("Name can't be empty", { variant: "error" });
    } else if (trimmedNickname === "") {
      enqueueSnackbar("Nickname can't be empty", { variant: "error" });
    } else if (!validEmail) {
      enqueueSnackbar("Invalid email", { variant: "error" });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdateUser();
  };

  useEffect(() => {
    if (isUpdateUserSuccess) {
      setIsEditing(false);
    }
  }, [isUpdateUserSuccess]);

  return (
    <Box
      id="profile-container"
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "neutral.main",
      }}
    >
      <Card
        elevation={2}
        sx={{
          minWidth: "22rem",
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        {/* User Name */}
        <AppBar
          elevation={2}
          position="static"
          sx={{ backgroundColor: "primary.main" }}
        >
          {(!isEditing || !isSelf) && (
            <Toolbar sx={{ fontWeight: "500", fontSize: "20px" }}>
              {profileUser?.name}
            </Toolbar>
          )}
          {isEditing && isSelf && (
            <Toolbar sx={{ fontWeight: "500", fontSize: "20px" }}>
              <TextField
                variant="standard"
                type="text"
                size="small"
                margin="dense"
                inputProps={{ style: { padding: "0.33rem" } }}
                id="userName"
                name="name"
                placeholder={profileUser?.name}
                value={updateUserData.name}
                onChange={handleInputChange}
                required
              />
            </Toolbar>
          )}
        </AppBar>
        <CardContent
          sx={{
            "&:last-child": {
              pb: 0,
            },
          }}
        >
          {/* User Profile Picture */}
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Typography sx={{ fontWeight: "bold", mr: 1, flex: 2 }}>
              profile picture:
            </Typography>
            <Box sx={{ flex: 3, mb: 0.5 }}>
              <Card
                elevation={2}
                sx={{
                  width: "fit-content",
                  display: "flex",
                }}
              >
                <img src={profileUser?.picture} alt="" />
              </Card>
            </Box>
          </Box>
          {/* User Email */}
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography sx={{ fontWeight: "bold", mr: 1, flex: 2 }}>
              e-mail:
            </Typography>
            {(!isEditing || !isSelf) && (
              <Typography sx={{ flex: 3 }}>{profileUser?.email}</Typography>
            )}
            {isEditing && isSelf && (
              <TextField
                variant="outlined"
                type="email"
                size="small"
                inputProps={{ style: { padding: "0.33rem" } }}
                id="userEmail"
                name="email"
                placeholder={profileUser?.email}
                value={updateUserData.email}
                onChange={handleInputChange}
                required
              />
            )}
          </Box>
          {/* User Nickname */}
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography sx={{ fontWeight: "bold", mr: 1, flex: 2 }}>
              nickname:
            </Typography>
            {(!isEditing || !isSelf) && (
              <Typography sx={{ flex: 3 }}>{profileUser?.nickname}</Typography>
            )}
            {isEditing && isSelf && (
              <TextField
                variant="outlined"
                type="search"
                size="small"
                inputProps={{ style: { padding: "0.33rem" } }}
                id="userNickname"
                name="nickname"
                placeholder={profileUser?.nickname}
                value={updateUserData.nickname}
                onChange={handleInputChange}
                required
              />
            )}
          </Box>
          {/* Roles */}
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography sx={{ fontWeight: "bold", mr: 1, flex: 2 }}>
              roles:
            </Typography>
            <Typography sx={{ flex: 3 }}>
              {profileUser?.roles.map((role) => role.name).join(", ")}
            </Typography>
          </Box>
          {/* User Created At */}
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography sx={{ fontWeight: "bold", mr: 1, flex: 2 }}>
              member since:
            </Typography>
            <Typography sx={{ flex: 3 }}>
              {formatDate(profileUser?.created_at)}
            </Typography>
          </Box>
          {/* Last Updated At */}
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography sx={{ fontWeight: "bold", mr: 1, flex: 2 }}>
              last updated:
            </Typography>
            <Typography sx={{ flex: 3 }}>
              {formatDate(profileUser?.updated_at)}
            </Typography>
          </Box>
          {/* Last Login */}
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography sx={{ fontWeight: "bold", mr: 1, flex: 2 }}>
              last login:
            </Typography>
            <Typography sx={{ flex: 3 }}>
              {formatDate(profileUser?.last_login)}
            </Typography>
          </Box>
          <CardActions
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            {!isEditing && (
              <IconButton onClick={() => setIsEditing(true)}>
                <EditTwoToneIcon />
              </IconButton>
            )}
            {isEditing && (
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <LoadingButton
                  onClick={handleSubmit}
                  color="inherit"
                  loading={isUpdateUserPending}
                  type="submit"
                >
                  <SaveTwoToneIcon />
                </LoadingButton>
                <IconButton onClick={() => setIsEditing(false)}>
                  <CancelTwoToneIcon />
                </IconButton>
              </Box>
            )}
          </CardActions>
        </CardContent>
      </Card>
    </Box>
  );
};
export default UserProfile;