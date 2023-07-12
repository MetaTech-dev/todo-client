import { Box } from "@mui/system";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useContext } from "react";
import dayjs from "dayjs";
import ToDoContext from "../../ToDoContext";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Typography } from "@mui/material";

const ListView = () => {
  const {
    filteredToDoList,
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

  const rows = filteredToDoList;
  const columns = [
    { field: "title", headerName: "Title", width: 200, editable: true },
    {
      field: "description",
      headerName: "Description",
      width: 700,
      editable: true,
    },
    { field: "status", headerName: "Status", width: 110, editable: false },
    {
      field: "dueDate",
      headerName: "Due Date",
      width: 230,
      type: "date",
      valueGetter: (params) => dayjs(params.row.dueDate).toDate(),
      valueFormatter: (params) =>
        dayjs(params.value).isValid()
          ? dayjs(params.value).format("dddd, MMMM D, YYYY")
          : "none selected",
      editable: false,
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
      editable: false,
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
    <Box sx={{ minHeight: "100vh" }}>
      <DataGrid rows={rows} columns={columns} />
    </Box>
  );
};

export default ListView;
