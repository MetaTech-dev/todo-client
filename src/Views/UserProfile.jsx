import { useAuth0 } from "@auth0/auth0-react";
import {
  AppBar,
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import {
  useGetOneUser,
  useUpdateUser,
  useUpdateUserRoles,
} from "../hooks/user";
import { useGetRoleList } from "../hooks/role";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import SaveTwoToneIcon from "@mui/icons-material/SaveTwoTone";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { enqueueSnackbar } from "notistack";

const UserProfile = () => {
  const { user } = useAuth0();
  const rawProfileId = useLocation().pathname.split("/")[1];
  const profileId = decodeURIComponent(rawProfileId);

  const { data: profileUser } = useGetOneUser(profileId);
  const { data: currentUser } = useGetOneUser(user?.sub);
  const { data: roleList } = useGetRoleList();

  console.log("profile user roles", profileUser?.roles);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  console.log("roleList", roleList);

  const {
    mutate: updateUser,
    isPending: isUpdateUserPending,
    isSuccess: isUpdateUserSuccess,
  } = useUpdateUser();

  const {
    mutate: updateUserRoles,
    isPending: isUpdateUserRolesPending,
    isSuccess: isUpdateUserRolesSuccess,
  } = useUpdateUserRoles();

  const [isEditing, setIsEditing] = useState(false);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const [isUpdatingUserRoles, setIsUpdatingUserRoles] = useState(false);

  const isAdmin = useMemo(
    () => currentUser?.roles?.some((role) => role.name === "Admin"),
    [currentUser]
  );

  const isSelf = useMemo(
    () => currentUser?.user_id === profileUser?.user_id,
    [currentUser]
  );

  const formatDate = (date) => {
    const dayjsDate = dayjs(date);
    return dayjsDate.isValid()
      ? dayjsDate.format("ddd, MMMM, DD, YYYY")
      : "none selected";
  };

  const [updateUserData, setUpdateUserData] = useState({
    name: "",
    nickname: "",
    email: "",
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
        roles: profileUser.roles?.map((role) => role.id),
      });
    }
  }, [profileUser]);

  const handleCancel = () => {
    setIsEditing(false);
    setUpdateUserData({
      name: profileUser.name,
      nickname: profileUser.nickname,
      email: profileUser.email,
    });
    setUserRolesData({
      roles: profileUser.roles.map((role) => role.id),
    });
    setIsUpdatingUser(false);
    setIsUpdatingUserRoles(false);
  };

  const handleInputChange = (event) => {
    setIsUpdatingUser(true);
    const { name, value } = event.target;
    setUpdateUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRolesChange = (event) => {
    setIsUpdatingUserRoles(true);
    const {
      target: { value },
    } = event;
    setUserRolesData({
      ...userRolesData,
      roles: typeof value === "string" ? value.split(",") : value,
    });
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
      setIsUpdatingUser(false);
    } else if (trimmedName === "") {
      enqueueSnackbar("Name can't be empty", { variant: "error" });
    } else if (trimmedNickname === "") {
      enqueueSnackbar("Nickname can't be empty", { variant: "error" });
    } else if (!validEmail) {
      enqueueSnackbar("Invalid email", { variant: "error" });
    }
  };

  const handleUpdateUserRoles = () => {
    const roles = userRolesData.roles;
    const userId = profileUser?.user_id;

    const hasMemberRole = roles.some((roleId) => {
      const role = roleList.find((r) => r.id === roleId);
      return role && role.name === "Member";
    });

    // const hasAdminRole = roles.some((roleId) => {
    //   const role = roleList.find((r) => r.id === roleId);
    //   return role && role.name === "Admin";
    // });

    if (hasMemberRole) {
      updateUserRoles({ userId, roles });
      setIsUpdatingUserRoles(false);
    } else {
      enqueueSnackbar("User must always be a Member", { variant: "error" });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isUpdatingUser) {
      handleUpdateUser();
    } else if (isUpdatingUserRoles) {
      handleUpdateUserRoles();
    }
  };

  useEffect(() => {
    if (isUpdateUserSuccess || isUpdateUserRolesSuccess) {
      setIsEditing(false);
    }
  }, [isUpdateUserSuccess, isUpdateUserRolesSuccess]);

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
            {(!isEditing || !isAdmin) && Array.isArray(profileUser?.roles) && (
              <Typography sx={{ flex: 3 }}>
                {profileUser?.roles.map((role) => role.name).join(", ")}
              </Typography>
            )}
            {isEditing && isAdmin && (
              <Select
                fullWidth
                multiple
                id="userRoles"
                name="roles"
                value={userRolesData?.roles ?? []}
                onChange={handleRolesChange}
                input={<OutlinedInput id="select-multiple-roles" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((roleId) => {
                      const role = roleList.find((role) => role.id === roleId);
                      return role ? (
                        <Chip key={roleId} label={role.name} />
                      ) : null;
                    })}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {roleList.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
            )}
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
                  loading={isUpdateUserPending || isUpdateUserRolesPending}
                  type="submit"
                >
                  <SaveTwoToneIcon />
                </LoadingButton>
                <IconButton onClick={handleCancel}>
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
