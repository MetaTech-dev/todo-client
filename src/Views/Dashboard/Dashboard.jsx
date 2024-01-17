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
import { useGetCurrentUser } from "../../hooks/user";

const Dashboard = () => {
  const { setIsProjectSettingsDialogOpen, setIsToDoFormDialogOpen } =
    useContext(ToDoContext);
  const { user } = useGetCurrentUser();

  const { data: statusList, isPending: isStatusListPending } =
    useGetStatusList();

  const isAdmin = useMemo(() => user?.role === "org:admin", [user]);

  const getTodoListResult = useGetToDoList();
  const { data: toDoList, isPending: isToDoListPending } = getTodoListResult;

  const [searchQuery, setSearchQuery] = useState("");
  const handleChangeSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const filteredToDoList = useMemo(() => {
    if (debouncedSearchQuery === "") {
      if (!toDoList) return [];
      return toDoList;
    } else {
      if (!toDoList) return [];
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
            toDoList={toDoList}
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
      <AppBar
        position="static"
        sx={{ backgroundColor: "neutral.main" }}
        elevation={4}
      >
        <Toolbar id="dashboard-toolbar" variant="dense" color="inherit">
          <Button
            variant="contained"
            size="small"
            onClick={() => handleToDoFormOpen()}
          >
            New ToDo
          </Button>
          <Box sx={{ flexGrow: 0.03 }} />
          <TextField
            id="outlined-search"
            placeholder="Search ToDos"
            variant="outlined"
            type="search"
            size="small"
            onChange={handleChangeSearchQuery}
            inputProps={{ style: { padding: "0.33rem" } }}
          />
          <Box sx={{ flexGrow: 1 }} />
          <ToggleButtonGroup
            size="small"
            value={viewState}
            exclusive
            onChange={handleViewState}
            aria-label="View Option Buttons"
            disabled={isToDoListPending || isStatusListPending}
          >
            <ToggleButton value="board">Board</ToggleButton>
            <ToggleButton value="list">List</ToggleButton>
          </ToggleButtonGroup>
          {isAdmin && (
            <IconButton
              aria-label="Open Project Settings"
              onClick={() => handleProjectSettingsDialogOpen()}
              sx={{ marginLeft: "1rem" }}
            >
              <SettingsIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      {getViewState()}
    </Box>
  );
};

export default Dashboard;
