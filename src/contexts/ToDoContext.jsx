import { createContext, useEffect, useMemo, useState } from "react";
import StatusFormDialog from "../components/StatusFormDialog";
import ToDoFormDialog from "../components/ToDoFormDialog";
import ProjectSettingsDialog from "../components/ProjectSettingsDialog";
import { useGetStatusList } from "../hooks/status";
import DeleteConfirmationDialog from "../components/DeleteConfirmationDialog";
import { useUser } from "@clerk/clerk-react";
import { set } from "date-fns";

const ToDoContext = createContext();
export default ToDoContext;

export const ToDoProvider = ({ children }) => {
  // STATUS SECTION

  const [isStatusFormDialogOpen, setIsStatusFormDialogOpen] = useState(false);

  const defaultNewStatus = useMemo(() => ({ title: "" }), []);

  const [statusFormData, setStatusFormData] = useState(defaultNewStatus);

  const { data: statusList, isSuccess: isStatusListSuccess } =
    useGetStatusList();

  const [isProjectSettingsDialogOpen, setIsProjectSettingsDialogOpen] =
    useState(false);

  const { user } = useUser();

  const [isToDoFormDialogOpen, setIsToDoFormDialogOpen] = useState(false);

  const defaultNewToDo = useMemo(
    () => ({
      title: "",
      description: "",
      dueDate: null,
      priority: "low",
      statusId: "",
      authorUserId: null,
      assigneeUserId: null,
    }),
    [statusList, user]
  );

  useEffect(() => {
    const firstStatus = statusList?.find((status) => status.position === 1);
    setToDoFormData((prev) => ({
      ...prev,
      statusId: firstStatus?.id,
    }));
  }, [isStatusListSuccess, statusList]);

  useEffect(() => {
    setToDoFormData((prev) => ({
      ...prev,
      authorUserId: user?.id,
    }));
  }, [user]);

  const [toDoFormData, setToDoFormData] = useState(defaultNewToDo);

  // DELETE DIALOG SECTION

  const [isDeleteConfirmationDialogOpen, setIsDeleteConfirmationDialogOpen] =
    useState(false);
  const [deleteConfirmationItem, setDeleteConfirmationItem] = useState(null);
  const [deleteConfirmationItemType, setDeleteConfirmationItemType] =
    useState("");

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
    isDeleteConfirmationDialogOpen,
    setIsDeleteConfirmationDialogOpen,
    deleteConfirmationItem,
    setDeleteConfirmationItem,
    deleteConfirmationItemType,
    setDeleteConfirmationItemType,
  };

  return (
    <ToDoContext.Provider value={providerValue}>
      {children}
      <ToDoFormDialog />
      <StatusFormDialog />
      <ProjectSettingsDialog />
      <DeleteConfirmationDialog />
    </ToDoContext.Provider>
  );
};
