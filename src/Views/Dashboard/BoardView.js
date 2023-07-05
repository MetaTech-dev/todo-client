import { useContext } from "react";
import { Box, Card, Paper, Stack, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import ToDoCard from "../../ToDoCard";
import ToDoContext from "../../ToDoContext";

const BoardView = () => {
  const theme = useTheme();
  const { toDoList, statusList } = useContext(ToDoContext);

  const filterToDosByStatus = (status) => {
    return toDoList.filter((toDo) => toDo.status === status);
  };

  return (
    <Box
      id="stack-holder"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        overflowX: "auto",
        minHeight: "100vh",
      }}
    >
      {statusList.map((status) => {
        return (
          <Stack
            sx={{
              height: "100%",
              width: "100%",
              margin: "1rem",
              alignItems: "center",
              display: "flex",
            }}
            key={status}
          >
            <Card
              className="statusTitle"
              elevation={5}
              sx={{
                minWidth: "10rem",
                alignItems: "center",
                maxWidth: "30%",
                marginBottom: "1rem",
                marginLeft: "auto",
                marginRight: "auto",
                position: "fixed",
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
                {status}
              </Typography>
            </Card>
            <Paper
              elevation={10}
              sx={{
                backgroundColor: alpha(theme.palette.primary.light, 0.35),
                minWidth: theme.spacing(40),
                minHeight: theme.spacing(10),
                marginTop: "3rem",
                overflow: "auto",
                maxHeight: "80vh",
                "::-webkit-scrollbar": {
                  width: "0em",
                  height: "0em",
                },
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
          </Stack>
        );
      })}
    </Box>
  );
};

export default BoardView;
