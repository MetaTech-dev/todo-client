import { useAuth0 } from "@auth0/auth0-react";
import {
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
import { useGetOneUser } from "../hooks/user";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import SaveTwoToneIcon from "@mui/icons-material/SaveTwoTone";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const UserProfile = () => {
  const { user: currentUser } = useAuth0();
  const profileId = useLocation().pathname.split("/")[1];

  const { data: profileUser } = useGetOneUser(profileId);

  const [isEditing, setIsEditing] = useState(false);
  const [isSelf, setIsSelf] = useState(false);

  const formatDate = (date) => {
    const dayjsDate = dayjs(date);
    return dayjsDate.isValid()
      ? dayjsDate.format("ddd, MMMM, DD, YYYY")
      : "none selected";
  };

  useEffect(() => {
    if (currentUser?.user_id === profileUser) {
      setIsSelf(true);
    }
  }, [currentUser, profileUser]);

  console.log("isSelf", isSelf);

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
          "& > : last-child": {
            pb: 0,
          },
        }}
      >
        {/* User Name */}
        <AppBar
          elevation={2}
          position="static"
          sx={{ backgroundColor: "primary.main" }}
        >
          {(!isEditing || !isSelf) && (
            <Toolbar sx={{ fontWeight: "500" }}>{profileUser?.name}</Toolbar>
          )}
          {isEditing && isSelf && (
            <Toolbar sx={{ fontWeight: "500" }}>
              <TextField
                variant="outlined"
                type="search"
                size="small"
                inputProps={{ style: { padding: "0.33rem" } }}
              ></TextField>
            </Toolbar>
          )}
        </AppBar>
        <CardContent>
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
            <Typography sx={{ flex: 3 }}>{profileUser?.email}</Typography>
          </Box>
          {/* User Nickname */}
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography sx={{ fontWeight: "bold", mr: 1, flex: 2 }}>
              nickname:
            </Typography>
            <Typography sx={{ flex: 3 }}>{profileUser?.nickname}</Typography>
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
              {formatDate(profileUser?.updated_at)}
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
              <IconButton onClick={() => setIsEditing(false)}>
                <SaveTwoToneIcon />
              </IconButton>
            )}
          </CardActions>
        </CardContent>
      </Card>
    </Box>
  );
};
export default UserProfile;
