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
        width: "100%",
        height: "100%",
      }}
    >
      {statusList.map((status) => {
        return (
          <Box
            key={status.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              margin: "1rem",
            }}
          >
            <Card
              className="statusTitle"
              elevation={5}
              sx={{
                minWidth: "10rem",
                marginBottom: "0.5rem",
                flexShrink: 0,
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
                minHeight: theme.spacing(10),
                overflow: "auto",
                "::-webkit-scrollbar": {
                  width: "0em",
                  height: "0em",
                },
                flexGrow: 1,
              }}
            >
              <ul
                style={{
                  listStyle: "none",
                  padding: "0.3rem",
                }}
              >
                {filterToDosByStatus(status).map((toDo) => {
                  return (
                    <li key={toDo.id} style={{ display: "flex" }}>
                      <Box sx={{ flexGrow: 1 }} />
                      <ToDoCard toDo={toDo} />
                      <Box sx={{ flexGrow: 1 }} />
                    </li>
                  );
                })}
              </ul>
            </Paper>
          </Box>
        );
      })}
    </Box>
  );
};

export default BoardView;
