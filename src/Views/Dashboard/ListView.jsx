import { Box } from "@mui/system";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useContext, useEffect } from "react";
import dayjs from "dayjs";
import ToDoContext from "../../contexts/ToDoContext";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { CircularProgress, Typography } from "@mui/material";
import { useGetStatusList } from "../../hooks/status";
import { enqueueSnackbar } from "notistack";

const ListView = () => {
  const {
    filteredToDoList,
    handleRemoveToDo,
    setToDoFormData,
    setIsToDoFormDialogOpen,
    toDoLoading,
  } = useContext(ToDoContext);

  const { data: statusList, isPending: statusPending } = useGetStatusList();

  const getStatusTitle = (statusId) => {
    const status = statusList.find((status) => status.id === statusId);
    return status ? status.title : "Unknown Status";
  };

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
    const editedToDo = {
      ...toDo,
      dueDate: toDo.dueDate ? dayjs(toDo.dueDate) : null,
    };
    setToDoFormData(editedToDo);
    setIsToDoFormDialogOpen(true);
  };

  const rows = filteredToDoList;
  const columns = [
    { field: "title", headerName: "Title", width: 150, editable: true },
    {
      field: "description",
      headerName: "Description",
      width: 500,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 110,
      editable: false,
      renderCell: (params) => {
        const statusTitle = getStatusTitle(params.row.statusId);
        return <span>{statusTitle}</span>;
      },
    },
    {
      field: "createdDate",
      headerName: "Created At",
      width: 130,
      type: "date",
      valueGetter: (params) => dayjs(params.row.createdDate).toDate(),
      valueFormatter: (params) =>
        dayjs(params.value).isValid()
          ? dayjs(params.value).format("DD/MM/YYYY")
          : "",
      editable: false,
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      width: 130,
      type: "date",
      valueGetter: (params) => dayjs(params.row.dueDate).toDate(),
      valueFormatter: (params) =>
        dayjs(params.value).isValid()
          ? dayjs(params.value).format("DD/MM/YYYY")
          : "",
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
            icon={
              toDoLoading ? (
                <CircularProgress size={25} sx={{ marginRight: 1 }} />
              ) : (
                <EditTwoToneIcon />
              )
            }
            label="Edit"
            className="textPrimary"
            onClick={() => handleEdit(toDo)}
            color="inherit"
            aria-label="Edit ToDo"
          />,
          <GridActionsCellItem
            icon={
              toDoLoading ? (
                <CircularProgress size={25} sx={{ marginRight: 1 }} />
              ) : (
                <DeleteOutlineOutlinedIcon />
              )
            }
            label="Delete"
            onClick={() => handleRemoveToDo(toDo.id)}
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
