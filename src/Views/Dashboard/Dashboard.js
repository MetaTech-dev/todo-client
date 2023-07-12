import { useContext, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  TextField,
  Toolbar,
} from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import BoardView from "./BoardView";
import ToDoContext from "../../ToDoContext";
import ListView from "./ListView";
import SettingsIcon from "@mui/icons-material/Settings";

const Dashboard = () => {
  const {
    handleChangeSearchQuery,
    setIsToDoFormDialogOpen,
    setIsToDoFormNew,
    setIsProjectSettingsDialogOpen,
  } = useContext(ToDoContext);

  const handleToDoFormOpen = () => {
    setIsToDoFormDialogOpen(true);
    setIsToDoFormNew(true);
  };

  const handleProjectSettingsDialogOpen = () => {
    setIsProjectSettingsDialogOpen(true);
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

  const handleSearchFieldChange = (e) => {
    handleChangeSearchQuery(e.target.value);
  };

  return (
    <Box id="Dashboard-Box" sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "neutral", flexShrink: 1 }}
      >
        <Toolbar id="dashboard-toolbar" variant="dense" color="inherit">
          <Button
            variant="contained"
            size="small"
            onClick={() => handleToDoFormOpen()}
            sx={{ marginRight: "1rem" }}
          >
            New ToDo
          </Button>
          <Box sx={{ flexGrow: 1 }} />

          <TextField
            id="outlined-search"
            label="Search field"
            variant="outlined"
            type="search"
            size="small"
            sx={{ marginRight: "1rem" }}
            onChange={handleSearchFieldChange}
          />
          <ToggleButtonGroup
            color="secondary"
            size="small"
            value={viewState}
            exclusive
            onChange={handleViewState}
            aria-label="View Option Buttons"
          >
            <ToggleButton value="board">Board</ToggleButton>
            <ToggleButton value="list">List</ToggleButton>
          </ToggleButtonGroup>
          <IconButton
            color="primary.dark"
            aria-label="Open Project Settings"
            onClick={() => handleProjectSettingsDialogOpen()}
            sx={{ marginLeft: "1rem" }}
          >
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {getViewState()}
    </Box>
  );
};

export default Dashboard;
