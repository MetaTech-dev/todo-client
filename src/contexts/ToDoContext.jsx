import { createContext, useState } from "react";
import StatusFormDialog from "../components/StatusFormDialog";
import ToDoFormDialog from "../components/ToDoFormDialog";
import ProjectSettingsDialog from "../components/ProjectSettingsDialog";
import { useGetStatusList } from "../hooks/status";

const ToDoContext = createContext();
export default ToDoContext;

export const ToDoProvider = ({ children }) => {
  // STATUS SECTION

  const [isStatusFormDialogOpen, setIsStatusFormDialogOpen] = useState(false);

  const defaultNewStatus = {
    title: "",
  };

  const [statusFormData, setStatusFormData] = useState(defaultNewStatus);

  const { data: statusList } = useGetStatusList();

  const [isProjectSettingsDialogOpen, setIsProjectSettingsDialogOpen] =
    useState(false);

  // TODO SECTION

  const [isToDoFormDialogOpen, setIsToDoFormDialogOpen] = useState(false);

  const defaultNewToDo = {
    title: "",
    description: "",
    dueDate: null,
    priority: "low",
    statusId: statusList && statusList.length > 0 ? statusList[0]?.id : 1,
  };

  const [toDoFormData, setToDoFormData] = useState(defaultNewToDo);

  const providerValue = {
    isToDoFormDialogOpen,
    setIsToDoFormDialogOpen,
    statusFormData,
    setStatusFormData,
    defaultNewStatus,
    defaultNewToDo,
    toDoFormData,
    setToDoFormData,
    isStatusFormDialogOpen,
    setIsStatusFormDialogOpen,
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
