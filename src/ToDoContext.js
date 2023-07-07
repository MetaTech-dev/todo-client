import { createContext, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import StatusFormDialog from "./StatusFormDialog";
import ToDoFormDialog from "./ToDoFormDialog";
import ProjectSettingsDialog from "./ProjectSettingsDialog";
import { useDebounce } from "./utils/useDebounce";

const ToDoContext = createContext();
export default ToDoContext;

const defaultStatusList = ["Ready", "In Progress", "Done"];

export const ToDoProvider = ({ children }) => {
  const [toDoList, setToDoList] = useState([]);
  const [statusList, setStatusList] = useState(defaultStatusList);
  const [isToDoFormDialogOpen, setIsToDoFormDialogOpen] = useState(false);
  const [isToDoFormNew, setIsToDoFormNew] = useState(true);
  const defaultNewToDo = {
    title: "",
    description: "",
    author: "",
    createdDate: "",
    dueDate: null,
    assignee: "",
    priority: "low",
    status: statusList[0],
    id: "",
  };

  const [toDoFormData, setToDoFormData] = useState(defaultNewToDo);
  const [isStatusFormDialogOpen, setIsStatusFormDialogOpen] = useState(false);
  const [isProjectSettingsDialogOpen, setIsProjectSettingsDialogOpen] =
    useState(false);

  const createToDo = (newToDo) => {
    setToDoList((prev) => [...prev, { ...newToDo, id: uuidv4() }]);
  };

  const addToStatusList = (newStatus) => {
    setStatusList((prev) => [...prev, newStatus]);
  };

  const updateToDo = (updatedToDo) => {
    setToDoList((prevToDoList) =>
      prevToDoList.map((toDo) =>
        toDo.id === updatedToDo.id ? updatedToDo : toDo
      )
    );
  };

  const deleteToDo = (id) => {
    setToDoList((prevToDoList) =>
      prevToDoList.filter((toDo) => toDo.id !== id)
    );
  };

  const [searchQuery, setSearchQuery] = useState("");
  const handleChangeSearchQuery = (input) => {
    setSearchQuery(input);
  };
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const filteredToDoList = useMemo(() => {
    if (debouncedSearchQuery === "") {
      return toDoList;
    } else {
      return toDoList.filter((toDo) =>
        Object.values(toDo).some((value) =>
          String(value)
            .toLowerCase()
            .includes(debouncedSearchQuery.toLowerCase())
        )
      );
    }
  }, [toDoList, debouncedSearchQuery]);

  const providerValue = {
    toDoList,
    filteredToDoList,

    statusList,
    isToDoFormDialogOpen,
    setIsToDoFormDialogOpen,
    isToDoFormNew,
    setIsToDoFormNew,
    defaultNewToDo,
    toDoFormData,
    setToDoFormData,
    isStatusFormDialogOpen,
    setIsStatusFormDialogOpen,
    createToDo,
    addToStatusList,
    updateToDo,
    deleteToDo,
    searchQuery,
    handleChangeSearchQuery,
    isProjectSettingsDialogOpen,
    setIsProjectSettingsDialogOpen,
  };

  return (
    <ToDoContext.Provider value={providerValue}>
      {children}
      <ToDoFormDialog />
      <StatusFormDialog />
      <ProjectSettingsDialog />
    </ToDoContext.Provider>
  );
};
