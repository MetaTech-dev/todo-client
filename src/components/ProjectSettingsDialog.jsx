import {
  AppBar,
  Box,
  Button,
  Dialog,
  IconButton,
  List,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { useContext, forwardRef, useState } from "react";
import ToDoContext from "../contexts/ToDoContext";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import StatusCard from "./StatusCard";
import { useGetStatusList, useUpdateStatusList } from "../hooks/status";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ProjectSettingsDialog = () => {
  const {
    isProjectSettingsDialogOpen,
    setIsProjectSettingsDialogOpen,
    setIsStatusFormDialogOpen,
    setStatusFormData,
    setDeleteConfirmationItemType,
    setDeleteConfirmationItem,
    setIsDeleteConfirmationDialogOpen,
  } = useContext(ToDoContext);

  const { data: statusList, isSuccess: isStatusListSuccess } =
    useGetStatusList();

  const [activeId, setActiveId] = useState(null);

  const { mutate: updateStatusList } = useUpdateStatusList();

  const handleEditStatus = (status) => {
    setStatusFormData(status);
    setIsStatusFormDialogOpen(true);
  };

  const handleDeleteClick = (item, itemType) => {
    setDeleteConfirmationItemType(itemType);
    setDeleteConfirmationItem(item);
    setIsDeleteConfirmationDialogOpen(true);
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result.map((item, index) => ({
      ...item,
      position: index + 1,
    }));
  };

  const handleDragStart = (event) => {
    setActiveId(event.draggableId);
  };

  const handleDragEnd = (event) => {
    if (!event.destination) {
      setActiveId(null);
      return;
    }
    if (event.destination.index === event.source.index) {
      setActiveId(null);
      return;
    }

    const draggedStatuses = reorder(
      statusList,
      event.source.index,
      event.destination.index
    );

    updateStatusList(draggedStatuses);

    setActiveId(null);
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
          backgroundColor: "neutral.main",
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
            sx={{ position: "static", backgroundColor: "neutral.main" }}
          >
            <Toolbar>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  textAlign: "center",
                  color: "neutral.contrastText",
                  opacity: "0.9",
                }}
              >
                Status Management
              </Typography>
            </Toolbar>
          </AppBar>
          <DragDropContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <Droppable droppableId="status-list">
              {(provided) => (
                <List
                  sx={{ p: 0 }}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {isStatusListSuccess &&
                    statusList.map((status) => {
                      return (
                        <StatusCard
                          key={status.id}
                          status={status}
                          index={status.position - 1}
                          handleEditStatus={() => handleEditStatus(status)}
                          handleRemoveStatus={() =>
                            handleDeleteClick(status, "status")
                          }
                          activeCard={
                            activeId?.toString() === status.id.toString()
                          }
                        />
                      );
                    })}
                  {provided.placeholder}
                </List>
              )}
            </Droppable>
          </DragDropContext>
        </Paper>
        <Box sx={{ flexGrow: "1" }} />
      </Box>
    </Dialog>
  );
};

export default ProjectSettingsDialog;
