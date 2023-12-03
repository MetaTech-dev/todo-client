import { AppBar, Box, Card, Paper, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ToDoCard from "../../components/ToDoCard";
import LoadingStatusBoardView from "../../components/loading/LoadingStatusBoardView";

const BoardView = ({ statusList, isStatusListPending, filteredToDoList }) => {
  const theme = useTheme();

  const filterToDosByStatus = (status) => {
    return filteredToDoList.filter((toDo) => toDo.statusId === status.id);
  };

  return (
    <Box
      id="board-view-container"
      sx={{
        display: "flex",
        flexGrow: 1,
        overflowX: "auto",
        justifyContent: "flex-start",
        pt: 1,
      }}
    >
      {!isStatusListPending &&
        filteredToDoList &&
        statusList &&
        statusList?.map((status) => {
          return (
            <Box
              className="status-column"
              key={status.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                m: 1,
                maxWidth: theme.spacing(40),
              }}
            >
              <Paper
                elevation={10}
                sx={{
                  backgroundColor: "neutral.main",
                  minWidth: theme.spacing(40),
                  overflowY: "auto",
                  flexGrow: 1,
                  // p: 1,
                }}
              >
                <AppBar
                  position="static"
                  elevation={13}
                  sx={{ mb: 1, borderRadius: "3px" }}
                  color="primary"
                >
                  <Toolbar variant="dense" color="inherit">
                    <Typography
                      sx={{
                        fontWeight: "450",
                        fontSize: "22px",
                        opacity: ".8",
                        textAlign: "center",
                      }}
                    >
                      {status.title}
                    </Typography>
                  </Toolbar>
                </AppBar>
                {filterToDosByStatus(status)?.map((toDo) => {
                  return <ToDoCard toDo={toDo} key={toDo.id} />;
                })}
              </Paper>
            </Box>
          );
        })}
      {(isStatusListPending || !filteredToDoList) && (
        <>
          <LoadingStatusBoardView key={1} />
          <LoadingStatusBoardView key={2} />
          <LoadingStatusBoardView key={3} />
        </>
      )}
    </Box>
  );
};

export default BoardView;
