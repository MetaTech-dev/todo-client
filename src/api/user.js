export const requestGetUserList = async ({ accessToken }) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to fetch user list");
  }
  return response.json();
};

export const requestGetOneUser = async ({ id, accessToken }) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/user/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to fetch user");
  }
  return response.json();
};

export const requestUpdateUser = async ({ body, userId, accessToken }) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/user/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to update user");
  }
  return response.json();
};

export const requestUpdateUserRoles = async ({
  roles,
  userId,
  accessToken,
}) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/user/${userId}/role`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ roleIds: roles }),
    }
  );
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to update user roles");
  }
  return response.json();
};
