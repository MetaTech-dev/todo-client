import { createContext, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import StatusFormDialog from "./StatusFormDialog";
import ToDoFormDialog from "./ToDoFormDialog";
import ProjectSettingsDialog from "./ProjectSettingsDialog";
import { useDebounce } from "./utils/useDebounce";

const ToDoContext = createContext();
export default ToDoContext;

const defaultStatusList = [
  { title: "Ready", id: uuidv4() },
  { title: "In Progress", id: uuidv4() },
  { title: "Done", id: uuidv4() },
];

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

  const defaultStatus = {
    title: "",
    id: "",
  };

  const [toDoFormData, setToDoFormData] = useState(defaultNewToDo);
  const [isStatusFormDialogOpen, setIsStatusFormDialogOpen] = useState(false);
  const [isProjectSettingsDialogOpen, setIsProjectSettingsDialogOpen] =
    useState(false);

  const createToDo = (newToDo) => {
    setToDoList((prev) => [...prev, { ...newToDo, id: uuidv4() }]);
  };

  const createNewStatus = (newStatus) => {
    setStatusList((prev) => [...prev, { ...newStatus, id: uuidv4() }]);
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

  const deleteStatus = (id) => {
    setStatusList((prevStatusList) =>
      prevStatusList.filter((status) => status.id !== id)
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
    createNewStatus,
    updateToDo,
    deleteToDo,
    searchQuery,
    handleChangeSearchQuery,
    isProjectSettingsDialogOpen,
    setIsProjectSettingsDialogOpen,
    deleteStatus,
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
