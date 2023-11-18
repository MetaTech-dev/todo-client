export const getToDoList = async () => {
  const response = await fetch("http://localhost:3000/toDo");
  //   const data = await response.json();
  //   return data;
  return response;
};

export const createToDo = async (toDo) => {
  const response = await fetch("http://localhost:3000/toDo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(toDo),
  });
  //   const data = await response.json();
  //   return data;
  return response;
};

export const removeToDo = async (id) => {
  const response = await fetch(`http://localhost:3000/toDo/${id}`, {
    method: "DELETE",
  });
  //   return true;
  return response;
};

export const updateToDo = async (toDo) => {
  const response = await fetch(`http://localhost:3000/toDo/${toDo.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(toDo),
  });
  //   const data = await response.json();
  //   return data;
  return response;
};