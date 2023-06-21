import { useState } from "react";
import { Box, Button } from "@mui/material";
import ToDoFormDialog from "../ToDoFormDialog";
import StatusColumns from "../StatusColumns";

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);

  const handleOpen = () => {
    setShowForm(true);
  };

  return (
    <Box>
      <Button color="inherit" variant="contained" onClick={handleOpen}>
        New ToDo:
      </Button>
      <ToDoFormDialog isOpen={showForm} setIsOpen={setShowForm} />
      <StatusColumns />
    </Box>
  );
};

export default Dashboard;
