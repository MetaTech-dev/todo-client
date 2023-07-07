// import * as React from "react";
import {
  AppBar,
  Button,
  Dialog,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { useContext, useState, forwardRef } from "react";
import ToDoContext from "./ToDoContext";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ProjectSettingsDialog = () => {
  const {
    isProjectSettingsDialogOpen,
    setIsProjectSettingsDialogOpen,
    setIsStatusFormDialogOpen,
  } = useContext(ToDoContext);

  const handleClose = () => {
    setIsProjectSettingsDialogOpen(false);
  };

  const handleNewStatusFormDialogOpen = () => {
    setIsStatusFormDialogOpen(true);
  };

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
    </Dialog>
  );
};

export default ProjectSettingsDialog;
