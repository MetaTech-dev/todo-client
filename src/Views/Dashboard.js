import { Label } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import ToDoCard from "../ToDoCard";

const Dashboard = () => {
  return (
    <Box>
      <Button color="inherit" variant="outlined">
        New Task:
      </Button>
      <ToDoCard />
    </Box>
  );
};

export default Dashboard;
