import {
  Card,
  CircularProgress,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";

const SortableStatus = ({
  active,
  status,
  statusLoading,
  handleEditStatus,
  handleRemoveStatus,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: status.id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };

  return (
    <Card
      key={status.id}
      ref={setNodeRef}
      style={style}
      {...attributes}
      elevation={active ? 20 : 3}
    >
      <ListItem
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
          <DragHandleIcon {...listeners} sx={{ cursor: "grabbing" }} />
        </ListItemIcon>
        <ListItemText primary={status.title} sx={{ paddingRight: "6rem" }} />
      </ListItem>
    </Card>
  );
};

export default SortableStatus;
