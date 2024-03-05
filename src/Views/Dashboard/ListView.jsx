import { Box } from "@mui/system";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useContext } from "react";
import dayjs from "dayjs";
import DialogContext from "../../contexts/DialogContext";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { CircularProgress, Typography } from "@mui/material";

const ListView = ({ statusList, filteredToDoList }) => {
  const {
    setToDoFormData,
    setIsToDoFormDialogOpen,
    toDoLoading,
    setDeleteConfirmationItemType,
    setDeleteConfirmationItem,
    setIsDeleteConfirmationDialogOpen,
  } = useContext(DialogContext);

  const getStatusTitle = (statusId) => {
    const status =
      statusList?.length > 0
        ? statusList?.find((status) => status.id === statusId)
        : null;
    return status ? status?.title : "Unknown Status";
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

  const handleDeleteClick = (item, itemType) => {
    setDeleteConfirmationItemType(itemType);
    setDeleteConfirmationItem(item);
    setIsDeleteConfirmationDialogOpen(true);
  };

  const rows = filteredToDoList;

  const columns = [
    { field: "title", headerName: "Title", flex: 0.75, editable: false },
    {
      field: "description",
      headerName: "Description",
      flex: 2,
      editable: false,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.4,
      editable: false,
      renderCell: (params) => {
        const statusTitle = getStatusTitle(params.row.statusId);
        return <span>{statusTitle}</span>;
      },
    },
    {
      field: "createdDate",
      headerName: "Created At",
      flex: 0.4,
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
      flex: 0.4,
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
      flex: 0.3,
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
      flex: 0.25,
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
            onClick={() => handleDeleteClick(toDo, "toDo")}
            color="inherit"
            aria-label="Delete ToDo"
          />,
        ];
      },
    },
  ];
  return <DataGrid rows={rows} columns={columns} />;
};

export default ListView;
