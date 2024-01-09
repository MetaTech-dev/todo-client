export const requestGetToDoList = async ({ accessToken }) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/toDo`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to fetch toDo list");
  }
  return response.json();
};

export const requestGetOneToDo = async ({ id, accessToken }) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/toDo/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to fetch toDo");
  }
  return response.json();
};

export const requestCreateToDo = async ({ toDo, accessToken }) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/toDo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(toDo),
  });
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to create toDo");
  }
  return response.json();
};

export const requestRemoveToDo = async ({ id, accessToken }) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/toDo/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to delete toDo");
  } else if (response.ok) {
    return true;
  }
};

export const requestUpdateToDo = async ({ toDo, accessToken }) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/toDo/${toDo.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(toDo),
    }
  );
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to update toDo");
  }
  return response.json();
};

export const requestUpdateToDoList = async ({ toDoList, accessToken }) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/toDo`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(toDoList),
  });
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to update toDo list");
  }
  return response.json();
};
