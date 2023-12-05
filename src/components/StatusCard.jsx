import {
  Card,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import { Draggable } from "react-beautiful-dnd";

const StatusCard = ({
  activeGroup,
  activeTile,
  status,
  handleEditStatus,
  handleRemoveStatus,
  index,
}) => {
  return (
    <Draggable draggableId={status.id.toString()} index={index}>
      {(provided) => (
        <Card
          // key={status.id}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          elevation={activeTile ? 20 : 3}
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
              <DragHandleIcon sx={{ cursor: "grabbing" }} />
            </ListItemIcon>
            <ListItemText
              primary={status.title}
              sx={{ paddingRight: "6rem" }}
            />
          </ListItem>
        </Card>
      )}
    </Draggable>
  );
};

export default StatusCard;
