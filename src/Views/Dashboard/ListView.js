import { Box } from "@mui/system";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useContext } from "react";
import dayjs from "dayjs";
import ToDoContext from "../../ToDoContext";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Typography } from "@mui/material";

const ListView = ({ toDo }) => {
  const {
    toDoList,
    deleteToDo,
    setToDoFormData,
    setIsToDoFormDialogOpen,
    setIsToDoFormNew,
  } = useContext(ToDoContext);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "low":
        return "success.main";
      case "medium":
        return "warning.main";
      case "high":
        return "error.main";
      default:
        return "success.main";
    }
  };

  const handleEdit = (toDo) => {
    setToDoFormData(toDo);
    setIsToDoFormNew(false);
    setIsToDoFormDialogOpen(true);
  };

  const handleDelete = (toDo) => {
    deleteToDo(toDo.id);
  };

  const rows = toDoList.map((toDo) => ({
    id: toDo.id,
    title: toDo.title,
    description: toDo.description,
    priority: toDo.priority,
    dueDate: toDo.dueDate,
    status: toDo.status,
  }));
  const columns = [
    { field: "title", headerName: "Title", width: 200, editable: true },
    {
      field: "description",
      headerName: "Description",
      width: 300,
      editable: true,
    },
    { field: "status", headerName: "Status", width: 120, editable: true },
    {
      field: "dueDate",
      headerName: "Due Date",
      width: 200,
      type: "date",
      valueGetter: (params) => dayjs(params.row.dueDate).toDate(),
      valueFormatter: (params) =>
        dayjs(params.value).format("dddd, MMMM D, YYYY"),
      editable: true,
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 90,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ paddingRight: "0.5rem" }}>
            {params.value}{" "}
          </Typography>
          <FiberManualRecordIcon
            sx={{
              fontSize: "small",
              color: getPriorityColor(params.value),
            }}
          />
        </Box>
      ),
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: (params) => {
        const toDo = params.row;
        return [
          <GridActionsCellItem
            icon={<EditTwoToneIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEdit(toDo)}
            color="inherit"
            aria-label="Edit ToDo"
          />,
          <GridActionsCellItem
            icon={<DeleteOutlineOutlinedIcon />}
            label="Delete"
            onClick={() => handleDelete(toDo)}
            color="inherit"
            aria-label="Delete ToDo"
          />,
        ];
      },
    },
  ];
  return (
    <Box>
      <DataGrid rows={rows} columns={columns} />
    </Box>
  );
};

export default ListView;
