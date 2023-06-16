import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ToDoContext = createContext();
export default ToDoContext;

export const ToDoProvider = ({ children }) => {
  const [toDoList, setToDoList] = useState([]);
  console.log("this is here", toDoList);

  const createToDo = (newToDo) => {
    newToDo.id = uuidv4();
    setToDoList((prev) => [...prev, newToDo]);
  };

  const deleteToDo = (id) => {
    setToDoList((prevToDoList) =>
      prevToDoList.filter((toDo) => toDo.id !== id)
    );
  };

  const providerValue = {
    toDoList,
    createToDo,
    deleteToDo,
  };

  return (
    <ToDoContext.Provider value={providerValue}>
      {children}
    </ToDoContext.Provider>
  );
};
