import { AppBar, Box, Paper, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ToDoCard from "../../components/ToDoCard";
import LoadingStatusBoardView from "../../components/loading/LoadingStatusBoardView";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useUpdateToDoList } from "../../hooks/toDo";
import { useState } from "react";

const BoardView = ({
  statusList,
  isStatusListPending,
  filteredToDoList,
  toDoList,
}) => {
  const theme = useTheme();

  const { mutate: updateToDoList } = useUpdateToDoList();

  const filterToDosByStatus = (status) => {
    return filteredToDoList.filter((toDo) => toDo.statusId === status.id);
  };

  const [activeId, setActiveId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (event) => {
    setIsDragging(true);
    setActiveId(event.draggableId);
  };

  const handleDragEnd = (event) => {
    const { destination, source, draggableId } = event;
    if (!destination) {
      setIsDragging(false);
      setActiveId(null);
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      setIsDragging(false);
      setActiveId(null);
      return;
    }

    const statusId = parseInt(destination.droppableId);

    const updatedToDo = toDoList.find(
      (toDo) => toDo.id === parseInt(draggableId)
    );
    if (!updatedToDo) return;

    updatedToDo.statusId = statusId;

    const updatedToDoList = toDoList.map((toDo) =>
      toDo.id === parseInt(draggableId) ? updatedToDo : toDo
    );

    updateToDoList(updatedToDoList);

    setIsDragging(false);
    setActiveId(null);
  };

  console.log(theme.palette.neutral.contrastBorder);
  return (
    <Box
      id="board-view-container"
      sx={{
        display: "flex",
        flexGrow: 1,
        overflowX: "auto",
        overflowY: "hidden",
        justifyContent: "flex-start",
        pt: 1,
      }}
    >
      <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {!isStatusListPending &&
          filteredToDoList &&
          statusList &&
          statusList?.map((status) => {
            return (
              <Box
                className="status-column"
                key={status.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  m: 1,
                  maxWidth: theme.spacing(40),
                }}
              >
                <Paper
                  elevation={10}
                  sx={{
                    backgroundColor: "neutral.main",
                    minWidth: theme.spacing(40),
                    overflowY: "hidden",
                    display: "flex",
                    flexGrow: 1,
                    flexDirection: "column",
                    ":hover": {
                      border: isDragging ? `1px solid #808080` : "none",
                    },
                  }}
                >
                  <AppBar
                    position="static"
                    elevation={13}
                    sx={{ mb: 1, borderRadius: "3px", flexShrink: 1 }}
                    color="primary"
                  >
                    <Toolbar variant="dense" color="inherit">
                      <Typography
                        sx={{
                          fontWeight: "450",
                          fontSize: "22px",
                          opacity: ".8",
                          textAlign: "center",
                        }}
                      >
                        {status.title}
                      </Typography>
                    </Toolbar>
                  </AppBar>
                  <Droppable droppableId={status.id.toString()} key={status.id}>
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        sx={{ flexGrow: 1, overflowY: "auto" }}
                      >
                        {filterToDosByStatus(status)?.map((toDo, index) => {
                          return (
                            <ToDoCard
                              toDo={toDo}
                              key={toDo.id}
                              index={index}
                              activeCard={
                                activeId?.toString() === toDo.id.toString()
                              }
                              isDragging={isDragging}
                            />
                          );
                        })}
                        {provided.placeholder}
                      </Box>
                    )}
                  </Droppable>
                </Paper>
              </Box>
            );
          })}
        {(isStatusListPending || !filteredToDoList) && (
          <>
            <LoadingStatusBoardView key={1} />
            <LoadingStatusBoardView key={2} />
            <LoadingStatusBoardView key={3} />
          </>
        )}
      </DragDropContext>
    </Box>
  );
};

export default BoardView;
