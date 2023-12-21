export const requestRoleList = async ({ accessToken }) => {
  const response = await fetch(`http://localhost:3000/role`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to fetch role list");
  }
  return response.json();
};
