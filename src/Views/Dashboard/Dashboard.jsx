import { useContext, useEffect, useMemo, useState } from "react";
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
import { useOrganization } from "@clerk/clerk-react";
import AppContext from "../../contexts/AppContext";

const Dashboard = () => {
  const { isMobile } = useContext(AppContext);

  const { setIsProjectSettingsDialogOpen, setIsToDoFormDialogOpen } =
    useContext(ToDoContext);
  const { user } = useGetCurrentUser();

  const { data: statusList, isPending: isStatusListPending } =
    useGetStatusList();

  const { organization } = useOrganization();

  const isAdmin = useMemo(
    () => (organization ? user?.role === "org:admin" : true),
    [user]
  );

  const { data: toDoList, isPending: isToDoListPending } = useGetToDoList();

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
            handleToDoFormOpen={handleToDoFormOpen}
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

  useEffect(() => {
    if (isMobile) {
      setViewState("board");
    }
  }, [isMobile]);

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: "neutral.main" }}
        elevation={4}
      >
        <Toolbar id="dashboard-toolbar" variant="dense" color="inherit">
          {!isMobile && (
            <Button
              variant="contained"
              size="small"
              onClick={() => handleToDoFormOpen()}
            >
              New ToDo
            </Button>
          )}
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
          {!isMobile && (
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
          )}
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
      <Box
        id="dashboard-view-container"
        sx={{
          display: "flex",
          flexGrow: 1,
          p: 1,
          gap: 1,
          overflowX: "auto",
          overflowY: "hidden",
          justifyContent: "flex-start",
          width: "100%",
          height: "100%",
        }}
      >
        {getViewState()}
      </Box>
    </>
  );
};

export default Dashboard;
