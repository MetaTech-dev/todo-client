export const requestGetRoleList = async ({ token }) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/role`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to fetch role list");
  }
  return response.json();
};
