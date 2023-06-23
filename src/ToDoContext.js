import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ToDoContext = createContext();
export default ToDoContext;

export const ToDoProvider = ({ children }) => {
  const [toDoList, setToDoList] = useState([]);
  const [statusList, setStatusList] = useState([]);

  const createToDo = (newToDo) => {
    newToDo.id = uuidv4();
    setToDoList((prev) => [...prev, newToDo]);
  };

  const addToStatusList = (newStatus) => {
    setStatusList((prev) => [...prev, newStatus]);
  };

  const updateToDo = (id) => {};

  const deleteToDo = (id) => {
    setToDoList((prevToDoList) =>
      prevToDoList.filter((toDo) => toDo.id !== id)
    );
  };

  const providerValue = {
    toDoList,
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
