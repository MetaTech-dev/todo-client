import { useContext } from "react";
import { Box, Card, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ToDoCard from "../../ToDoCard";
import ToDoContext from "../../ToDoContext";

const BoardView = () => {
  const theme = useTheme();
  const { filteredToDoList, statusList } = useContext(ToDoContext);

  const filterToDosByStatus = (status) => {
    return filteredToDoList.filter((toDo) => toDo.status === status.title);
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
      {statusList.map((status) => {
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
    </Box>
  );
};

export default BoardView;
