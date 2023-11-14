export const fetchStatus = async () => {
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
