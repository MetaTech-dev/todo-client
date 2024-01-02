export const requestGetRoleList = async ({ accessToken }) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/role`, {
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
