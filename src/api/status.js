export const getStatusList = async () => {
  const response = await fetch("http://localhost:3000/status");
  return response.json();
};

export const createStatus = async (status) => {
  const response = await fetch("http://localhost:3000/status", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(status),
  });
  return response;
};

export const removeStatus = async (id) => {
  const response = await fetch(`http://localhost:3000/status/${id}`, {
    method: "DELETE",
  });
  return response;
};

export const updateStatus = async (status) => {
  const response = await fetch(`http://localhost:3000/status/${status.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(status),
  });
  return response;
};
