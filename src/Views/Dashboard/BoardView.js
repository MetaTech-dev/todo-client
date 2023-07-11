import { useContext } from "react";
import { Box, Card, Paper, Stack, Typography } from "@mui/material";
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
            key={status.id}
          >
            <Card
              className="statusTitle"
              elevation={5}
              sx={{
                minWidth: "10rem",
                alignItems: "center",
                marginBottom: "0.5rem",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "450",
                  fontSize: "22px",
                  opacity: ".8",
                  textAlign: "center",
                  padding: "0 1rem",
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
                marginTop: "1rem",
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
