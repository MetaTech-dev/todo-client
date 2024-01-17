export const requestGetToDoList = async ({ token }) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/toDo`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to fetch toDo list");
  }
  return response.json();
};

export const requestGetOneToDo = async ({ data, token }) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/toDo/${data.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to fetch toDo");
  }
  return response.json();
};

export const requestCreateToDo = async ({ data, token }) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/toDo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to create toDo");
  }
  return response.json();
};

export const requestRemoveToDo = async ({ data, token }) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/toDo/${data.id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to delete toDo");
  } else if (response.ok) {
    return true;
  }
};

export const requestUpdateToDo = async ({ data, token }) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/toDo/${data.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to update toDo");
  }
  return response.json();
};

export const requestUpdateToDoList = async ({ data, token }) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/toDo`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to update toDo list");
  }
  return response.json();
};
