import { useAuth0 } from "@auth0/auth0-react";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  IconButton,
  MenuItem,
  OutlinedInput,
  Select,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import {
  useGetOneUser,
  useUpdateUser,
  useUpdateUserRoles,
} from "../hooks/user";
import { useGetRoleList } from "../hooks/role";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { enqueueSnackbar } from "notistack";

const UserProfile = () => {
  const { user } = useAuth0();
  const { pathname } = useLocation();
  const profileId = useMemo(
    () => decodeURIComponent(pathname.split("/")[2]),
    [pathname]
  );

  const { data: profileUser, isPending: isProfileUserPending } =
    useGetOneUser(profileId);
  const { data: currentUser } = useGetOneUser(user?.sub);
  const { data: roleList } = useGetRoleList();

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = useMemo(
    () => ({
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    }),
    []
  );

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
    [currentUser, profileUser]
  );

  const formatDate = useCallback((date) => {
    const dayjsDate = dayjs(date);
    return dayjsDate.isValid()
      ? dayjsDate.format("ddd, MMMM, DD, YYYY")
      : "none selected";
  }, []);

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

  const handleCancel = useCallback(() => {
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
  }, [profileUser]);

  const handleInputChange = useCallback((event) => {
    setIsUpdatingUser(true);
    const { name, value } = event.target;
    setUpdateUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleRolesChange = useCallback((event) => {
    setIsUpdatingUserRoles(true);
    const {
      target: { value },
    } = event;
    setUserRolesData({
      ...userRolesData,
      roles: value,
    });
  }, []);

  const handleUpdateUser = useCallback(() => {
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
  }, [profileUser, updateUserData, updateUser]);

  const handleUpdateUserRoles = useCallback(() => {
    const roles = userRolesData.roles;
    const userId = profileUser?.user_id;

    const hasMemberRole = roles.some((roleId) => {
      const role = roleList.find((r) => r.id === roleId);
      return role && role.name === "Member";
    });

    if (hasMemberRole) {
      updateUserRoles({ userId, roles });
      setIsUpdatingUserRoles(false);
    } else {
      enqueueSnackbar("User must always be a Member", { variant: "error" });
    }
  }, [profileUser, roleList, updateUserRoles, userRolesData.roles]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isUpdatingUser) {
      handleUpdateUser();
    } else if (isUpdatingUserRoles) {
      handleUpdateUserRoles();
    } else if (!isUpdatingUser && !isUpdatingUserRoles) {
      setIsEditing(false);
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
      <Card elevation={2} component="form" onSubmit={handleSubmit}>
        {/* User Name */}
        <CardHeader
          avatar={<Avatar src={profileUser?.picture} />}
          sx={{
            backgroundColor: "primary.main",
            color: "primary.contrastText",
          }}
          title={
            isProfileUserPending ? (
              <Skeleton />
            ) : !isEditing || !isSelf ? (
              profileUser?.name
            ) : (
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
            )
          }
          titleTypographyProps={{ variant: "h5" }}
        />
        <CardContent
          sx={{
            minWidth: "30rem",
            pb: 0,
          }}
        >
          {isProfileUserPending ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress sx={{ m: "5rem" }} size={75} />
            </Box>
          ) : (
            <>
              {/* User Email */}
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Typography noWrap sx={{ fontWeight: "bold", mr: 1, flex: 2 }}>
                  E-mail:
                </Typography>
                {(!isEditing || !isSelf) && (
                  <Typography noWrap sx={{ flex: 3 }}>
                    {profileUser?.email}
                  </Typography>
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
                    sx={{ flex: 3 }}
                    required
                  />
                )}
              </Box>
              {/* User Nickname */}
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Typography noWrap sx={{ fontWeight: "bold", mr: 1, flex: 2 }}>
                  Nickname:
                </Typography>
                {(!isEditing || !isSelf) && (
                  <Typography noWrap sx={{ flex: 3 }}>
                    {profileUser?.nickname}
                  </Typography>
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
                    sx={{ flex: 3 }}
                    required
                  />
                )}
              </Box>
              {/* Roles */}
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Typography noWrap sx={{ fontWeight: "bold", mr: 1, flex: 2 }}>
                  Roles:
                </Typography>
                {(!isEditing || !isAdmin) &&
                  Array.isArray(profileUser?.roles) && (
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.5,
                        flex: 3,
                      }}
                    >
                      {profileUser.roles.map((role) => (
                        <Chip key={role.id} label={role.name} />
                      ))}
                    </Box>
                  )}
                {isEditing && isAdmin && (
                  <Select
                    fullWidth
                    multiple
                    id="userRoles"
                    name="roles"
                    size="small"
                    value={userRolesData?.roles ?? []}
                    onChange={handleRolesChange}
                    input={<OutlinedInput id="select-multiple-roles" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((roleId) => {
                          const role = roleList.find(
                            (role) => role.id === roleId
                          );
                          return role ? (
                            <Chip key={roleId} label={role.name} />
                          ) : null;
                        })}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                    sx={{ flex: 3 }}
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
                <Typography noWrap sx={{ fontWeight: "bold", mr: 1, flex: 2 }}>
                  Member Since:
                </Typography>
                <Typography noWrap sx={{ flex: 3 }}>
                  {formatDate(profileUser?.created_at)}
                </Typography>
              </Box>
              {/* Last Updated At */}
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Typography noWrap sx={{ fontWeight: "bold", mr: 1, flex: 2 }}>
                  Last Updated:
                </Typography>
                <Typography noWrap sx={{ flex: 3 }}>
                  {formatDate(profileUser?.updated_at)}
                </Typography>
              </Box>
              {/* Last Login */}
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Typography noWrap sx={{ fontWeight: "bold", mr: 1, flex: 2 }}>
                  Last Login:
                </Typography>
                <Typography noWrap sx={{ flex: 3 }}>
                  {formatDate(profileUser?.last_login)}
                </Typography>
              </Box>
            </>
          )}
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          {!isEditing && (isAdmin || isSelf) && (
            <IconButton onClick={() => setIsEditing(true)}>
              <EditOutlinedIcon />
            </IconButton>
          )}
          {isEditing && (
            <>
              <LoadingButton
                onClick={handleSubmit}
                color="inherit"
                loading={isUpdateUserPending || isUpdateUserRolesPending}
                type="submit"
              >
                <SaveOutlinedIcon />
              </LoadingButton>
              <IconButton onClick={handleCancel}>
                <CancelOutlinedIcon />
              </IconButton>
            </>
          )}
        </CardActions>
      </Card>
    </Box>
  );
};

export default UserProfile;
