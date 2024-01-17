export const requestGetStatusList = async ({ token }) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/status`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to fetch status list");
  }
  return response.json();
};

export const requestGetOneStatus = async ({ data, token }) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/status/${data.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to fetch status");
  }
  return response.json();
};

export const requestCreateStatus = async ({ data, token }) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to create status");
  }
  return response.json();
};

export const requestRemoveStatus = async ({ data, token }) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/status/${data.id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to delete status");
  } else if (response.ok) {
    return true;
  }
};

export const requestUpdateStatus = async ({ data, token }) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/status/${data.id}`,
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
    throw new Error(errorResponse.message || "Failed to update status");
  }
  return response.json();
};

export const requestUpdateStatusList = async ({ data, token }) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to update status list");
  }
  return response.json();
};
