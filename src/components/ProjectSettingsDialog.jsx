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
import { useContext, forwardRef } from "react";
import ToDoContext from "../contexts/ToDoContext";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
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
  } = useContext(ToDoContext);

  const handleEditStatus = (status) => {
    setStatusFormData(status);
    setIsStatusFormDialogOpen(true);
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

          <List>
            {statusList?.map((status) => {
              return (
                <SortableStatus
                  key={status.id}
                  status={status}
                  statusLoading={statusLoading}
                  handleEditStatus={handleEditStatus}
                  handleRemoveStatus={handleRemoveStatus}
                />
              );
            })}
          </List>
        </Paper>
        <Box sx={{ flexGrow: "1" }} />
      </Box>
    </Dialog>
  );
};

export default ProjectSettingsDialog;
