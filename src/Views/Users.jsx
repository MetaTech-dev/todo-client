import {
  Avatar,
  Box,
  Card,
  CardHeader,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
} from "@mui/material";
import { useGetUserList } from "../hooks/user";
import { Outlet, Link as RouterLink } from "react-router-dom";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";

const Users = () => {
  const { data: userList, isPending: isUserListPending } = useGetUserList();
  return (
    <Box
      id="users-container"
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
      <Card>
        <CardHeader
          title="Users"
          avatar={
            <Avatar
              sx={{
                backgroundColor: "primary.light",
              }}
            >
              <PeopleAltOutlinedIcon />
            </Avatar>
          }
          sx={{
            backgroundColor: "primary.main",
            color: "primary.contrastText",
          }}
          titleTypographyProps={{
            variant: "h6",
          }}
        />
        <List>
          {isUserListPending || !userList
            ? [...Array(4)].map((_, index) => (
                <ListItem disablePadding key={index}>
                  <ListItemButton>
                    <ListItemIcon>
                      <Skeleton variant="circular">
                        <Avatar />
                      </Skeleton>
                    </ListItemIcon>
                    <ListItemText>
                      <Skeleton variant="text" width={200} />
                      <Skeleton variant="text" width={200} />
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              ))
            : userList?.map((user) => (
                <ListItem key={user.id} disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to={`/users/${user.id}`}
                  >
                    <ListItemIcon>
                      <Avatar src={user.imageUrl} />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${user?.firstName} ${user?.lastName}`}
                      secondary={user.email}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
        </List>
      </Card>
      <Outlet />
    </Box>
  );
};

export default Users;
