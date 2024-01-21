export const requestGetToDoList = async ({ token, orgId }) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/toDo${orgId ? `?orgId=${orgId}` : ""}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Failed to fetch toDo list");
    }
    return response.json();
  } catch (error) {
    console.error("requestGetToDoList error", error);
  }
};

export const requestGetOneToDo = async ({ data, token }) => {
  try {
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
  } catch (error) {
    console.error("requestGetOneToDo error", error);
  }
};

export const requestCreateToDo = async ({ data, token, orgId }) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/toDo${orgId ? `?orgId=${orgId}` : ""}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Failed to create toDo");
    }
    return response.json();
  } catch (error) {
    console.error("requestCreateToDo error", error);
  }
};

export const requestRemoveToDo = async ({ data, token }) => {
  try {
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
  } catch (error) {
    console.error("requestRemoveToDo error", error);
  }
};

export const requestUpdateToDo = async ({ data, token }) => {
  try {
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
  } catch (error) {
    console.error("requestUpdateToDo error", error);
  }
};

export const requestUpdateToDoList = async ({ data, token }) => {
  try {
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
  } catch (error) {
    console.error("requestUpdateToDoList error", error);
  }
};
