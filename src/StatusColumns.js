import { useContext } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import ToDoCard from "./ToDoCard";
import ToDoContext from "./ToDoContext";

const StatusColumns = () => {
  const { toDoList } = useContext(ToDoContext);

  return (
    <Box
      id="stack-holder"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        overflowX: "auto",
      }}
    >
      <Stack sx={{ height: "100%", width: "100%", alignItems: "center" }}>
        <Typography>New</Typography>
        <Paper elevation={2}>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {toDoList.map((toDo) => {
              return (
                <li key={toDo.id}>
                  <ToDoCard toDo={toDo} />
                </li>
              );
            })}
          </ul>
        </Paper>
      </Stack>
      <Stack sx={{ height: "100%", width: "100%", alignItems: "center" }}>
        <Typography>Ready</Typography>
      </Stack>
      <Stack sx={{ height: "100%", width: "100%", alignItems: "center" }}>
        <Typography>In Progress</Typography>
      </Stack>
      <Stack sx={{ height: "100%", width: "100%", alignItems: "center" }}>
        <Typography>In Review</Typography>
      </Stack>
      <Stack sx={{ height: "100%", width: "100%", alignItems: "center" }}>
        <Typography>Done</Typography>
      </Stack>
    </Box>
  );
};

export default StatusColumns;
