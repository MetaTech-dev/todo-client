export const requestGetToDoList = async () => {
  const response = await fetch("http://localhost:3000/toDo");
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to fetch toDo list");
  }
  return response.json();
};

export const requestCreateToDo = async (toDo) => {
  const response = await fetch("http://localhost:3000/toDo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(toDo),
  });
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to create toDo");
  }
  return response.json();
};

export const requestRemoveToDo = async (id) => {
  const response = await fetch(`http://localhost:3000/toDo/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to delete toDo");
  } else if (response.ok) {
    return true;
  }
};

export const requestUpdateToDo = async (toDo) => {
  const response = await fetch(`http://localhost:3000/toDo/${toDo.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(toDo),
  });
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to update toDo");
  }
  return response.json();
};
