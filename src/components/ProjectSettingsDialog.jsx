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
import { useContext, forwardRef, useState, useEffect, useRef } from "react";
import ToDoContext from "../contexts/ToDoContext";
import {
  DndContext,
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
import SortableStatus from "./SortableStatus";

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
    handleUpdateStatus,
  } = useContext(ToDoContext);

  const [items, setItems] = useState([]);
  const [dialogJustOpened, setDialogJustOpened] = useState(false);

  useEffect(() => {
    if (isProjectSettingsDialogOpen) {
      setDialogJustOpened(true);
    }
  }, [isProjectSettingsDialogOpen]);

  useEffect(() => {
    if (dialogJustOpened) {
      setItems(statusList.map((status) => status.id));
      setDialogJustOpened(false);
    }
  }, [statusList, dialogJustOpened]);

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

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);

      if (newIndex !== oldIndex) {
        const newItems = arrayMove(items, oldIndex, newIndex);

        const updatedStatus = statusList.find(
          (status) => status.id === active.id
        );
        if (updatedStatus) {
          const updatedStatusData = {
            ...updatedStatus,
            position: newIndex + 1,
          };

          try {
            await handleUpdateStatus(updatedStatusData);
            setItems(newItems);
          } catch (error) {
            console.log("Error updating status position:", error);
          }
        }
      }
    }
  };

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
          </DndContext>
        </Paper>
        <Box sx={{ flexGrow: "1" }} />
      </Box>
    </Dialog>
  );
};

export default ProjectSettingsDialog;
