import { useContext, useState } from "react";
import { Box, Button, Toolbar } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import BoardView from "./BoardView";
import ToDoContext from "../../ToDoContext";
import ListView from "./ListView";

const Dashboard = () => {
  const theme = useTheme();
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

  const [viewState, setViewState] = useState("board");
  const handleViewState = (event, newViewState) => {
    setViewState(newViewState);
  };
  const getViewState = () => {
    switch (viewState) {
      case "board":
        return <BoardView />;
      case "list":
        return <ListView />;
      default:
        return <BoardView />;
    }
  };
  return (
    <Box>
      <Toolbar
        id="dashboard-toolbar"
        variant="dense"
        color="inherit"
        sx={{
          display: "flex",
          backgroundColor: alpha(theme.palette.primary.light, 0.4),
        }}
      >
        <Button
          color="inherit"
          variant="contained"
          onClick={() => handleToDoFormOpen()}
          sx={{ marginRight: "1rem" }}
        >
          New ToDo
        </Button>
        <Button
          color="inherit"
          variant="contained"
          onClick={() => handleNewStatusFormDialogOpen()}
        >
          Create ToDo Status
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <ToggleButtonGroup
          value={viewState}
          exclusive
          onChange={handleViewState}
          aria-label="View Option Buttons"
        >
          <ToggleButton value="board">Board</ToggleButton>
          <ToggleButton value="list">List</ToggleButton>
        </ToggleButtonGroup>
      </Toolbar>

      {getViewState()}
    </Box>
  );
};

export default Dashboard;
