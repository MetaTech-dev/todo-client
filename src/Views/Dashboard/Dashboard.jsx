import { useContext, useMemo, useState } from "react";
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
import ToDoContext from "../../contexts/ToDoContext";
import ListView from "./ListView";
import SettingsIcon from "@mui/icons-material/Settings";
import { useGetStatusList } from "../../hooks/status";
import { useGetToDoList } from "../../hooks/toDo";
import { useDebounce } from "../../utils/useDebounce";

const Dashboard = () => {
  const { setIsProjectSettingsDialogOpen, setIsToDoFormDialogOpen } =
    useContext(ToDoContext);

  const { data: statusList, isPending: isStatusListPending } =
    useGetStatusList();

  const { data: toDoList } = useGetToDoList();

  const [searchQuery, setSearchQuery] = useState("");
  const handleChangeSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const filteredToDoList = useMemo(() => {
    if (debouncedSearchQuery === "") {
      return toDoList;
    } else {
      return toDoList.filter((toDo) =>
        Object.values(toDo).some((value) =>
          String(value)
            .toLowerCase()
            .includes(debouncedSearchQuery.toLowerCase())
        )
      );
    }
  }, [toDoList, debouncedSearchQuery]);

  // DIALOG SECTION

  const handleToDoFormOpen = () => {
    setIsToDoFormDialogOpen(true);
  };

  const handleProjectSettingsDialogOpen = () => {
    setIsProjectSettingsDialogOpen(true);
  };

  // VIEW STATE SECTION

  const [viewState, setViewState] = useState("board");
  const handleViewState = (event, newViewState) => {
    setViewState(newViewState);
  };
  const getViewState = () => {
    switch (viewState) {
      case "board":
        return (
          <BoardView
            statusList={statusList}
            isStatusListPending={isStatusListPending}
            filteredToDoList={filteredToDoList}
          />
        );
      case "list":
        return (
          <ListView
            statusList={statusList}
            filteredToDoList={filteredToDoList}
          />
        );
      default:
        return (
          <BoardView
            statusList={statusList}
            isStatusListPending={isStatusListPending}
            filteredToDoList={filteredToDoList}
          />
        );
    }
  };

  return (
    <Box
      id="dashboard-container"
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <AppBar position="static" sx={{ backgroundColor: "neutral.main" }}>
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
            sx={{
              marginRight: "1rem",
              "& .MuiInputBase-root": {
                backgroundColor: "white",
              },
            }}
            onChange={handleChangeSearchQuery}
          />
          <ToggleButtonGroup
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
