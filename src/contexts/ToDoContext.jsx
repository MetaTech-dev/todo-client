import { createContext, useMemo, useState } from "react";
import StatusFormDialog from "../components/StatusFormDialog";
import ToDoFormDialog from "../components/ToDoFormDialog";
import ProjectSettingsDialog from "../components/ProjectSettingsDialog";
import { useDebounce } from "../utils/useDebounce";
import {
  getStatusList,
  createStatus,
  removeStatus,
  updateStatus,
} from "../api/status";
import { getToDoList, createToDo, removeToDo, updateToDo } from "../api/toDo";
import { enqueueSnackbar } from "notistack";

const ToDoContext = createContext();
export default ToDoContext;

export const ToDoProvider = ({ children }) => {
  //Loading States

  const [isLoading, setIsLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [toDoLoading, setToDoLoading] = useState(false);

  // STATUS SECTION

  const [statusList, setStatusList] = useState([]);

  const handleGetStatusList = async () => {
    setIsLoading(true);
    try {
      const response = await getStatusList();
      if (response.ok) {
        const data = await response.json();
        setStatusList(data);
      } else if (!response.ok) {
        const errorResponse = await response.json();
        enqueueSnackbar(errorResponse.message, { variant: "error" });
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const handleCreateStatus = async (statusFormData) => {
    setFormLoading(true);
    try {
      const response = await createStatus(statusFormData);
      if (response.ok) {
        const data = await response.json();
        setStatusList((prev) => [...prev, data]);
      } else if (!response.ok) {
        const errorResponse = await response.json();
        enqueueSnackbar(errorResponse.message, { variant: "error" });
      }
    } catch (err) {
      console.log(err);
    }
    setFormLoading(false);
  };

  const handleRemoveStatus = async (id) => {
    setStatusLoading(true);
    try {
      const response = await removeStatus(id);
      if (response.ok) {
        setStatusList((prevStatusList) =>
          prevStatusList.filter((status) => status.id !== id)
        );
        enqueueSnackbar("Status deleted successfully", { variant: "success" });
      } else {
        const errorResponse = await response.json();
        enqueueSnackbar(errorResponse.message, { variant: "error" });
      }
    } catch (err) {
      console.log(err);
    }
    setStatusLoading(false);
  };

  const handleUpdateStatus = async (updatedStatus) => {
    setStatusLoading(true);
    try {
      const response = await updateStatus(updatedStatus);
      if (response.ok) {
        const result = await response.json();
        setStatusList((prevStatusList) =>
          prevStatusList.map((status) =>
            status.id === result.id ? result : status
          )
        );
      } else if (!response.ok) {
        const errorResponse = await response.json();
        enqueueSnackbar(errorResponse.message, { variant: "error" });
      }
    } catch (err) {
      console.log(err);
    }
    setStatusLoading(false);
  };

  const [isStatusFormDialogOpen, setIsStatusFormDialogOpen] = useState(false);

  const defaultNewStatus = {
    title: "",
  };
  const [statusFormData, setStatusFormData] = useState(defaultNewStatus);
  const [isProjectSettingsDialogOpen, setIsProjectSettingsDialogOpen] =
    useState(false);

  // TODO SECTION

  const [toDoList, setToDoList] = useState([]);

  const handleGetToDoList = async () => {
    setIsLoading(true);
    let data;
    try {
      data = await getToDoList();
      setToDoList(data);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const handleCreateToDo = async (toDoFormData) => {
    setFormLoading(true);
    let data;
    try {
      data = await createToDo(toDoFormData);
      setToDoList((prev) => [...prev, data]);
    } catch (err) {
      console.log(err);
    }
    setFormLoading(false);
  };

  const handleRemoveToDo = async (id) => {
    setToDoLoading(true);
    try {
      await removeToDo(id);
      setToDoList((prevToDoList) =>
        prevToDoList.filter((toDo) => toDo.id !== id)
      );
    } catch (err) {
      console.log(err);
    }
    setToDoLoading(false);
  };

  const handleUpdateToDo = async (updatedToDo) => {
    setToDoLoading(true);
    try {
      const result = await updateToDo(updatedToDo);
      setToDoList((prevToDoList) =>
        prevToDoList.map((toDo) => (toDo.id === result.id ? result : toDo))
      );
    } catch (err) {
      console.log(err);
    }
    setToDoLoading(false);
  };

  const [isToDoFormDialogOpen, setIsToDoFormDialogOpen] = useState(false);
  const [isToDoFormNew, setIsToDoFormNew] = useState(true);
  const defaultNewToDo = {
    title: "",
    description: "",
    dueDate: null,
    priority: "low",
    statusId: statusList && statusList.length > 0 ? statusList[0]?.id : 1,
  };

  const [toDoFormData, setToDoFormData] = useState(defaultNewToDo);

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
    handleGetToDoList,
    handleCreateToDo,
    handleUpdateToDo,
    handleRemoveToDo,
    searchQuery,
    handleChangeSearchQuery,
    isProjectSettingsDialogOpen,
    setIsProjectSettingsDialogOpen,
    statusFormData,
    setStatusFormData,
    defaultNewStatus,
    handleRemoveStatus,
    handleUpdateStatus,
    handleGetStatusList,
    isLoading,
    setIsLoading,
    handleCreateStatus,
    formLoading,
    statusLoading,
    setStatusLoading,
    toDoLoading,
    setToDoLoading,
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
