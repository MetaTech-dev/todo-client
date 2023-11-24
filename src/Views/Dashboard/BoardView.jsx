import { useContext, useEffect } from "react";
import { Box, Card, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ToDoCard from "../../components/ToDoCard";
import ToDoContext from "../../contexts/ToDoContext";
import LoadingStatusBoardView from "../../components/loading/LoadingStatusBoardView";
import { useGetStatusList } from "../../hooks/status";
import { enqueueSnackbar } from "notistack";

const BoardView = () => {
  const theme = useTheme();
  const { filteredToDoList } = useContext(ToDoContext);
  const {
    data: statusList,
    isPending: statusPending,
    isError: statusFailed,
    error: statusError,
  } = useGetStatusList();

  useEffect(() => {
    if (statusFailed) {
      enqueueSnackbar(
        statusError.message || "An error occurred fetching statuses",
        { variant: "error" }
      );
    }
  }, [statusFailed, statusError]);

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
      {!statusPending &&
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
              <Card
                className="statusTitle"
                elevation={5}
                sx={{
                  alignSelf: "center",
                  width: "fit-content",
                  maxWidth: theme.spacing(40),
                  marginBottom: 1,
                  flexShrink: 0,
                  pl: 1.5,
                  pr: 1.5,
                }}
              >
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
              </Card>
              <Paper
                elevation={10}
                sx={{
                  backgroundColor: "neutral",
                  minWidth: theme.spacing(40),
                  overflowY: "auto",
                  flexGrow: 1,
                  p: 1,
                }}
              >
                {filterToDosByStatus(status).map((toDo) => {
                  return <ToDoCard toDo={toDo} key={toDo.id} />;
                })}
              </Paper>
            </Box>
          );
        })}
      {statusPending && (
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
