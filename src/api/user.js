export const requestGetUserList = async ({ accessToken }) => {
  const response = await fetch(`http://localhost:3000/user`, {
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
  const response = await fetch(`http://localhost:3000/user/${id}`, {
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

export const requestUpdateUser = async ({ user, updatedData, accessToken }) => {
  const response = await fetch(`http://localhost:3000/user/${user?.user_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to update user");
  }
  return response.json();
};

export const requestUpdateUserRoles = async ({ user, accessToken }) => {
  const response = await fetch(
    `http://localhost:3000/user/${user.user_id}/role`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(user),
    }
  );
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to update user roles");
  }
  return response.json();
};
