import { Label } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import ToDoCard from "../ToDoCard";

const Dashboard = () => {
  return (
    <Box>
      <Button color="inherit" variant="contained">
        New Task:
      </Button>
      <Box
        id="stack-holder"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          overflowX: "auto",
        }}
      >
        <Stack sx={{ height: "100%", width: "100%" }}>
          <Typography>New</Typography>
          <ToDoCard />
        </Stack>
        <Stack sx={{ height: "100%", width: "100%" }}>
          <Typography>Ready</Typography>
        </Stack>
        <Stack sx={{ height: "100%", width: "100%" }}>
          <Typography>In Progress</Typography>
        </Stack>
        <Stack sx={{ height: "100%", width: "100%" }}>
          <Typography>In Review</Typography>
        </Stack>
        <Stack sx={{ height: "100%", width: "100%" }}>
          <Typography>Done</Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default Dashboard;
