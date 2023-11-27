import { createContext, useMemo, useState } from "react";
import StatusFormDialog from "../components/StatusFormDialog";
import ToDoFormDialog from "../components/ToDoFormDialog";
import ProjectSettingsDialog from "../components/ProjectSettingsDialog";
import { useDebounce } from "../utils/useDebounce";
import { useGetStatusList } from "../hooks/status";
import { useGetToDoList } from "../hooks/toDo";

const ToDoContext = createContext();
export default ToDoContext;

export const ToDoProvider = ({ children }) => {
  //Loading States

  const [isLoading, setIsLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [toDoLoading, setToDoLoading] = useState(false);

  // STATUS SECTION

  const [isStatusFormDialogOpen, setIsStatusFormDialogOpen] = useState(false);

  const { data: statusList } = useGetStatusList();

  const defaultNewStatus = {
    title: "",
  };
  const [statusFormData, setStatusFormData] = useState(defaultNewStatus);
  const [isProjectSettingsDialogOpen, setIsProjectSettingsDialogOpen] =
    useState(false);

  // TODO SECTION

  const { data: toDoList } = useGetToDoList();

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
    isToDoFormDialogOpen,
    setIsToDoFormDialogOpen,
    isToDoFormNew,
    setIsToDoFormNew,
    defaultNewToDo,
    toDoFormData,
    setToDoFormData,
    isStatusFormDialogOpen,
    setIsStatusFormDialogOpen,
    searchQuery,
    handleChangeSearchQuery,
    isProjectSettingsDialogOpen,
    setIsProjectSettingsDialogOpen,
    statusFormData,
    setStatusFormData,
    defaultNewStatus,
    isLoading,
    setIsLoading,
    formLoading,
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
