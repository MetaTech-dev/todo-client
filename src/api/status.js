export const requestGetStatusList = async () => {
  const response = await fetch("http://localhost:3000/status");
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to fetch status list");
  }
  return response.json();
};

export const requestCreateStatus = async (status) => {
  const response = await fetch("http://localhost:3000/status", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(status),
  });
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to create status");
  }
  return response.json();
};

export const requestRemoveStatus = async (id) => {
  const response = await fetch(`http://localhost:3000/status/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to delete status");
  } else if (response.ok) {
    return true;
  }
};

export const requestUpdateStatus = async (status) => {
  const response = await fetch(`http://localhost:3000/status/${status.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(status),
  });
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to update status");
  }
  return response.json();
};
