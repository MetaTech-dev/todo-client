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
import {
  useGetOneUser,
  useGetUserList,
  useUpdateUser,
  useUpdateUserRoles,
} from "../../hooks/user";

const Dashboard = () => {
  const { setIsProjectSettingsDialogOpen, setIsToDoFormDialogOpen } =
    useContext(ToDoContext);

  const { data: statusList, isPending: isStatusListPending } =
    useGetStatusList();

  ///testing section!!!!
  const { data: toDoList } = useGetToDoList();

  const { data: userList } = useGetUserList();

  const { data: user } = useGetOneUser("auth0|6577ca8e34659f99dd98d66b");
  console.log("userList", userList);

  // const { mutate: updateUser } = useUpdateUser();

  const { mutate: updateUserRole } = useUpdateUserRoles();

  const handleUpdate = () => {
    // const body = {
    //     name: "DEFINITELY ZAQ",
    // };
    // const userId = user?.user_id;
    // if (user) {
    //   updateUser({ userId, body });
    // }

    const roles = [`rol_bCQ2d2jO6kxIsQyI`];
    const userId = "google-oauth2|102295201720803560500";
    updateUserRole({ userId, roles });
  };

  //end of testing section :)

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
          <Button onClick={() => handleUpdate()}>update</Button>
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
