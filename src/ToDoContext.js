import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import StatusFormDialog from "../StatusFormDialog";
import ToDoFormDialog from "../ToDoFormDialog";

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

  const createToDo = (newToDo) => {
    setToDoList((prev) => [...prev, { id: uuidv4(), ...newToDo }]);
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

  const providerValue = {
    defaultNewToDo,
    isToDoFormNew,
    setIsToDoFormNew,
    toDoFormData,
    setToDoFormData,
    toDoList,
    // formData,
    setIsToDoFormDialogOpen,
    isToDoFormDialogOpen,
    statusList,
    addToStatusList,
    createToDo,
    updateToDo,
    deleteToDo,
  };

  return (
    <ToDoContext.Provider value={providerValue}>
      {children}
      <ToDoFormDialog
        isOpen={isToDoFormDialogOpen}
        setIsOpen={setIsToDoFormDialogOpen}
        isToDoFormNew={isToDoFormNew}
      />
      <StatusFormDialog
        isOpen={isStatusFormDialogOpen}
        setIsOpen={setIsStatusFormDialogOpen}
      />
    </ToDoContext.Provider>
  );
};
