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
  activeCard,
  status,
  handleEditStatus,
  handleRemoveStatus,
  index,
}) => {
  return (
    <Draggable draggableId={status.id.toString()} index={index}>
      {(provided) => (
        <Card
          key={status.id}
          ref={provided.innerRef}
          {...provided.draggableProps}
          elevation={activeCard ? 5 : 2}
          sx={{ mt: 0.5 }}
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
            <ListItemIcon
              {...provided.dragHandleProps}
              sx={{ minWidth: "auto", mr: 2 }}
            >
              <DragHandleIcon />
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
