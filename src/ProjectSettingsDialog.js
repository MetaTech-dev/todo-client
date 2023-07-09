import {
  AppBar,
  Box,
  Button,
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
import { useContext, useState, forwardRef } from "react";
import ToDoContext from "./ToDoContext";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ProjectSettingsDialog = () => {
  const {
    isProjectSettingsDialogOpen,
    setIsProjectSettingsDialogOpen,
    setIsStatusFormDialogOpen,
    statusList,
  } = useContext(ToDoContext);

  const handleClose = () => {
    setIsProjectSettingsDialogOpen(false);
  };

  const handleNewStatusFormDialogOpen = () => {
    setIsStatusFormDialogOpen(true);
  };

  const handleEditStatus = () => {};

  return (
    <Dialog
      fullScreen
      open={isProjectSettingsDialogOpen}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar elevation={6} sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
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
          marginBottom: "1rem",
        }}
      >
        {" "}
        <Button
          color="inherit"
          variant="contained"
          size="small"
          onClick={() => handleNewStatusFormDialogOpen()}
        >
          Create ToDo Status
        </Button>
      </Toolbar>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flexGrow: "1" }}></Box>
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
            {statusList.map((status) => {
              return (
                <ListItem
                  secondaryAction={
                    <IconButton>
                      <EditTwoToneIcon sx={{ marginRight: "1rem" }} />
                      <DeleteOutlineOutlinedIcon />
                    </IconButton>
                  }
                >
                  <ListItemIcon>
                    <DragHandleIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={status}
                    sx={{ paddingRight: "6rem" }}
                  />
                </ListItem>
              );
            })}
          </List>
        </Paper>
        <Box sx={{ flexGrow: "1" }}></Box>
      </Box>
    </Dialog>
  );
};

export default ProjectSettingsDialog;
