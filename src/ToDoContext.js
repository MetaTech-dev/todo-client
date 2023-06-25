import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ToDoContext = createContext();
export default ToDoContext;

const defaultStatusList = ["Ready", "In Progress", "Done"];

export const ToDoProvider = ({ children }) => {
  const [toDoList, setToDoList] = useState([]);
  const [statusList, setStatusList] = useState(defaultStatusList);
  const [showToDoForm, setShowToDoForm] = useState(false);
  const [isNewToDo, setIsNewToDo] = useState(true);
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
  const [toDoData, setToDoData] = useState(defaultNewToDo);

  const createToDo = (newToDo) => {
    newToDo.id = uuidv4();
    setToDoList((prev) => [...prev, newToDo]);
  };

  const addToStatusList = (newStatus) => {
    setStatusList((prev) => [...prev, newStatus]);
  };

  const updateToDo = (updatedToDo) => {
    setToDoList((prevToDoList) => {
      const updatedList = prevToDoList.map((toDo) => {
        if (toDo.id === updatedToDo.id) {
          return updatedToDo;
        }
        return toDo;
      });
      return updatedList;
    });
  };

  const deleteToDo = (id) => {
    setToDoList((prevToDoList) =>
      prevToDoList.filter((toDo) => toDo.id !== id)
    );
  };

  const providerValue = {
    defaultNewToDo,
    isNewToDo,
    setIsNewToDo,
    toDoData,
    setToDoData,
    toDoList,
    // formData,
    setShowToDoForm,
    showToDoForm,
    statusList,
    addToStatusList,
    createToDo,
    updateToDo,
    deleteToDo,
  };

  return (
    <ToDoContext.Provider value={providerValue}>
      {children}
    </ToDoContext.Provider>
  );
};
