import { createContext, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import StatusFormDialog from "../components/StatusFormDialog";
import ToDoFormDialog from "../components/ToDoFormDialog";
import ProjectSettingsDialog from "../components/ProjectSettingsDialog";
import { useDebounce } from "../utils/useDebounce";

const ToDoContext = createContext();
export default ToDoContext;

const defaultStatusList = [
  { title: "Ready", id: uuidv4() },
  { title: "In Progress", id: uuidv4() },
  { title: "Done", id: uuidv4() },
];

export const ToDoProvider = ({ children }) => {
  //
  // TODO SECTION

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
    status: statusList[0].title,
    id: "",
  };

  const [toDoFormData, setToDoFormData] = useState(defaultNewToDo);

  const createToDo = (newToDo) => {
    setToDoList((prev) => [...prev, { ...newToDo, id: uuidv4() }]);
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

  // STATUS SECTION

  const [isStatusFormDialogOpen, setIsStatusFormDialogOpen] = useState(false);
  const [isStatusFormNew, setIsStatusFormNew] = useState(true);
  const defaultNewStatus = {
    title: "",
    id: "",
  };
  const [statusFormData, setStatusFormData] = useState(defaultNewStatus);
  const [isProjectSettingsDialogOpen, setIsProjectSettingsDialogOpen] =
    useState(false);

  const createNewStatus = (newStatus) => {
    setStatusList((prev) => [...prev, { ...newStatus, id: uuidv4() }]);
  };

  const updateStatus = (updatedStatus) => {
    setStatusList((prevStatusList) =>
      prevStatusList.map((status) =>
        status.id === updatedStatus.id ? updatedStatus : status
      )
    );
  };

  const deleteStatus = (id) => {
    setStatusList((prevStatusList) =>
      prevStatusList.filter((status) => status.id !== id)
    );
  };

  // FILTER SECTION

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
    isStatusFormNew,
    setIsStatusFormNew,
    statusFormData,
    setStatusFormData,
    defaultNewStatus,
    deleteStatus,
    updateStatus,
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
