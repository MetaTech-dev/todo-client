import { useContext } from "react";
import { Box, Button } from "@mui/material";
import StatusColumns from "../StatusColumns";
import ToDoContext from "../ToDoContext";

const Dashboard = () => {
  const {
    setIsToDoFormDialogOpen,
    setIsToDoFormNew,
    setIsStatusFormDialogOpen,
  } = useContext(ToDoContext);

  const handleToDoFormOpen = () => {
    setIsToDoFormDialogOpen(true);
    setIsToDoFormNew(true);
  };

  const handleNewStatusFormDialogOpen = () => {
    setIsStatusFormDialogOpen(true);
  };

  return (
    <Box sx={{ overflow: "scroll" }}>
      <Button
        color="inherit"
        variant="contained"
        onClick={handleToDoFormOpen}
        sx={{ marginRight: "1rem" }}
      >
        New ToDo
      </Button>
      <Button
        color="inherit"
        variant="contained"
        onClick={handleNewStatusFormDialogOpen}
      >
        Create ToDo Status
      </Button>

      <StatusColumns />
    </Box>
  );
};

export default Dashboard;
