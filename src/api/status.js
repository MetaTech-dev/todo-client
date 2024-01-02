export const requestGetStatusList = async ({ accessToken }) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/status`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to fetch status list");
  }
  return response.json();
};

export const requestCreateStatus = async ({ status, accessToken }) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(status),
  });
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to create status");
  }
  return response.json();
};

export const requestRemoveStatus = async ({ id, accessToken }) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/status/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
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

export const requestUpdateStatus = async ({ status, accessToken }) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/status/${status.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(status),
    }
  );
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to update status");
  }
  return response.json();
};

export const requestUpdateStatusList = async ({ statusList, accessToken }) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(statusList),
  });
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to update status list");
  }
  return response.json();
};
