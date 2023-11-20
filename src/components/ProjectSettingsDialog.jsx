import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { useContext, forwardRef, useState, useEffect } from "react";
import ToDoContext from "../contexts/ToDoContext";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import SortableStatus from "./SortableStatus";
import { set } from "date-fns";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ProjectSettingsDialog = () => {
  const {
    isProjectSettingsDialogOpen,
    setIsProjectSettingsDialogOpen,
    setIsStatusFormDialogOpen,
    statusList,
    handleRemoveStatus,
    statusLoading,
    setStatusFormData,
  } = useContext(ToDoContext);

  const [items, setItems] = useState([]);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    setItems(statusList.map((status) => status.id));
  }, [statusList]);

  console.log("items", items);
  console.log("statusList", statusList);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleEditStatus = (status) => {
    setStatusFormData(status);
    setIsStatusFormDialogOpen(true);
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  };

  const activeItem = statusList.find((status) => status.id === activeId);

  return (
    <Dialog
      fullScreen
      open={isProjectSettingsDialogOpen}
      onClose={() => setIsProjectSettingsDialogOpen(false)}
      TransitionComponent={Transition}
    >
      <AppBar elevation={6} sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setIsProjectSettingsDialogOpen(false)}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Project Settings
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar
        id="project-settings-toolbar"
        variant="dense"
        color="inherit"
        sx={{
          display: "flex",
          backgroundColor: "neutral",
          mb: 2,
        }}
      >
        <Button
          color="inherit"
          variant="contained"
          size="small"
          onClick={() => setIsStatusFormDialogOpen(true)}
        >
          Create ToDo Status
        </Button>
      </Toolbar>

      <Box sx={{ display: "flex" }}>
        <Box sx={{ flexGrow: "1" }} />
        <Paper elevation={6}>
          <AppBar
            elevation={6}
            sx={{ position: "static", backgroundColor: "neutral" }}
          >
            <Toolbar>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  textAlign: "center",
                  color: "secondary.main",
                  opacity: "0.9",
                }}
              >
                Status Management
              </Typography>
            </Toolbar>
          </AppBar>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={items}
              strategy={verticalListSortingStrategy}
            >
              <List>
                {items.map((id) => {
                  const status = statusList.find((s) => s.id === id);
                  return status ? (
                    <SortableStatus
                      key={status.id}
                      status={status}
                      statusLoading={statusLoading}
                      handleEditStatus={() => handleEditStatus(status)}
                      handleRemoveStatus={() => handleRemoveStatus(status.id)}
                    />
                  ) : null;
                })}
              </List>
            </SortableContext>
            <DragOverlay>
              {activeItem ? (
                <SortableStatus
                  status={activeItem}
                  statusLoading={statusLoading}
                  handleEditStatus={() => handleEditStatus(activeItem)}
                  handleRemoveStatus={() => handleRemoveStatus(activeItem.id)}
                />
              ) : null}
            </DragOverlay>
          </DndContext>
        </Paper>
        <Box sx={{ flexGrow: "1" }} />
      </Box>
    </Dialog>
  );
};

export default ProjectSettingsDialog;
