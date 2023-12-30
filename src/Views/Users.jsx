import {
  AppBar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Link,
  Toolbar,
} from "@mui/material";
import { useGetUserList } from "../hooks/user";

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
      <Card
        elevation={2}
        sx={{
          minWidth: "17rem",
        }}
      >
        <AppBar
          elevation={2}
          position="static"
          sx={{ backgroundColor: "primary.main" }}
        >
          <Toolbar sx={{ fontWeight: "500", fontSize: "20px" }}>Users</Toolbar>
        </AppBar>
        <CardContent
          sx={{
            "&:last-child": {
              pb: 0,
            },
          }}
        >
          {isUserListPending && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress sx={{ m: "2rem" }} size={30} />
            </Box>
          )}
          {userList && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 1,
              }}
            >
              {userList?.map((user) => (
                <Box
                  key={user.user_id}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    mb: 1,
                  }}
                >
                  <Link
                    href={`/${user.user_id}`}
                    color="inherit"
                    underline="none"
                    sx={{
                      flexGrow: 1,
                      fontWeight: "500",
                      textAlign: "center",
                    }}
                  >
                    {user.name}
                  </Link>
                </Box>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Users;
