import { useState } from "react";
import { Box, Button } from "@mui/material";
import ToDoFormDialog from "../ToDoFormDialog";
import StatusColumns from "../StatusColumns";
import StatusDialog from "../StatusDialog";

const Dashboard = () => {
  const [showToDoForm, setShowToDoForm] = useState(false);
  const [showStatusDialog, setShowStatusDialog] = useState(false);

  const handleToDoFormOpen = () => {
    setShowToDoForm(true);
  };
  const handleNewStatusDialogOpen = () => {
    setShowStatusDialog(true);
  };

  return (
    <Box>
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
        onClick={handleNewStatusDialogOpen}
      >
        Create ToDo Status
      </Button>
      <ToDoFormDialog isOpen={showToDoForm} setIsOpen={setShowToDoForm} />
      <StatusDialog isOpen={showStatusDialog} setIsOpen={setShowStatusDialog} />
      <StatusColumns />
    </Box>
  );
};

export default Dashboard;
