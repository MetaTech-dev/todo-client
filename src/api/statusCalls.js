export const getAllStatus = async () => {
  const response = await fetch("http://localhost:3000/status");
  const data = await response.json();
  return data;
};
