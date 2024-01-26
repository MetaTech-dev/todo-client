import { Box, CardHeader, Card, Fab } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ToDoCard from "../../components/ToDoCard";
import LoadingStatusBoardView from "../../components/loading/LoadingStatusBoardView";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useUpdateToDoList } from "../../hooks/toDo";
import { useContext, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import AppContext from "../../contexts/AppContext";

const BoardView = ({
  statusList,
  isStatusListPending,
  filteredToDoList,
  toDoList,
  handleToDoFormOpen,
}) => {
  const theme = useTheme();
  const { isMobile } = useContext(AppContext);
  console.log("isMobile", isMobile);

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

  return (
    <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      {!isStatusListPending &&
        filteredToDoList &&
        statusList?.length > 0 &&
        statusList?.map((status) => {
          return (
            <Card
              elevation={2}
              key={status.id}
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
                maxWidth: theme.spacing(40),
              }}
            >
              <CardHeader
                title={status.title}
                titleTypographyProps={{
                  variant: "h6",
                }}
              />
              <Droppable droppableId={status.id.toString()} key={status.id}>
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={(theme) => ({
                      flexGrow: 1,
                      overflowY: "auto",
                      pt: 1,
                      overflowX: "hidden",
                    })}
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
            </Card>
          );
        })}
      {isMobile && (
        <Fab
          onClick={handleToDoFormOpen}
          color="primary"
          sx={{ position: "fixed", bottom: 0, right: 0, m: 1 }}
          aria-label="Add ToDo"
        >
          <AddIcon />
        </Fab>
      )}
      {(isStatusListPending || !filteredToDoList) && (
        <>
          <LoadingStatusBoardView key={1} />
          <LoadingStatusBoardView key={2} />
          <LoadingStatusBoardView key={3} />
        </>
      )}
    </DragDropContext>
  );
};

export default BoardView;
