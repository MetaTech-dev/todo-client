import { createContext, useState } from "react";

const ToDoContext = createContext();
export default ToDoContext;

export const ToDoProvider = ({ children }) => {
  const [toDoList, setToDoList] = useState([]);
  console.log("this is here", toDoList);
  const createToDo = (newToDo) => {
    setToDoList((prev) => [...prev, newToDo]);
  };

  const providerValue = {
    toDoList,
    createToDo,
  };

  return (
    <ToDoContext.Provider value={providerValue}>
      {children}
    </ToDoContext.Provider>
  );
};
