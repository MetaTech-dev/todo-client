import {
  CircularProgress,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";

const SortableStatus = ({
  status,
  statusLoading,
  handleEditStatus,
  handleRemoveStatus,
}) => {
  return (
    <ListItem
      key={status.id}
      secondaryAction={
        <>
          <IconButton
            onClick={() => handleEditStatus(status)}
            aria-label="Edit Status"
          >
            {!statusLoading && <EditTwoToneIcon />}
            {statusLoading && (
              <CircularProgress size={25} sx={{ marginRight: 1 }} />
            )}
          </IconButton>
          <IconButton
            onClick={() => handleRemoveStatus(status.id)}
            aria-label="Delete Status"
          >
            {!statusLoading && <DeleteOutlineOutlinedIcon />}
            {statusLoading && (
              <CircularProgress size={25} sx={{ marginRight: 1 }} />
            )}
          </IconButton>
        </>
      }
    >
      <ListItemIcon>
        <DragHandleIcon />
      </ListItemIcon>
      <ListItemText primary={status.title} sx={{ paddingRight: "6rem" }} />
    </ListItem>
  );
};

export default SortableStatus;
