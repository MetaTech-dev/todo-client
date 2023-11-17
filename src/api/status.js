export const getStatusList = async () => {
  const response = await fetch("http://localhost:3000/status");
  const data = await response.json();
  return data;
};

export const createStatus = async (status) => {
  const response = await fetch("http://localhost:3000/status", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(status),
  });
  const data = await response.json();
  return data;
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
  const data = await response.json();
  return data;
};
