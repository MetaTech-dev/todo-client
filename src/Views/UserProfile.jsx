import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  MenuItem,
  OutlinedInput,
  Select,
  Skeleton,
  Typography,
} from "@mui/material";
import {
  useGetCurrentUser,
  useGetOneUser,
  useUpdateUserRole,
} from "../hooks/user";
import { useGetRoleList } from "../hooks/role";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
// import { useOrganization } from "@clerk/clerk-react";

const UserProfile = () => {
  const { pathname } = useLocation();
  const profileId = useMemo(
    () => decodeURIComponent(pathname.split("/")[2]),
    [pathname]
  );

  const { data: profileUser, isPending: isProfileUserPending } = useGetOneUser({
    id: profileId,
  });

  const { user } = useGetCurrentUser();

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

  const { mutate: updateUserRole } = useUpdateUserRole();

  const isAdmin = useMemo(() => user?.role === "org:admin", [user]);

  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    if (profileUser && profileUser?.role) {
      setUserRole(profileUser?.role ?? "");
    }
  }, [profileUser]);
  const handleRoleChange = useCallback(
    (event) => {
      const {
        target: { value },
      } = event;
      setUserRole(value);
      updateUserRole({ userId: profileUser?.id, role: value });
    },
    [profileUser, updateUserRole]
  );

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
      <Card elevation={2}>
        {/* User Name */}
        <CardHeader
          avatar={<Avatar src={profileUser?.imageUrl} />}
          sx={{
            backgroundColor: "primary.main",
            color: "primary.contrastText",
          }}
          title={
            isProfileUserPending ? (
              <Skeleton />
            ) : (
              `${profileUser?.firstName} ${profileUser?.lastName}`
            )
          }
          subheader={
            isProfileUserPending ? <Skeleton /> : profileUser?.username
          }
          titleTypographyProps={{ variant: "h6" }}
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
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Typography noWrap sx={{ fontWeight: "bold", mr: 1, flex: 2 }}>
                  E-mail:
                </Typography>
                <Typography noWrap sx={{ flex: 3 }}>
                  {profileUser?.emailAddresses[0].emailAddress}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Typography noWrap sx={{ fontWeight: "bold", mr: 1, flex: 2 }}>
                  Username:
                </Typography>
                <Typography noWrap sx={{ flex: 3 }}>
                  {profileUser?.username}
                </Typography>
              </Box>
              {/* Role */}
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Typography noWrap sx={{ fontWeight: "bold", mr: 1, flex: 2 }}>
                  Role:
                </Typography>
                {isAdmin ? (
                  <Select
                    fullWidth
                    id="userRole"
                    name="role"
                    size="small"
                    label="Role"
                    value={userRole}
                    onChange={handleRoleChange}
                    input={<OutlinedInput id="select-role" />}
                    renderValue={(selectedRole) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selectedRole ? (
                          <Chip key={selectedRole} label={selectedRole} />
                        ) : null}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                    sx={{ flex: 3 }}
                  >
                    {roleList.map((role) => (
                      <MenuItem key={role} value={role}>
                        {role}
                      </MenuItem>
                    ))}
                  </Select>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 0.5,
                      flex: 3,
                    }}
                  >
                    <Chip key={profileUser.role} label={profileUser.role} />
                  </Box>
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
      </Card>
    </Box>
  );
};

export default UserProfile;
