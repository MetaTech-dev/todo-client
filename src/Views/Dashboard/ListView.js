import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { useContext } from "react";
import ToDoContext from "../../ToDoContext";

const ListView = () => {
  const { toDoList } = useContext(ToDoContext);

  const rows = toDoList.map((toDo) => ({
    id: toDo.id,
    title: toDo.title,
    description: toDo.description,
    priority: toDo.priority,
    dueDate: toDo.dueDate,
    status: toDo.status,
  }));
  const columns = [
    // { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "dueDate", headerName: "Due Date", width: 200 },
    { field: "priority", headerName: "Priority", width: 90 },
  ];

  return (
    <Box>
      <DataGrid rows={rows} columns={columns} />
    </Box>
  );
};

export default ListView;
