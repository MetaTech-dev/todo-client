import {
  Card,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import { CSS } from "@dnd-kit/utilities";

const SortableStatus = ({
  activeGroup,
  activeTile,
  status,
  handleEditStatus,
  handleRemoveStatus,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: status.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      key={status.id}
      ref={setNodeRef}
      style={style}
      {...attributes}
      elevation={activeTile ? 20 : 3}
      sx={{
        mt: activeGroup ? 0.4 : 0.2,
        transition: "all .1s ease",
      }}
    >
      <ListItem
        secondaryAction={
          <>
            <IconButton
              onClick={() => handleEditStatus(status)}
              aria-label="Edit Status"
            >
              <EditTwoToneIcon />
            </IconButton>
            <IconButton
              onClick={() => handleRemoveStatus(status.id)}
              aria-label="Delete Status"
            >
              <DeleteOutlineOutlinedIcon />
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
