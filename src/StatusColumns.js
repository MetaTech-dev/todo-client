import { useContext } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import ToDoCard from "./ToDoCard";
import ToDoContext from "./ToDoContext";

const StatusColumns = () => {
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
      }}
    >
      {statusList.map((status) => {
        return (
          <Stack sx={{ height: "100%", width: "100%", alignItems: "center" }}>
            <Typography>{status}</Typography>
            <Paper elevation={2}>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {filterToDosByStatus(status).map((toDo) => {
                  return (
                    <li key={toDo.id}>
                      <ToDoCard toDo={toDo} />
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

export default StatusColumns;
