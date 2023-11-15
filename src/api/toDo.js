export const getToDoList = async () => {
  const response = await fetch("http://localhost:3000/toDo");
  const data = await response.json();
  return data;
};

export const createToDo = async (toDo) => {
  const response = await fetch("http://localhost:3000/toDo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(toDo),
  });
  const data = await response.json();
  return data;
};

export const removeToDo = async (id) => {
  await fetch(`http://localhost:3000/toDo/${id}`, {
    method: "DELETE",
  });
  return true;
};

export const updateToDo = async (toDo) => {
  const response = await fetch(`http://localhost:3000/toDo/${toDo.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(toDo),
  });
  const data = await response.json();
  return data;
};
