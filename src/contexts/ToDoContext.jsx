import { createContext, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import StatusFormDialog from "../components/StatusFormDialog";
import ToDoFormDialog from "../components/ToDoFormDialog";
import ProjectSettingsDialog from "../components/ProjectSettingsDialog";
import { useDebounce } from "../utils/useDebounce";
import { fetchStatus, createStatus, removeStatus } from "../api/statusCalls";

const ToDoContext = createContext();
export default ToDoContext;

export const ToDoProvider = ({ children }) => {
  //Loading States
  const [isLoading, setIsLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  //
  // STATUS SECTION
  const [statusList, setStatusList] = useState([]);

  const getStatuses = async () => {
    setIsLoading(true);
    let data;
    try {
      data = await fetchStatus(data);
      setStatusList(data);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const newStatus = async (statusFormData) => {
    setFormLoading(true);
    let data;
    try {
      data = await createStatus(statusFormData);
      setStatusList((prev) => [...prev, data]);
    } catch (err) {
      console.log(err);
    }
    setFormLoading(false);
  };

  const deleteStatus = async (id) => {
    setFormLoading(true);
    try {
      await removeStatus(id);
      setStatusList((prevStatusList) =>
        prevStatusList.filter((status) => status.id !== id)
      );
    } catch (err) {
      console.log(err);
    }
    setFormLoading(false);
  };

  const [isStatusFormDialogOpen, setIsStatusFormDialogOpen] = useState(false);
  const [isStatusFormNew, setIsStatusFormNew] = useState(true);
  const defaultNewStatus = {
    title: "",
  };
  const [statusFormData, setStatusFormData] = useState(defaultNewStatus);
  const [isProjectSettingsDialogOpen, setIsProjectSettingsDialogOpen] =
    useState(false);

  const updateStatus = (updatedStatus) => {
    setStatusList((prevStatusList) =>
      prevStatusList.map((status) =>
        status.id === updatedStatus.id ? updatedStatus : status
      )
    );
  };

  // TODO SECTION

  const [toDoList, setToDoList] = useState([]);

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
    status: statusList && statusList.length > 0 ? statusList[0]?.title : "",
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
    // createNewStatus,
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
    getStatuses,
    isLoading,
    setIsLoading,
    newStatus,
    formLoading,
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
