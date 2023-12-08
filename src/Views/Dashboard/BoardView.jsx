import { AppBar, Box, Paper, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ToDoCard from "../../components/ToDoCard";
import LoadingStatusBoardView from "../../components/loading/LoadingStatusBoardView";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useUpdateToDo } from "../../hooks/toDo";

const BoardView = ({ statusList, isStatusListPending, filteredToDoList }) => {
  const theme = useTheme();

  const { mutate: updateToDo } = useUpdateToDo();

  const filterToDosByStatus = (status) => {
    return filteredToDoList.filter((toDo) => toDo.statusId === status.id);
  };

  // const move = (source, destination, droppableSource, droppableDestination) => {
  //   const sourceClone = Array.from(source);
  //   const destClone = Array.from(destination);
  //   const [removed] = sourceClone.splice(droppableSource.index, 1);

  //   destClone.splice(droppableDestination.index, 0, removed);

  //   const result = {};
  //   result[droppableSource.droppableId] = sourceClone;
  //   result[droppableDestination.droppableId] = destClone;

  //   console.log("result", result);

  //   return result;
  // };

  const handleDragStart = (event) => {};

  const handleDragEnd = (event) => {
    const { destination, source, draggableId } = event;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const statusId = parseInt(destination.droppableId);
    updateToDo({ id: parseInt(draggableId), statusId: statusId });
  };

  return (
    <Box
      id="board-view-container"
      sx={{
        display: "flex",
        flexGrow: 1,
        overflowX: "auto",
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
                    overflowY: "auto",
                    flexGrow: 1,
                  }}
                >
                  <AppBar
                    position="static"
                    elevation={13}
                    sx={{ mb: 1, borderRadius: "3px" }}
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
                        sx={{ minHeight: "100%" }}
                      >
                        {filterToDosByStatus(status)?.map((toDo, index) => {
                          return (
                            <ToDoCard toDo={toDo} key={toDo.id} index={index} />
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
